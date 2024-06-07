import React, { FC } from 'react';
import Image from 'next/image';
import MetaMainImage from 'public/home/meta-test-main.png';
import MainPageDescription from '../components/HomePageDescription';
import MainPageEbsImage from '../components/HomePageEbsImage';
import MainPageTitleBox from '../components/HomePageTitleBox';

interface HomeBodyProps {}

const HomeBody: FC<HomeBodyProps> = () => (
    <footer className="flex flex-col gap-14">
        <div className="w-full">
            <div className="relative w-screen">
                <Image src={MetaMainImage} loading="eager" alt="메타 테스트 이미지" priority />
                <div className="absolute bottom-0 w-screen sm:bottom-10 md:bottom-20">
                    <MainPageTitleBox />
                </div>
            </div>
        </div>
        <div className="w-full">
            <MainPageDescription />
            <MainPageEbsImage />
        </div>
    </footer>
);

export default React.memo(HomeBody);
