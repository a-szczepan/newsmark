import { useEffect, useState } from 'react';
import { Button, ButtonType, IconButton } from '../Button/Button';
import { IconType } from '../Icon/Icon';
import { Input, InputType, Textarea } from '../Input/Input';
import styles from './Annotation.module.scss';
import classnames from 'classnames';
import { Accordion } from '../Accordion/Accordion';

type AnnotationProps = {
  viewMode?: boolean;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const ColorPicker: React.FC = () => {
  const [picked, setPicked] = useState('green');
  return (
    <div className={styles.colorPicker}>
      {['green', 'blue', 'yellow', 'pink', 'purple'].map((color, index) => (
        <div
          className={classnames(styles.color, styles[color], {
            [styles.picked]: picked === color
          })}
          key={index}
          onClick={() => setPicked(color)}
        />
      ))}
    </div>
  );
};

export const Annotation: React.FC<AnnotationProps> = ({
  viewMode,
  editMode,
  setEditMode
}) => {
  const [addNote, setAddNote] = useState(false);

  const editModeAnnotation = (
    <div className={styles.annotation}>
      <Input type={InputType.text} label="Title" name="title" />
      <Textarea label="Selected text" name="title" rows={5} />
      <ColorPicker />
      {addNote ? (
        <Textarea label="Note" />
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
      <Button variant={ButtonType.solid} buttonAction={() => {}}>
        Save
      </Button>
    </div>
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
