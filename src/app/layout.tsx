import { FC } from 'react';
import GlobalModal from '@src/components/common/modal/GlobalModal';
import Toaster from '@src/components/common/toast/Toast';
import './globals.css';
import TanstackQueryProvider from '@src/provider/TanstackQueryProvider';
import { Metadata } from 'next';
import Head from 'next/head';
import { checkToken } from '@src/lib/server/auth/checkToken';
import { cookies } from 'next/headers';
import { AuthProvider } from '@src/provider/AuthProvider';

interface LocaleLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: '메타인지 테스트',
    description: '메타인지를 테스트 할 수 있는 사이트입니다.',
    openGraph: {
        type: 'website',
        siteName: 'meta-cognition-test',
        locale: 'ko-kr',
        title: '메타인지 테스트',
        images: ['https://www.meta-cognition.site/home/meta-test-main.png'],
        description: '당신의 메타인지를 테스트 해 보세요.',
    },
    twitter: {
        title: '메타인지 테스트',
        description: '당신의 메타인지를 테스트 해 보세요.',
        images: ['https://www.meta-cognition.site/home/meta-test-main.png'],
    },
    verification: {
        google: 'E8ZHBmAOyQyZB6ZpMP6wPAjKW69xgQKoW0ChJSRPNiU',
        other: {
            'naver-site-verification': '24858e1b15eac669a740295bb91aa95fa8d2d5df',
        },
    },
};

const LocaleLayout: FC<LocaleLayoutProps> = async ({ children }) => {
    const accessToken = cookies().get('atk')?.value;
    const { token } = await checkToken(accessToken);

    return (
        <html lang="ko">
            <Head>
                <link rel="icon" href="/meta-favicon.png" sizes="any" />
                <meta
                    name="naver-site-verification"
                    content="24858e1b15eac669a740295bb91aa95fa8d2d5df"
                />
                <meta
                    name="google-site-verification"
                    content="E8ZHBmAOyQyZB6ZpMP6wPAjKW69xgQKoW0ChJSRPNiU"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="메타인지,메타 테스트, 테스트, 인지능력, 자기인식" />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="kode-krew" />
            </Head>
            <body>
                <AuthProvider
                    accessToken={accessToken ?? token?.access_token}
                    refreshToken={token?.refresh_token}
                />
                <TanstackQueryProvider>
                    {children}
                    <Toaster />
                    <GlobalModal />
                </TanstackQueryProvider>
            </body>
        </html>
    );
};

export default LocaleLayout;
