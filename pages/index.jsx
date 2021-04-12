import React from 'react';
import Service3 from '../src/landingSections/Services3';
import Service4 from '../src/landingSections/Services4';
import Service5 from '../src/landingSections/Services5';
import { Element } from 'react-scroll';
import Intro3 from '../src/landingSections/Intro3';
import TopBar3 from '../src/landingSections/TopBar3';

import Pricing1 from '../src/landingSections/Pricing1';
import Footer1 from '../src/landingSections/Footer1';

import GlobalCss from '../src/assets/jss/GlobalCss';

import { useRouter } from 'next/router';
import { useFetchUser } from '../src/lib/user';

const Home = () => {
    const { user, loading } = useFetchUser();
    const router = useRouter();
    if (!loading && user) {
        router.push('/restaurants');
    }

    return (
        <GlobalCss>
            <div className="landing">
                <TopBar3 />

                <Element name={'1'}>
                    <Service3 />
                </Element>
                <Element name={'2'}>
                    <Intro3 />
                </Element>
                <Element name={'3'}>
                    <Service4 />
                </Element>
                <Element name={'4'}>
                    <Service5 />
                </Element>
                <Element name={'5'}>
                    <Pricing1 />
                </Element>

                {/* <Service6 /> */}
                {/* <Testimonial3 /> */}
                {/* <CallToAction2 /> */}

                <Footer1 />
            </div>
        </GlobalCss>
    );
};

export default Home;
