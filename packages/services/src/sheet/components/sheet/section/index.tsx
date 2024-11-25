import React from 'react';
import styles from './index.styles';

interface Props {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<Props> = ({ title, children }: Props) => {
  return (
    <section css={styles.wrapper}>
      <div css={styles.title}>{title}</div>
      <div css={styles.content}>{children}</div>
    </section>
  );
};

export default Section;
