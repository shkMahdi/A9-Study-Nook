import Link from "next/link";
import { FiHome, FiBookOpen, FiArrowDown } from "react-icons/fi";

const NotFound = () => {
    return (
        <section className="min-h-screen bg-[#140D09] text-[#F7EBDD]  flex justify-center items-center relative overflow-hidden px-6 py-12">

            {/* Background Glow */}
            <div className="absolute w-125 h-125 bg-[#8B5E3C]/10 blur-3xl rounded-full -top-37.5 -left-25" />
            <div className="absolute w-125 h-125 bg-[#E0B07A]/5 blur-3xl rounded-full -bottom-30 -right-25" />

            {/* Huge 404 */}
            <h1 className="absolute text-[180px]
                    sm:text-[260px]
                    md:text-[380px]
                    lg:text-[550px] 
                    font-black text-[#2A1E17] 
                    opacity-60 -top-15">
                404
            </h1>

            {/* Main Content */}
            <div className="relative text-center max-w-2xl">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 border border-[#4A3528] bg-[#211611] px-4 py-2 rounded-full text-sm text-[#FF8A65] mb-2 shadow-lg">
                    <span>⚠</span>
                    <span>PAGE NOT FOUND</span>
                </div>

                {/* Heading */}
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight tracking-tight text-[#F7EBDD]">
                    you&apos;ve wandered
                    <br />
                    off the{" "}
                    <span className="italic text-[#E0B07A]">
                        map
                    </span>
                </h1>

                {/* Description */}
                <p className="mt-6 text-[#D8C1AD] text-base sm:text-lg leading-8 max-w-xl mx-auto">
                    The page you&apos;re looking for doesn&apos;t exist, was moved,
                    or the link might be broken. Let&apos;s get you back to studying.
                </p>

                {/* Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

                    <Link
                        href="/"
                        className="btn btn-outline btn-sm md:btn-lg flex items-center justify-center gap-2 px-7 py-4 rounded-md border border-[#5A4030] bg-[#221813] hover:bg-[#2D2019] transition-all duration-300 text-[#F7EBDD] font-light shadow-md"
                    >
                        <FiHome />
                        Back to Home
                    </Link>

                    <Link
                        href="/rooms"
                        className="btn btn-outline btn-sm md:btn-lg flex items-center justify-center gap-2 px-7 py-4 rounded-md border border-[#5A4030] hover:bg-[#2D2019] transition-all duration-300 text-[#F7EBDD] font-light shadow-md"
                    >
                        <FiBookOpen />
                        Browse Rooms
                    </Link>
                </div>

                {/* Links */}
                <div className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-[#B8906F]">
                    <Link href="/login" className="hover:text-[#E0B07A] transition">
                        Login
                    </Link>

                    <span className="hidden sm:block">·</span>

                    <Link href="/register" className="hover:text-[#E0B07A] transition">
                        Register
                    </Link>

                    <span className="hidden sm:block">·</span>

                    <Link href="/my-bookings" className="hover:text-[#E0B07A] transition">
                        My Bookings
                    </Link>

                    <span className="hidden sm:block">·</span>

                    <Link href="/contact" className="hover:text-[#E0B07A] transition">
                        Contact Support
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NotFound;