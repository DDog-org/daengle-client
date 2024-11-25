import React from 'react';
import styles from './index.styles';

interface Props {
  label: string;
  onClick?: () => void;
}

const AcceptButton: React.FC<Props> = ({ label, onClick }: Props) => {
  return (
    <button css={styles.acceptButton} onClick={onClick}>
      {label}
    </button>
  );
};

export default AcceptButton;
