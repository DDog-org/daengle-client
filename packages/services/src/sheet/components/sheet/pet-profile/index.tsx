import React from 'react';
import styles from './index.styles';

interface Props {
  image: string;
  name: string;
  attributes: { label: string; value: string }[];
}

const PetDetails: React.FC<Props> = ({ image, name, attributes }: Props) => {
  return (
    <div css={styles.wrapper}>
      <div css={styles.profile}>
        <img src={image} alt={`${name} 프로필`} css={styles.image} />
        <div css={styles.name}>{name}</div>
      </div>
      <div css={styles.detail}>
        <div css={styles.labelWrapper}>
          {attributes.map((attr, index) => (
            <div css={styles.label} key={`label-${index}`}>
              {attr.label}
            </div>
          ))}
          <div css={styles.detailButton}>자세히보기 {'>'}</div>
        </div>
        <div css={styles.valueWrapper}>
          {attributes.map((attr, index) => (
            <div css={styles.value} key={`value-${index}`}>
              {attr.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
