import Link from 'next/link';
import React from 'react';
import { FiUserPlus, FiSearch, FiCalendar, FiCheckCircle } from 'react-icons/fi';

const steps = [
    {
        number: '01',
        icon: <FiUserPlus />,
        title: 'Create an account',
        description: 'Sign up free in seconds using your email or Google account. No credit card required.',
    },
    {
        number: '02',
        icon: <FiSearch />,
        title: 'Browse rooms',
        description: 'Filter by floor, amenities, capacity, and hourly rate to find your perfect study space.',
    },
    {
        number: '03',
        icon: <FiCalendar />,
        title: 'Pick a time slot',
        description: 'Choose your date and hourly window. Our system auto-detects conflicts so your slot is always safe.',
    },
    {
        number: '04',
        icon: <FiCheckCircle />,
        title: 'Show up and study',
        description: 'Get your confirmed booking instantly and arrive ready to focus. It really is that simple.',
    },
];

const HowItWorks = () => {
    return (
        <section className="relative overflow-hidden bg-[#140D09] px-6 py-24 text-[#F7EBDD] border-t border-[#3A2B22]">

            <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-[#3B2B22]" />
            <div className="absolute -bottom-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full border border-[#3B2B22]" />

            <div className="relative z-10 mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
                    <div className="max-w-xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4A3528] bg-[#211611] px-4 py-2 text-xs tracking-wide text-[#E0B07A]">
                            <span>⚡</span>
                            <span>HOW IT WORKS</span>
                        </div>
                        <h1 className="text-4xl font-black leading-tight text-[#F7EBDD] sm:text-5xl">
                            Book a room in{' '}
                            <span className="italic text-[#E0B07A]">4 easy steps</span>
                        </h1>
                        <p className="mt-4 text-sm font-light leading-relaxed text-[#C8B6A6]">
                            No hassle, no waiting, find a room, pick your slot, and get to work.
                        </p>
                    </div>
                    <Link
                        href="/all-rooms"
                        className="flex shrink-0 items-center gap-2 rounded-xl border border-[#5A4030] bg-[#221813] px-5 py-3 text-sm font-semibold text-[#F7EBDD] transition-all duration-300 hover:bg-[#2D2019] hover:border-[#8B5E3C]"
                    >
                        Browse Rooms →
                    </Link>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">

                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div className="absolute right-0 top-9 hidden h-px w-1/2 translate-x-full border-t border-dashed border-[#3A2B22] lg:block" />
                            )}

                            <div className="group rounded-2xl border border-[#3A2B22] bg-[#1E1A16] p-6 transition-all duration-300 hover:border-[#8B5E3C]">

                                {/* Step number */}
                                <div className="mb-5 flex items-center justify-between">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#3A2B22] bg-[#2A241F] text-lg text-[#E0B07A] transition-all duration-300 group-hover:border-[#8B5E3C]">
                                        {step.icon}
                                    </div>
                                    <span className="font-playfair text-4xl font-bold text-[#2A241F]">
                                        {step.number}
                                    </span>
                                </div>

                                <h3 className="mb-2 text-base font-semibold text-[#F3E7DA]">
                                    {step.title}
                                </h3>
                                <p className="text-sm font-light leading-relaxed text-[#C8B6A6]">
                                    {step.description}
                                </p>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default HowItWorks;