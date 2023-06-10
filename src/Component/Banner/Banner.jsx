import React from 'react';

const Banner = () => {
      
    return (
        <div>
            <div
      style={{
        backgroundImage: `url('https://i.ibb.co/tZq0SCw/2206-w015-n003-882b-p15-882.jpg'), linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5))`,
        backgroundBlendMode: "overlay",
      }}
      className="bg-cover bg-center h-[600px] text-white px-4 mb-2"
    >
      <div className="container mx-auto py-36">
        <div className="w-full px-5 lg:px-0 lg:w-2/5">
          <h2 className="text-white text-5xl lg:text-6xl leading-tight tracking-tighter font-bold">
          Transforming Your <span className='text-indigo-800'>Dreams</span> into Masterpieces
          </h2>
          <p className="text-white text-xl mt-5">
          Experience the transformation power of theater at the Art Institute, where aspiring actors, directors, and playwrights come together to cultivate their artistic talents. With a dynamic curriculum, state-of-the-art facilities, and passionate instructors, we ignite creativity and nurture the next generation of theatrical visionaries.
          </p>
        </div>
        
      </div>
    </div>
        </div>
    );
};

export default Banner;
