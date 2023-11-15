import { useState } from 'react';
import { Button, ButtonType } from '../Button/Button';
import { IconType } from '../Icon/Icon';
import { Input, InputType, Textarea } from '../Input/Input';
import styles from './Annotation.module.scss';
import classnames from 'classnames';

type AnnotationProps = {
  editMode?: boolean;
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

export const Annotation: React.FC<AnnotationProps> = ({ editMode = false }) => {
  const [addNote, setAddNote] = useState(false);

  return (
    <>
      {editMode ? (
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
      ) : (
        <>
        </>
      )}
    </>
  );
};
