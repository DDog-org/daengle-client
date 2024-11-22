import styles from './index.module.scss';

export default function Login() {
export default function Login() {
  const REST_API_KEY = '4e8bf4afe34797b1bf901625a0a4aa47';
  const REDIRECT_URI = 'http://localhost:3000/auth/callback';
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

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
