import defaultRequest from '@src/lib/axios/defaultRequest';
import { PostEmailVerificationResponse } from '@src/types/api/Signs';

interface PostEmailVerificationBody {
    email: string;
}

export const postEmailVerification = async (body: PostEmailVerificationBody) => {
    const { data } = await defaultRequest.post<PostEmailVerificationResponse>(
        '/auth/email-verification',
        { ...body },
    );
    return data;
};
