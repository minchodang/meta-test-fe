export type UserAccountType = 'NORMAL' | 'KAKAO' | 'GOOGLE';

export interface UserInformationResponse {
    id?: string;
    email: string;
    nickname?: string;
    gender?: string;
    age?: number;
    userType: UserAccountType;
}

export interface PostEmailVerificationResponse {
    request_id: string;
}
