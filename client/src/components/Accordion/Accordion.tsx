import { PropsWithChildren, useState } from 'react';
import styles from './Accordion.module.scss';
import { Typography } from '../Typography/Typography';
import { Button, ButtonType, IconButton } from '../Button/Button';
import { IconType } from '../Icon/Icon';

type AccordionProps = PropsWithChildren<{
  header: string;
}>;

export const Accordion: React.FC<AccordionProps> = ({ header, children }) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div className={styles.accordion}>
      <div className={styles.accordionHeader}>
        <Typography styleVariant="body">• {header}</Typography>
        <IconButton
          icon={isOpened ? IconType.chevronUp : IconType.chevronDown}
          buttonAction={() => setIsOpened(!isOpened)}
        />
      </div>
      {isOpened && <div className={styles.content}>{children}</div>}
    </div>
  );
};