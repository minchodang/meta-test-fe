import HomeFooterButton from '@src/components/screens/home/components/HomeFooterButton';
import HomeBody from '@src/components/screens/home/section/HomeBody';
import HomeFooter from '@src/components/screens/home/section/HomeFooter';
import dynamic from 'next/dynamic';

const HomeHeaderButton = dynamic(
    () => import('@src/components/screens/home/section/HomeHeaderButton'),
    {
        ssr: false,
    },
);

const HomePage = () => (
    <div className="w-screen">
        <header className="m-5 flex h-10 flex-row-reverse">
            <HomeHeaderButton />
        </header>
        <HomeBody />
        <HomeFooter />
        <HomeFooterButton />
    </div>
);
export default HomePage;
