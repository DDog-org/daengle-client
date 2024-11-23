import styles from './index.module.scss';

const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export default function Auth() {
  const handleKakaoLoginClick = () => {
    window.location.href = kakaoAuthUrl;
  };
  return (
    <div className={styles.wrapper}>
      <button className={styles.buttonBox} onClick={handleKakaoLoginClick}>
        <span className={styles.buttonTextBox}>카카오톡으로 시작하기</span>
      </button>
    </div>
  );
}
