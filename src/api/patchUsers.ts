import defaultRequest from '@src/lib/axios/defaultRequest';

interface PatchUsersBody {
    email?: string;
    nickname?: string;
    password?: string;
}

export const patchUsers = async (body: PatchUsersBody) => {
    const { data } = await defaultRequest.patch('/users', {
        ...body,
    });
    return data;
};
