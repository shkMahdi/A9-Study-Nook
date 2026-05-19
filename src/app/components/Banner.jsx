import Image from 'next/image';
import React from 'react';

const Banner = () => {
    return (
        <section className="bg-[#1C1512] text-[#EADBC8] shadow-lg">
            <div className='max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 py-12 md:py-16 lg:py-20 gap-8 lg:gap-12'>
                <div className="w-full lg:w-1/2 text-center lg:text-left flex-2 md:flex-2 order-2 lg:order-1">

                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        Find Your Perfect Study Room
                    </h1>

                    <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-[#C8B6A6]">
                        Browse and book quiet, private study rooms in your library.
                        List your own room and earn.
                    </p>

                    <div className="mt-8 md:mt-10 flex justify-center lg:justify-start">
                        <button className="btn border-none 
                            bg-[#6B4F3A] hover:bg-[#8A6A52] 
                            text-white 
                            px-8 py-6
                            rounded-xl 
                            text-base sm:text-lg font-medium 
                            shadow-md transition duration-300">
                            Explore Rooms
                        </button>
                    </div>

                </div>

                <div className="w-full lg:w-1/2 overflow-hidden rounded-2xl shadow-lg flex-1 md:flex-1 md:order-1 lg:order-2 md:max-w-sm lg:max-w-md mx-auto md:mx-0">
                    <Image
                        src="/asset/banner-img.jpg"
                        alt="Study Room"
                        width={400}
                        height={300}
                        quality={100}
                        priority
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

export default Banner;