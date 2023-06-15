import React from 'react';
import Banner from '../Component/Banner/Banner';
import PopularClasses from '../Component/PopularClasses/PopularClasses';
import PopularInstructor from '../Component/PopularInstructor/PopularInstructor';
import Testimonial from '../Component/Testimonial/Testimonial';

const Home = () => {
    return (
        <div>
            <Banner/>
            <PopularClasses/>
            <PopularInstructor/>
            <Testimonial/>
        </div>
    );
};

export default Home;