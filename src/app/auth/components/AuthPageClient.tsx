'use client';

import { renewAllCache } from '@src/app/actions/renewAllCache';
import { ToastService } from '@src/service/ToastService';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

type SocialLoginType = 'google' | 'kakao';

interface SocialLoginInfo {
    loginPath: string;
    socialType: SocialLoginType;
}

export interface SocialLoginRequestParameter {
    loginPath: string;
    code: string;
    socialType: SocialLoginType;
}

interface AuthPageClientProps {
    code?: string | string[];
}

const toastService = ToastService.getInstance();

const processSocialLogin = async ({ code, socialType, loginPath }: SocialLoginRequestParameter) => {
    try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_META_TEST_WEB_HOST_URL}/api/social-login`,
          {
            code,
            socialType,
          }
        );
        return data;
    } catch (error) {
        throw error;
    }
};

const AuthPageClient = ({ code }: AuthPageClientProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [cookies] = useCookies(['social-login-info']);
    const socialLoginInfo = cookies['social-login-info'];

    useEffect(() => {
        const handleLogin = async () => {
            if (!socialLoginInfo || !code || typeof code !== 'string') {
                router.replace('/');
                return;
            }

            try {
                const { loginPath, socialType } = socialLoginInfo as SocialLoginInfo;
                const data = await processSocialLogin({
                    code,
                    socialType,
                    loginPath,
                });

                if (data) {
                    toastService.addToast('로그인 되었습니다.');
                    renewAllCache();
                    router.replace(loginPath ?? '/');
                } else {
                    toastService.addToast('로그인에 실패하였습니다.');
                    router.replace(loginPath ?? '/');
                }
            } catch (error) {
                console.log(error);
                toastService.addToast('로그인 중 오류가 발생했습니다.');
                router.replace('/');
            } finally {
                setLoading(false);
            }
        };

        handleLogin();
    }, [router, socialLoginInfo, code]);

    if (loading) {
        return <p>로그인 처리 중...</p>;
    }

    return null;
};

export default AuthPageClient;
