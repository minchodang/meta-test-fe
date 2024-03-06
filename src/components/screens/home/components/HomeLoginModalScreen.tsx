import { FC } from 'react';
import TextInput from '@src/components/common/CommonInput';
import GoogleIcon from '@src/components/common/Icons/GoogleIcon';
import KakaoIcon from '@src/components/common/Icons/KakaoIcon';
import Image from 'next/image';
import googleLoginImage from 'public/home/login/google_login.png';
import kakaoLoginImage from 'public/home/login/kakao_login_ko.png';
import HomeBasicLoginSection from './HomeBasicLoginSection';

interface HomeLoginModalScreenProps {}

const HomeLoginModalScreen: FC<HomeLoginModalScreenProps> = () => (
    <div className="container rounded-md border border-violet-400 bg-violet-200 px-5 pb-5 pt-7">
        <p className="text-2xl font-bold">로그인</p>
        <section className="mt-3 flex flex-col gap-3">
            <button
                type="button"
                className="flex h-10 w-full  items-center gap-2 rounded-md bg-slate-200 p-3"
            >
                <GoogleIcon />
                <p className="flex w-full justify-center text-sm">Continues With Google</p>
            </button>
            <button
                type="button"
                className="flex h-10 w-full  items-center gap-2 rounded-md bg-yellow-300 p-3"
            >
                <KakaoIcon />
                <p className="flex w-full justify-center text-sm">카카오 로그인</p>
            </button>
        </section>
        <hr className="mt-4 h-px border-none bg-violet-400" />
        <HomeBasicLoginSection />
    </div>
);

export default HomeLoginModalScreen;
