import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-[#1C1512] text-[#F3E7DA] border-t border-[#3A2B22]">

            {/* MAIN FOOTER */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* BRAND */}
                    <aside>
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#8B5E3C]">
                                <span className="text-[#E0B07A]">📚</span>
                            </div>

                            <h1 className="text-2xl font-bold text-[#E0B07A]">
                                StudyNook
                            </h1>
                        </div>

                        <p className="mt-4 text-sm leading-6 text-[#C8B6A6] max-w-xs">
                            The smartest way to find, book, and manage study rooms
                            in university libraries. Built for students, by students.
                        </p>

                        <div className="mt-4">
                            <span className="badge bg-[#2A241F] text-[#C8B6A6] border border-[#3A2B22]">
                                ● All systems operational
                            </span>
                        </div>

                        {/* SOCIAL */}
                        <div className="flex flex-wrap gap-3 mt-5">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-ghost border border-[#3A2B22] hover:bg-[#2A241F] text-[#F3E7DA]"
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-ghost border border-[#3A2B22] hover:bg-[#2A241F] text-[#F3E7DA]"
                            >
                                <FaXTwitter />
                            </a>

                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-ghost border border-[#3A2B22] hover:bg-[#2A241F] text-[#F3E7DA]"
                            >
                                <FaLinkedinIn />
                            </a>

                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-ghost border border-[#3A2B22] hover:bg-[#2A241F] text-[#F3E7DA]"
                            >
                                <FaInstagram />
                            </a>
                        </div>
                    </aside>

                    {/* NAVIGATE */}
                    <nav className="flex flex-col gap-2">
                        <h6 className="footer-title text-[#D4A373]">
                            Navigate
                        </h6>

                        <Link href="/" className="link link-hover text-[#C8B6A6]">
                            Home
                        </Link>

                        <Link
                            href="/rooms"
                            className="link link-hover text-[#C8B6A6]"
                        >
                            All Rooms
                        </Link>

                        <Link
                            href="/about"
                            className="link link-hover text-[#C8B6A6]"
                        >
                            About
                        </Link>

                        <Link
                            href="/list-room"
                            className="link link-hover text-[#C8B6A6]"
                        >
                            List a Room
                        </Link>

                        <Link
                            href="/my-bookings"
                            className="link link-hover text-[#C8B6A6]"
                        >
                            My Bookings
                        </Link>
                    </nav>

                    {/* ACCOUNT */}
                    <nav className="flex flex-col gap-2">
                        <h6 className="footer-title text-[#D4A373]">
                            Account
                        </h6>

                        <Link
                            href="/login"
                            className="link link-hover text-[#C8B6A6]"
                        >
                            Login
                        </Link>

                        <Link
                            href="/register"
                            className="link link-hover text-[#C8B6A6]"
                        >
                            Register
                        </Link>

                        <Link
                            href="/my-listings"
                            className="link link-hover text-[#C8B6A6]"
                        >
                            My Listings
                        </Link>

                        <Link
                            href="/settings"
                            className="link link-hover text-[#C8B6A6]"
                        >
                            Settings
                        </Link>
                    </nav>

                    {/* CONTACT */}
                    <nav className="flex flex-col gap-4">
                        <h6 className="footer-title text-[#D4A373]">
                            Contact
                        </h6>

                        <div className="flex items-start gap-2 text-[#C8B6A6] text-sm">
                            <FiMail className="mt-1 shrink-0" />
                            <span>hello@studynook.app</span>
                        </div>

                        <div className="flex items-start gap-2 text-[#C8B6A6] text-sm">
                            <FiPhone className="mt-1 shrink-0" />
                            <span>+1 (800) 555-NOOK</span>
                        </div>

                        <div className="flex items-start gap-2 text-[#C8B6A6] text-sm">
                            <FiMapPin className="mt-1 shrink-0" />
                            <span>
                                Available at 12+ university libraries
                            </span>
                        </div>
                    </nav>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="border-t border-[#3A2B22]">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#C8B6A6]">

                    <p className="text-center md:text-left">
                        © 2025{" "}
                        <span className="text-[#E0B07A] font-semibold">
                            StudyNook
                        </span>
                        . All rights reserved.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                        <a className="hover:text-[#D4A373] cursor-pointer">
                            Privacy Policy
                        </a>

                        <a className="hover:text-[#D4A373] cursor-pointer">
                            Terms of Service
                        </a>

                        <a className="hover:text-[#D4A373] cursor-pointer">
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;