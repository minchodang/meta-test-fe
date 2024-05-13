import defaultRequest from '@src/lib/axios/defaultRequest';
import { UserInformationResponse } from '@src/types/api/Signs';
import { ApiHandler } from '@src/types/common/api';
import { useQuery } from '@tanstack/react-query';

export const API_GET_USER_PROFILE = '/users';

export const getUserProfile: ApiHandler<UserInformationResponse> = async () => {
    const { data } = await defaultRequest.get(API_GET_USER_PROFILE);
    return data;
};
