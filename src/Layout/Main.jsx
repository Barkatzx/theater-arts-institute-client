import React from 'react';
import Navbar from '../Component/Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Component/Shared/Footer/Footer';
import { Helmet } from 'react-helmet';

const Main = () => {
    return (
        <div>
            <Helmet>
                <title>HomePage | Theater Art Institute</title>
            </Helmet>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Main;