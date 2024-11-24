import { useMutation } from '@tanstack/react-query';
import { fetchKakaoAccessToken, postApiOauthKakao } from '~/api/oauth';

export const useFetchKakaoAccessToken = () => {
  return useMutation((code: string) => fetchKakaoAccessToken(code));
};

export const usePostApiOauthKakao = () => {
  return useMutation(({ accessToken, loginType }: { accessToken: string; loginType: string }) =>
    postApiOauthKakao(accessToken, loginType)
  );
};
