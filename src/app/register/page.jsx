'use client'

import React from 'react';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { FiArrowRight } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#140D09] px-6 py-16 text-[#F7EBDD]">

            <div className="absolute -left-40 -top-40 h-128 w-lg rounded-full border border-[#3B2B22]" />
            <div className="absolute -bottom-40 -right-40 h-128 w-lg rounded-full border border-[#3B2B22]" />

            <div className="relative z-10 w-full max-w-xl rounded-3xl border border-[#4A3528] bg-[#1B1411]/95 p-8 shadow-2xl backdrop-blur-sm sm:p-10">

                <div className="mb-3 inline-flex items-center justify-center gap-2 rounded-full border border-[#4A3528] bg-[#211611] px-4 py-2 text-xs tracking-wide text-[#E0B07A]">
                    <span>🔒</span>
                    <span>SECURE REGISTER</span>
                </div>

                <h1 className="font-black leading-tight text-[#F7EBDD] text-4xl sm:text-5xl text-left">
                    Create an {" "}
                    <span className="italic text-[#E0B07A]">
                        account
                    </span>
                </h1>


                <p className="mt-2 text-sm leading-7 text-[#D8C1AD] sm:text-base text-left">
                    And start booking quiet rooms today.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-4">
                    <div>
                        <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                            Name
                        </label>

                        <input
                            type="text"
                            {...register("name")}
                            placeholder="Your Name"
                            required
                            className="h-12 w-full rounded-xl border border-[#5A4030] bg-[#2A241F] px-5 text-[#F7EBDD] outline-none transition-all duration-300 placeholder:text-[#7B6A5C] focus:border-[#E0B07A]"
                        />
                    </div>
                    <div>
                        <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                            Email
                        </label>

                        <input
                            type="email"
                            {...register("email")}
                            placeholder="you@university.edu"
                            required
                            className="h-12 w-full rounded-xl border border-[#5A4030] bg-[#2A241F] px-5 text-[#F7EBDD] outline-none transition-all duration-300 placeholder:text-[#7B6A5C] focus:border-[#E0B07A]"
                        />
                    </div>

                    <div>
                        <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                            Photo URL
                        </label>

                        <input
                            type="text"
                            {...register("photoUrl")}
                            placeholder="https://..."
                            required
                            className="h-12 w-full rounded-xl border border-[#5A4030] bg-[#2A241F] px-5 text-[#F7EBDD] outline-none transition-all duration-300 placeholder:text-[#7B6A5C] focus:border-[#E0B07A]"
                        />
                    </div>

                    <div>
                        <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-[#F7EBDD]">
                            Password
                        </label>

                        <input
                            type="password"
                            {...register("password")}
                            placeholder="••••••••"
                            required
                            className="h-12 w-full rounded-xl border border-[#5A4030] bg-[#2A241F] px-5 text-[#F7EBDD] outline-none transition-all duration-300 placeholder:text-[#7B6A5C] focus:border-[#E0B07A]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#5A4030] bg-[#221813] text-base font-semibold text-[#F7EBDD] transition-all duration-300 hover:bg-[#2D2019]"
                    >
                        <FiArrowRight className="text-lg" />
                        Register
                    </button>

                    <div className="relative flex items-center justify-center py-2">
                        <div className="absolute w-full border-t border-[#3B2B22]" />

                        <span className="relative bg-[#1B1411] px-4 text-sm text-[#7B6A5C]">
                            or continue with
                        </span>
                    </div>

                    <button
                        type="button"
                        className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#5A4030] bg-transparent text-base font-semibold text-[#F7EBDD] transition-all duration-300 hover:bg-[#2D2019]"
                    >
                        <FcGoogle className="text-xl" />
                        Continue with Google
                    </button>

                    <p className="pt-2 text-center text-sm text-[#D8C1AD]">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-[#E0B07A] transition hover:text-[#F7EBDD]"
                        >
                            Sign in instead
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default RegisterPage;