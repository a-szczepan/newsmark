import { useEffect, useRef, useState } from 'react';
import { Button, ButtonType, IconButton } from '../Button/Button';
import { IconType } from '../Icon/Icon';
import { Input, InputType, Textarea } from '../Input/Input';
import styles from './Annotation.module.scss';
import classnames from 'classnames';
import { Accordion } from '../Accordion/Accordion';
import { useAddAnnotationMutation } from '../../store/api/articleApi';
import { useSearchParams } from 'react-router-dom';

type AnnotationProps = {
  viewMode?: boolean;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  selectedText: string
};

type ColorPickerProps = {
  onColorChange: (color: string) => void;
};

const ColorPicker: React.FC<ColorPickerProps> = ({ onColorChange }) => {
  const [picked, setPicked] = useState('green');
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onColorChange(picked);
  }, [picked, onColorChange]);

  const handleColorClick = (color: string) => {
    setPicked(color);
  };

  return (
    <div className={styles.colorPicker} ref={colorPickerRef}>
      {['green', 'blue', 'yellow', 'pink', 'purple'].map((color, index) => (
        <div
          className={classnames(styles.color, styles[color], {
            [styles.picked]: picked === color
          })}
          key={index}
          onClick={() => handleColorClick(color)}
        />
      ))}
    </div>
  );
};

export const Annotation: React.FC<AnnotationProps> = ({
  viewMode,
  editMode,
  selectedText,
  setEditMode
}) => {
  const [addNote, setAddNote] = useState(false);
  const [addAnnotation] = useAddAnnotationMutation({});
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url');
  const [selectedColor, setSelectedColor] = useState('green');

  const titleRef = useRef<HTMLInputElement>(null);
  const selectedTextRef = useRef<HTMLTextAreaElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);

  const editModeAnnotation = (
    <form
      className={styles.annotation}
      onSubmit={(e) => {
        e.preventDefault();
        const title = titleRef.current?.value || '';

        const note = noteRef.current?.value || '';
        addAnnotation({
          title,
          selectedText: selectedText,
          color: selectedColor,
          note,
          articleUrl: url
        });
      }}
    >
      <Input
        type={InputType.text}
        label="Title"
        name="title"
        reference={titleRef}
      />
      <Textarea
        label="Selected text"
        name="title"
        rows={5}
        reference={selectedTextRef}
        value={selectedText}
        readOnly
      />
      <ColorPicker onColorChange={setSelectedColor} />
      {addNote ? (
        <Textarea label="Note" reference={noteRef} />
      ) : (
        <Button
          variant={ButtonType.link}
          buttonAction={() => setAddNote(!addNote)}
          icon={IconType.plus}
          iconVariant="start"
          classes={[styles.addButton]}
        >
          Add note
        </Button>
      )}
      <Button type="submit" variant={ButtonType.solid} buttonAction={() => {}}>
        Save
      </Button>
    </form>
  );

  return (
    <>
      {editMode ? (
        <>
          {viewMode ? (
            <div className={styles.accordionWrapper}>
              <Accordion header={'title'} opened>
                {editModeAnnotation}
              </Accordion>
            </div>
          ) : (
            editModeAnnotation
          )}
        </>
      ) : (
        <div className={styles.accordionWrapper}>
          <Accordion header={'title'}>
            <Textarea name="selected" readOnly />
            <Textarea name="note" label="Note" rows={5} readOnly />
            <div className={styles.iconButtonsGroup}>
              <IconButton
                icon={IconType.edit}
                buttonAction={() => {
                  setEditMode(true);
                }}
              />
              <IconButton icon={IconType.remove} buttonAction={() => {}} />
            </div>
          </Accordion>
        </div>
      )}
    </>
  );
};
