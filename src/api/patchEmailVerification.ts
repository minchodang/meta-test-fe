import defaultRequest from '@src/lib/axios/defaultRequest';
import { ApiHandler } from '@src/types/common/api';
import { AxiosResponse } from 'axios';

interface PatchEmailVerificationParameter {
    code: number;
    request_id: string;
}

export const patchEmailVerification: ApiHandler<
    AxiosResponse,
    PatchEmailVerificationParameter
> = async (body) => {
    const { data } = await defaultRequest.patch('/auth/email-verification', {
        ...body,
    });

    return data;
};
