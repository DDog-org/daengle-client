import { wrapper, buttonBox, buttonTextBox } from './index.styles';

const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export default function Auth() {
  const handleKakaoLoginClick = () => {
    window.location.href = kakaoAuthUrl;
  };
  return (
    <div css={wrapper}>
      <button css={buttonBox} onClick={handleKakaoLoginClick}>
        <span css={buttonTextBox}>카카오톡으로 시작하기 zz</span>
      </button>
    </div>
  );
}
