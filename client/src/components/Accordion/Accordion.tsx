import { PropsWithChildren } from 'react';
import styles from './Accordion.module.scss';
import { Typography } from '../Typography/Typography';
import { IconButton } from '../Button/Button';
import { IconType } from '../Icon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAccordion } from '../../store/slices/accordionSlice';

type AccordionProps = PropsWithChildren<{
  id?: string;
  header: string;
  opened?: boolean;
}>;

export const Accordion: React.FC<AccordionProps> = ({
  id,
  header,
  children
}) => {
  const isOpen = useSelector((state: any) => state?.accordion[id!]);
  const dispatch = useDispatch();

  const handleAccordionClick = () => {
    dispatch(toggleAccordion(id));
  };
  return (
    <div className={styles.accordion}>
      <div className={styles.accordionHeader}>
        <Typography styleVariant="body">• {header}</Typography>
        <IconButton
          id={id}
          icon={isOpen ? IconType.chevronUp : IconType.chevronDown}
          buttonAction={() => handleAccordionClick()}
        />
      </div>
      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  );
};
