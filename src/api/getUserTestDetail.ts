import defaultRequest from '@src/lib/axios/defaultRequest';
import variableAssignment from '@src/lib/axios/variableAssignment';
import { GetUserTestResponse } from '@src/types/api/test';
import { ApiHandler } from '@src/types/common/api';

export interface GetUserTestDetailParameter {
    id: string;
    sort_key: string;
}

export const API_GET_USER_TEST_DETAIL = `/users/test/{{id}}`;

export const getUserTestDetail: ApiHandler<
    GetUserTestResponse,
    GetUserTestDetailParameter
> = async ({ id, ...params }) => {
    const { data } = await defaultRequest.get(
        variableAssignment(API_GET_USER_TEST_DETAIL, { id }),
        {
            params,
        },
    );
    return data;
};
