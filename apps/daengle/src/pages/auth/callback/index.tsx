import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const KAKAO_OAUTH_TOKEN_URL = process.env.NEXT_PUBLIC_KAKAO_OAUTH_TOKEN_URL;
const KAKAO_OAUTH_BACKEND_URL = process.env.NEXT_PUBLIC_KAKAO_OAUTH_BACKEND_URL;

export default function Callback() {
  const router = useRouter();
  const { code } = router.query || {};

  useEffect(() => {
    const fetchAccessToken = async () => {
      if (!code) return;

      try {
        const response = await axios.post(KAKAO_OAUTH_TOKEN_URL, null, {
          params: {
            grant_type: 'authorization_code',
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: code,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        const { access_token } = response.data;

        // 액세스 토큰 백엔드한테 보내주기
        const serverResponse = await axios.post(KAKAO_OAUTH_BACKEND_URL, {
          kakaoAccessToken: access_token,
          loginType: 'GROOMER',
        });
      } catch (error) {
        alert('로그인 실패. 다시 시도해주세요.');
      }
    };

    fetchAccessToken();
  }, [code]);

  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}
