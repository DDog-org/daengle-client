import { api } from '~/apis';
import {
  GetGroomerEstimateDetailParams,
  GetGroomerEstimateDetailResponse,
  GetGroomerEstimateListResponse,
  PostGroomerEstimateBody,
  PostGroomerEstimateResponse,
} from '~/models/estimate';

export const getGroomerEstimateList = async () => {
  return await api.get<GetGroomerEstimateListResponse>('/groomer/estimate/list');
};

export const getGroomerEstimateDetail = async (params: GetGroomerEstimateDetailParams) => {
  return await api.get<GetGroomerEstimateDetailResponse>(`/groomer/estimate/${params.id}/detail`);
};

export const postGroomerEstimate = async (body: PostGroomerEstimateBody) => {
  return await api.post<PostGroomerEstimateResponse>('/groomer/estimate', body);
};
