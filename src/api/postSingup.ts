import defaultRequest from '@src/lib/axios/defaultRequest';

interface PostSignupBody {
    Id?: string;
    email: string;
    password: string;
    nickname?: string;
    gender?: string;
    age?: number;
}

export const postSignup = async (body: PostSignupBody) => {
    const { data } = await defaultRequest.post('/users', { ...body });
    return data;
};
