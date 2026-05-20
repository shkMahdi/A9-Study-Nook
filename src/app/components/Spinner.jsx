"use client";

import { PropagateLoader } from "react-spinners";

export default function Spinner() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#140D09] px-6 py-16 text-[#F7EBDD]">
            <div className="absolute -left-40 -top-40 h-128 w-lg rounded-full border border-[#3B2B22]" />
            <div className="absolute -bottom-40 -right-40 h-128 w-lg rounded-full border border-[#3B2B22]" />
            <div className="flex flex-1 items-center justify-center">
                <PropagateLoader color="#E0B07A" />
            </div>
        </div>
    );
}