import React from 'react';

const Banner = () => {
  return (
    <div className="relative h-[400px] text-white overflow-hidden">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
        style={{
          backgroundImage: `url('https://i.ibb.co/tZq0SCw/2206-w015-n003-882b-p15-882.jpg')`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Foreground Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="md:px-40 px-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold">
              Transforming Your <span className="text-indigo-800">Dreams</span> into Masterpieces
            </h2>
            <p className="mt-4 text-sm">
              Experience the transformation power of theater at the Art Institute, where aspiring actors,
              directors, and playwrights come together to cultivate their artistic talents. With a dynamic
              curriculum, state-of-the-art facilities, and passionate instructors, we ignite creativity
              and nurture the next generation of theatrical visionaries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
