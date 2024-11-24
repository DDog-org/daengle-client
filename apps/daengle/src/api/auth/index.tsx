import axios from 'axios';
import { instance } from '../axios';

const REST_API_KEY = process.env.NEXT_PUBLIC_REST_API_KEY;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;
const KAKAO_OAUTH_TOKEN_URL = process.env.NEXT_PUBLIC_KAKAO_OAUTH_TOKEN_URL;

export const fetchKakaoAccessToken = async (code: string) => {
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
    return response.data.access_token;
  } catch (error) {
    alert('로그인 실패, 다시 시도해주세요.');
  }
};

export const sendAccessTokenToBackend = async (accessToken: string, loginType: string) => {
  try {
    await instance.post('/api/oauth/kakao', {
      kakaoAccessToken: accessToken,
      loginType: loginType,
    });
  } catch (error) {
    alert('백엔드로 액세스 토큰을 전송하지 못했습니다');
  }
};
