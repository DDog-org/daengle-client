import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { QUERY_KEYS } from '../query-keys';
import {
  postUserEstimateGrooming,
  postUserEstimateGroomerUserInfo,
  postUserEstimateCare,
  postUserEstimateVetUserInfo,
  getUserEstimateGeneralGroomingPets,
  getUserEstimateGeneralGrooming,
  getUserEstimateGeneralCarePets,
  getUserEstimateGeneralCare,
  getUserEstimateDesignationGroomingPets,
  getUserEstimateGroomingDetail,
  getUserEstimateCareDetail,
  getUserEstimateDesignationGrooming,
  getUserEstimateDesignationCarePets,
  getUserEstimateDesignationCare,
} from '~/apis';

import {
  PostUserEstimateGroomingRequestBody,
  PostUserEstimateGroomerUserInfoRequestBody,
  PostUserEstimateCareRequestBody,
  PostUserEstimateVetUserInfoRequestBody,
  GetUserEstimateGeneralGroomingPetsResponse,
  GetUserEstimateGeneralCarePetsResponse,
  GetUserEstimateDesignationGroomingPetsResponse,
  UserEstimateGroomingDetailRequestParams,
  UserEstimateCareDetailRequestParams,
  GetUserEstimateDesignationCarePetsResponse,
} from '~/models/estimate';
import { PAGE_SIZE } from '~/constants/review';
import { UserEstimateCareDetailData, UserEstimateGroomingDetailData } from '~/interfaces/estimate';

export const useUserEstimateGeneralGroomingPetsQuery = () => {
  return useQuery<GetUserEstimateGeneralGroomingPetsResponse>({
    queryKey: QUERY_KEYS.GET_USER_ESTIMATE_GENERAL_GROOMING_PETS,
    queryFn: () => {
      return getUserEstimateGeneralGroomingPets();
    },
  });
};

export const useUserEstimateGeneralGroomingQuery = (petId: number) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.GET_USER_ESTIMATE_GENERAL_GROOMING,
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) => {
      return getUserEstimateGeneralGrooming({
        petId,
        page: pageParam,
        size: PAGE_SIZE,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.estimates?.length === PAGE_SIZE ? allPages.length + 1 : undefined;
    },
    enabled: !!petId,
  });
};

export const useUserEstimateGeneralCarePetsQuery = () => {
  return useQuery<GetUserEstimateGeneralCarePetsResponse>({
    queryKey: QUERY_KEYS.GET_USER_ESTIMATE_GENERAL_CARE_PETS,
    queryFn: () => {
      return getUserEstimateGeneralCarePets();
    },
  });
};

export const useUserEstimateGeneralCareQuery = (petId: number) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.GET_USER_ESTIMATE_GENERAL_CARE,
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) => {
      return getUserEstimateGeneralCare({
        petId,
        page: pageParam,
        size: PAGE_SIZE,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.estimates?.length === PAGE_SIZE ? allPages.length + 1 : undefined;
    },
    enabled: !!petId,
  });
};

export const useUserEstimateDesignationGroomingPetsQuery = () => {
  return useQuery<GetUserEstimateDesignationGroomingPetsResponse>({
    queryKey: QUERY_KEYS.GET_USER_ESTIMATE_DESIGNATION_GROOMING_PETS,
    queryFn: () => {
      return getUserEstimateDesignationGroomingPets();
    },
  });
};

export const useUserEstimateDesignationGroomingQuery = (petId: number) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.GET_USER_ESTIMATE_DESIGNATION_GROOMING,
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) => {
      return getUserEstimateDesignationGrooming({
        petId,
        page: pageParam,
        size: PAGE_SIZE,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.estimates?.length === PAGE_SIZE ? allPages.length + 1 : undefined;
    },
    enabled: !!petId,
  });
};

export const useUserEstimateDesignationCarePetsQuery = () => {
  return useQuery<GetUserEstimateDesignationCarePetsResponse>({
    queryKey: QUERY_KEYS.GET_USER_ESTIMATE_DESIGNATION_CARE_PETS,
    queryFn: () => {
      return getUserEstimateDesignationCarePets();
    },
  });
};

export const useUserEstimateDesignationCareQuery = (petId: number) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.GET_USER_ESTIMATE_DESIGNATION_CARE,
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) => {
      return getUserEstimateDesignationCare({
        petId,
        page: pageParam,
        size: PAGE_SIZE,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.estimates?.length === PAGE_SIZE ? allPages.length + 1 : undefined;
    },
    enabled: !!petId,
  });
};

export const usePostUserEstimateGroomerUserInfoMutation = () => {
  return useMutation({
    mutationKey: QUERY_KEYS.POST_ESTIMATE_GROOMER_USER_INFO,
    mutationFn: async (body: PostUserEstimateGroomerUserInfoRequestBody) => {
      try {
        return await postUserEstimateGroomerUserInfo(body);
      } catch (error) {
        throw new Error(String(error));
      }
    },
  });
};

export const usePostUserEstimateGroomingMutation = () => {
  return useMutation({
    mutationKey: QUERY_KEYS.POST_ESTIMATE_GROOMING,
    mutationFn: async (body: PostUserEstimateGroomingRequestBody) => {
      try {
        return await postUserEstimateGrooming(body);
      } catch (error) {
        throw new Error(String(error));
      }
    },
  });
};

export const usePostUserEstimateVetUserInfoMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.POST_USER_ESTIMATE_VET_USER_INFO],
    mutationFn: async (body: PostUserEstimateVetUserInfoRequestBody) => {
      try {
        return await postUserEstimateVetUserInfo(body);
      } catch (error) {
        throw new Error(String(error));
      }
    },
  });
};

export const usePostUserEstimateCareMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.POST_USER_ESTIMATE_CARE],
    mutationFn: async (body: PostUserEstimateCareRequestBody) => {
      try {
        return await postUserEstimateCare(body);
      } catch (error) {
        throw new Error(String(error));
      }
    },
  });
};

export const useEstimateGroomingDetailQuery = (
  params: UserEstimateGroomingDetailRequestParams,
  enabled: boolean
) => {
  return useQuery<UserEstimateGroomingDetailData>({
    queryKey: [QUERY_KEYS.GET_USER_ESTIMATE_GROOMER_DETAIL, params],
    queryFn: async () => {
      try {
        const data = await getUserEstimateGroomingDetail(params);
        return data;
      } catch (error) {
        throw new Error('데이터 로딩에 실패했습니다.');
      }
    },
    enabled,
  });
};

export const useEstimateCareDetailQuery = (
  params: UserEstimateCareDetailRequestParams,
  enabled: boolean
) => {
  return useQuery<UserEstimateCareDetailData>({
    queryKey: [QUERY_KEYS.GET_USER_ESTIMATE_VET_DETAIL, params],
    queryFn: async () => {
      try {
        const data = await getUserEstimateCareDetail(params);
        return data;
      } catch (error) {
        throw new Error('데이터 로딩에 실패했습니다.');
      }
    },
    enabled,
  });
};
