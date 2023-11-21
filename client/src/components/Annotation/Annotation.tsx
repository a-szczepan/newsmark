import { useEffect, useRef, useState } from 'react';
import { Button, ButtonType, IconButton } from '../Button/Button';
import { IconType } from '../Icon/Icon';
import { Input, InputType, Textarea } from '../Input/Input';
import styles from './Annotation.module.scss';
import classnames from 'classnames';
import {
  useAddAnnotationMutation,
  useEditAnnotationMutation
} from '../../store/api/articleApi';
import { useSearchParams } from 'react-router-dom';

type AnnotationNote = {
  titleValue: string;
  colorValue: string;
  noteValue: string;
};

type EditAnnotationProps = {
  annotationId?: number;
  data?: AnnotationNote;
  selectedText: string;
  setAnnotations: any;
};

type ReadAnnotationProps = {
  annotationId: number;
  data: AnnotationNote;
  selectedText: string;
  setEditMode: any;
};

type ColorPickerProps = {
  selectedColor: string;
  onColorChange: (color: string) => void;
};

const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorChange
}) => {
  const [picked, setPicked] = useState(selectedColor);
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

export const EditAnnotation: React.FC<EditAnnotationProps> = ({
  annotationId,
  data,
  selectedText,
  setAnnotations
}) => {
  const [addNote, setAddNote] = useState(data?.noteValue ? true : false);
  const [addAnnotation] = useAddAnnotationMutation({});
  const [editAnnotation, { data: annotations, isSuccess: gotAnnotations }] =
    useEditAnnotationMutation({});
  const titleRef = useRef<HTMLInputElement>(null);
  const selectedTextRef = useRef<HTMLTextAreaElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);
  const [selectedColor, setSelectedColor] = useState(
    data ? data.colorValue : 'green'
  );
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url');

  useEffect(() => {
    if (gotAnnotations) setAnnotations(annotations);
  }, [annotations]);

  return (
    <form
      className={styles.annotation}
      onSubmit={async (e) => {
        e.preventDefault();
        const title = titleRef.current?.value || '';
        const note = noteRef.current?.value || '';
        const selectedText = selectedTextRef.current?.value || '';
        if (data && annotationId) {
          await editAnnotation({
            annotation: {
              title,
              selectedText,
              color: selectedColor,
              note,
              articleUrl: url
            },
            annotationId
          });
        } else {
          addAnnotation({
            title,
            selectedText,
            color: selectedColor,
            note,
            articleUrl: url
          });
        }
      }}
    >
      <Input
        type={InputType.text}
        label="Title"
        name="title"
        reference={titleRef}
        {...(data && { value: data.titleValue })}
      />
      <Textarea
        label="Selected text"
        name="title"
        rows={5}
        reference={selectedTextRef}
        value={selectedText}
        readOnly
      />
      <ColorPicker
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
      />
      {addNote ? (
        <Textarea
          label="Note"
          reference={noteRef}
          {...(data && { value: data.noteValue })}
        />
      ) : (
        <Button
          variant={ButtonType.link}
          buttonAction={() => setAddNote(!addNote)}
          icon={IconType.plus}
          iconVariant="start"
          classes={[styles.addButton]}
        >
          Add note{' '}
        </Button>
      )}
      <Button type="submit" variant={ButtonType.solid} buttonAction={() => {}}>
        Save
      </Button>
    </form>
  );
};

export const ReadAnnotation: React.FC<ReadAnnotationProps> = ({
  annotationId,
  data,
  selectedText,
  setEditMode
}) => {
  return (
    <div>
      <Textarea name="selected" readOnly value={selectedText} />
      <Textarea
        name="note"
        label="Note"
        rows={5}
        readOnly
        value={data.noteValue}
      />
      <div className={styles.iconButtonsGroup}>
        <IconButton
          icon={IconType.edit}
          buttonAction={() => {
            setEditMode(annotationId);
          }}
        />
        <IconButton icon={IconType.remove} buttonAction={() => {}} />
      </div>
    </div>
  );
};
