import defaultRequest from '@src/lib/axios/defaultRequest';
import { PostSignupResponse } from '@src/types/api/Signs';

interface PostSignupBody {
    Id?: string;
    email: string;
    password: string;
    nickname?: string;
    gender?: string;
    age?: number;
}

export const postSignup = async (body: PostSignupBody) => {
    const { data } = await defaultRequest.post<PostSignupResponse>('/users', { ...body });
    return data;
};
