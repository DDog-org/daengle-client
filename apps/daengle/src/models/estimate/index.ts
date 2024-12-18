import { PetEstimateId, PetInfo } from '~/interfaces/estimate';

export interface GetUserEstimateGeneralGroomingPetsResponse {
  pets?: PetEstimateId[];
}

export interface GetUserEstimateGeneralGroomingRequestParams {
  petId: number;

  page: number;
  size: number;
}

export interface GetUserEstimateGeneralGroomingResponse {
  estimates?: GetUserEstimateGeneralGroomingList[];
}

export interface GetUserEstimateGeneralGroomingList {
  id: number;
  name: string;
  daengleMeter: number;
  imageUrl: string;
  shopName: string;
  keywords: string[];
  reservedDate: string;
}

export interface GetUserEstimateGeneralCarePetsResponse {
  pets?: PetEstimateId[];
}

export interface GetUserEstimateGeneralCareRequestParams {
  petId: number;

  page: number;
  size: number;
}

export interface GetUserEstimateGeneralCareResponse {
  estimates?: GetUserEstimateGeneralCareList[];
}

export interface GetUserEstimateGeneralCareList {
  id: number;
  name: string;
  daengleMeter: number;
  imageUrl: string;
  keywords: string[];
  reservedDate: string;
}

export interface GetUserEstimateDesignationGroomingPetsResponse {
  pets?: PetEstimateId[];
}

export interface GetUserEstimateDesignationGroomingRequestParams {
  petId: number;

  page: number;
  size: number;
}

export interface GetUserEstimateDesignationGroomingResponse {
  estimates?: GetUserEstimateDesignationGroomingList[];
}

export interface GetUserEstimateDesignationGroomingList {
  id: number;
  name: string;
  daengleMeter: number;
  imageUrl: string;
  shopName: string;
  keywords: string[];
  reservedDate: string;
}

export interface GetUserEstimateDesignationCarePetsResponse {
  pets?: PetEstimateId[];
}

export interface GetUserEstimateDesignationCareRequestParams {
  petId: number;

  page: number;
  size: number;
}

export interface GetUserEstimateDesignationCareResponse {
  estimates?: GetUserEstimateDesignationCareList[];
}

export interface GetUserEstimateDesignationCareList {
  id: number;
  name: string;
  daengleMeter: number;
  imageUrl: string;
  keywords: string[];
  reservedDate: string;
}

///////////

export interface GetUserEstimateRequestGroomingParams {
  groomingEstimateId: number;
}

export interface GetUserEstimateRequestGroomingResponse {
  id: number;
  address: string;
  reservedDate: string;
  proposal: 'GENERAL' | 'DESIGNATION';
  petImageUrl: string;
  petName: string;
  desiredStyle: string;
  requirements: string;
  petInfos?: PetEstimateId[];
}

export interface GetUserEstimateRequestCareParams {
  careEstimateId: number;
}

export interface GetUserEstimateRequestCareResponse {
  id: number;
  address: string;
  reservedDate: string;
  proposal: 'GENERAL' | 'DESIGNATION';
  petImageUrl: string;
  petName: string;
  symptoms: string;
  requirements: string;
}

export interface PostUserEstimateCancelGroomingRequestBody {
  estimateId: number;
}

export interface PostUserEstimateCancelGroomingResponse {
  requestResult: string;
}

export interface PostUserEstimateCancelCareRequestBody {
  estimateId: number;
}

export interface PostUserEstimateCancelCareResponse {
  requestResult: string;
}

export interface PostUserEstimateGroomerUserInfoRequestBody {
  groomerId: number | null;
}

export interface PostUserEstimateGroomerUserInfoResponse {
  groomerImage: string;
  groomerName: string;
  shopName: string;
  address: string;
  petInfos: PetInfo[];
}

export interface PostUserEstimateGroomingRequestBody {
  groomerId: number;
  petId: number;
  address: string;
  reservedDate: string;
  desiredStyle: string;
  requirements: string;
}

export interface PostUserEstimateGroomingResponse {
  requestResult: string;
}

export interface PostUserEstimateVetUserInfoRequestBody {
  vetId: number;
}

export interface PostUserEstimateVetUserInfoResponse {
  vetImageUrl: string;
  vetName: string;
  address: string;
  petInfos: PetInfo[];
}

export interface PostUserEstimateCareRequestBody {
  vetId: number;
  petId: number;
  address: string;
  reservedDate: string;
  symptoms: string;
  requirements: string | null;
}

export interface PostUserEstimateCareResponse {
  requestResult: string;
}

export interface UserEstimateGroomingDetailRequestParams {
  groomingEstimateId: number;
}

export interface UserEstimateCareDetailRequestParams {
  careEstimateId: number;
}
