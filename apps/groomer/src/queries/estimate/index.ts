import { useMutation, useQuery } from '@tanstack/react-query';
import { GroomingEstimateList } from '~/interfaces/estimate';
import {
  GetGroomerEstimateDetailParams,
  GetGroomerEstimateDetailResponse,
  PostGroomerEstimateBody,
} from '~/models/estimate';
import { getGroomerEstimateList, getGroomerEstimateDetail, postGroomerEstimate } from '~/apis';
import { QUERY_KEYS } from '~/queries/query-keys';

export const useGetGroomerEstimateListQuery = () => {
  return useQuery<GroomingEstimateList[]>({
    queryKey: QUERY_KEYS.GET_GROOMER_ESTIMATE_LIST,
    queryFn: async () => {
      try {
        const data = await getGroomerEstimateList();
        return data.allEstimates;
      } catch (error) {
        throw new Error('견적 리스트를 가져오는 데 실패했습니다.');
      }
    },
  });
};

export const useGetGroomerEstimateDetailQuery = (params: GetGroomerEstimateDetailParams) => {
  return useQuery<GetGroomerEstimateDetailResponse>({
    queryKey: [QUERY_KEYS.GET_GROOMER_ESTIMATE_DETAIL, params],
    queryFn: async () => {
      try {
        const data = await getGroomerEstimateDetail(params);
        return data;
      } catch (error) {
        throw new Error('견적 상세 정보를 가져오는 데 실패했습니다.');
      }
    },
    enabled: !!params,
  });
};

export const usePostGroomerEstimateMutation = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.POST_GROOMER_ESTIMATE],
    mutationFn: async (body: PostGroomerEstimateBody) => {
      try {
        return await postGroomerEstimate(body);
      } catch (error) {
        throw new Error('데이터 전송에 실패하였습니다.');
      }
    },
  });
};
