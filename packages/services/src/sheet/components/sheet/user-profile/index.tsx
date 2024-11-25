import React from 'react';
import styles from './index.styles';

interface Props {
  userImage: string;
  userName: string;
}

const UserProfile: React.FC<Props> = ({ userImage, userName }: Props) => {
  return (
    <div css={styles.wrapper}>
      <img src={userImage} alt={`${userName} 프로필`} css={styles.image} />
      <p css={styles.name}>{userName}</p>
    </div>
  );
};

export default UserProfile;
