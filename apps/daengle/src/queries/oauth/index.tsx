import { useMutation } from '@tanstack/react-query';
import { fetchKakaoAccessToken, postApiOauthKakao } from '~/api/oauth';
import { QUERY_KEYS } from '../query-keys';

export const useFetchKakaoAccessToken = () => {
  return useMutation({
    mutationKey: QUERY_KEYS.FETCH_KAKAO_ACCESS_TOKEN,
    mutationFn: async (code: string) => {
      try {
        return await fetchKakaoAccessToken(code);
      } catch {
        throw new Error('카카오 토큰을 가져오는데 실패했습니다.');
      }
    },
  });
};

export const usePostApiOauthKakao = () => {
  return useMutation({
    mutationKey: QUERY_KEYS.POST_API_OAUTH_KAKAO,
    mutationFn: async ({ accessToken, loginType }: { accessToken: string; loginType: string }) => {
      return await postApiOauthKakao(accessToken, loginType);
    },
  });
};
