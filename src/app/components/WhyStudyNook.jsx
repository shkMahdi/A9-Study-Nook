import React from 'react';
import { FiShield, FiZap, FiClock, FiLock, FiStar, FiUsers } from 'react-icons/fi';

const features = [
    {
        icon: <FiZap />,
        title: 'Instant Booking',
        description: 'Reserve any room in seconds with real-time availability. No waiting, no back-and-forth — just book and show up.',
    },
    {
        icon: <FiShield />,
        title: 'Conflict-Free Guarantee',
        description: 'Our smart time-conflict detection ensures your slot is always yours. Double bookings are a thing of the past.',
    },
    {
        icon: <FiClock />,
        title: 'Flexible Hours',
        description: 'Book by the hour, only for what you need. Morning grind or late-night session — we have you covered.',
    },
    {
        icon: <FiLock />,
        title: 'Secure & Private',
        description: 'JWT authentication with HTTP-only cookies keeps your account and data safe at every step.',
    },
    {
        icon: <FiStar />,
        title: 'Verified Listings',
        description: 'Every room is listed by real students and library users. What you see is exactly what you get.',
    },
    {
        icon: <FiUsers />,
        title: 'List & Earn',
        description: 'Own a study space? List it on StudyNook and earn from every hourly booking — completely hassle-free.',
    },
];

const WhyStudyNook = () => {
    return (
        <section className="relative overflow-hidden bg-[#1C1512] px-6 py-24 text-[#F7EBDD] border-t border-[#3A2B22]">

            <div className="absolute -right-40 top-0 h-96 w-96 rounded-full border border-[#3B2B22]" />
            <div className="absolute -left-40 bottom-0 h-64 w-64 rounded-full border border-[#3B2B22]" />

            <div className="relative z-10 mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-8 max-w-xl">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4A3528] bg-[#211611] px-4 py-2 text-xs tracking-wide text-[#E0B07A]">
                        <span>✦</span>
                        <span>WHY STUDYNOOK</span>
                    </div>
                    <h1 className="text-4xl font-black leading-tight text-[#F7EBDD] sm:text-5xl">
                        Built for students,{' '}
                        <span className="italic text-[#E0B07A]">by students</span>
                    </h1>
                    <p className="mt-4 text-sm font-light leading-relaxed text-[#C8B6A6]">
                        StudyNook removes every friction point between you and a productive study session. Here is what makes us different.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group rounded-2xl border border-[#3A2B22] bg-[#1E1A16] p-6 transition-all duration-300 hover:border-[#8B5E3C]"
                        >
                            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#3A2B22] bg-[#2A241F] text-lg text-[#E0B07A] transition-all duration-300 group-hover:border-[#8B5E3C] group-hover:bg-[#2D2019]">
                                {feature.icon}
                            </div>
                            <h3 className="mb-2 text-base font-semibold text-[#F3E7DA]">
                                {feature.title}
                            </h3>
                            <p className="text-sm font-light leading-relaxed text-[#C8B6A6]">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default WhyStudyNook;