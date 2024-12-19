import { api } from '~/apis';
import {
  GetBreedListResponse,
  GetGroomerPetInfoRequestParams,
  GetGroomerPetInfoResponse,
  GetGroomerWeekRequestParams,
  GetGroomerWeekResponse,
} from '~/models/reservation';

export const getGroomerWeek = async (params: GetGroomerWeekRequestParams) => {
  return await api.get<GetGroomerWeekResponse>(`/groomer/week/${params.date}`);
};

export const getGroomerPetInfo = async (params: GetGroomerPetInfoRequestParams) => {
  return await api.get<GetGroomerPetInfoResponse>(`/groomer/petInfo/${params.petId}`);
};

export const getBreedList = async () => {
  return await api.get<GetBreedListResponse>('/user/breed/list');
};