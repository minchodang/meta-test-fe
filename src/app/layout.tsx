import { FC } from 'react';
import GlobalModal from '@src/components/common/modal/GlobalModal';
import Toaster from '@src/components/common/toast/Toast';
import './globals.css';
import TanstackQueryProvider from '@src/provider/TanstackQueryProvider';
import { Metadata } from 'next';
import Head from 'next/head';

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
        images: ['/home/meta-test-main.png'],
        description: '당신의 메타인지를 테스트 해 보세요.',
    },
    twitter: {
        title: '메타인지 테스트',
        description: '당신의 메타인지를 테스트 해 보세요.',
        images: ['/home/meta-test-main.png'],
    },
    verification: {
        google: 'E8ZHBmAOyQyZB6ZpMP6wPAjKW69xgQKoW0ChJSRPNiU',
    },
};

const LocaleLayout: FC<LocaleLayoutProps> = ({ children }) => (
    <html lang="ko">
        <Head>
            <link rel="icon" href="meta-favicon.png" sizes="any" />
            <meta name="google-site-verification" content="E8ZHBmAOyQyZB6ZpMP6wPAjKW69xgQKoW0ChJSRPNiU" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="keywords" content="메타인지, 테스트, 인지능력, 자기인식" />
            <meta name="robots" content="index, follow" />
            <meta name="author" content="kode-krew" />
        </Head>
        <body>
            <TanstackQueryProvider>
                {children}
                <Toaster />
                <GlobalModal />
            </TanstackQueryProvider>
        </body>
    </html>
);

export default LocaleLayout;
