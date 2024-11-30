import { useMutation, useQuery } from '@tanstack/react-query';
import { getBreedList, postAvailableNickname, postJoinWithoutPet, postJoinWithPet } from '~/apis';
import {
  PostAvailableNicknameRequestBody,
  PostJoinWithoutPetRequestBody,
  PostJoinWithPetRequestBody,
} from '~/models';
import { QUERY_KEYS } from '~/queries/query-keys';

export const usePostJoinWithoutPetMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.POST_JOIN_WITHOUT_PET],
    mutationFn: async (body: PostJoinWithoutPetRequestBody) => {
      try {
        return await postJoinWithoutPet(body);
      } catch (error) {
        throw new Error(String(error));
      }
    },
  });
};

export const usePostAvailableNicknameMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.POST_AVAILABLE_NICKNAME],
    mutationFn: async (body: PostAvailableNicknameRequestBody) => {
      try {
        return await postAvailableNickname(body);
      } catch (error) {
        throw new Error(String(error));
      }
    },
  });
};

export const useGetBreedListQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_BREED_LIST],
    queryFn: async () => {
      try {
        return await getBreedList();
      } catch (error) {
        throw new Error(String(error));
      }
    },
    select: (data) => data?.breedList,
  });
};

export const usePostJoinWithPetMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.POST_JOIN_WITH_PET],
    mutationFn: async (body: PostJoinWithPetRequestBody) => {
      try {
        return await postJoinWithPet(body);
      } catch (error) {
        throw new Error(String(error));
      }
    },
  });
};