import React from 'react';
import styles from './index.styles';

interface Props {
  title: string;
  placeholder: string;
  height?: number;
}

const AddInput: React.FC<Props> = ({ title, placeholder, height }: Props) => {
  return (
    <div>
      <div css={styles.addTitle}>{title}</div>
      <section css={styles.inputSection}>
        <textarea
          css={[styles.textarea, height && { minHeight: `${height}px` }]}
          placeholder={placeholder}
        />
      </section>
    </div>
  );
};

export default AddInput;
