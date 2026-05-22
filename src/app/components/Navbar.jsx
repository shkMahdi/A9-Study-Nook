"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession()
    if (isPending) return null;
    const user = session?.user;

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Rooms", href: "/all-rooms" },
        { name: "Add Room", href: `${user ? `/add-room` : `/login`}` },
        { name: "My Listings", href: `${user ? `/my-listings` : `/login`}` },
        { name: "My Bookings", href: `${user ? `/my-bookings` : `/login`}` },
    ];


    const links = navLinks.map(({ name, href }) => (
        <li key={name}>
            <Link
                href={href}
                className={pathname === href ? "text-[#D4A373] font-bold hover:text-[#D4A373]" : "text-[#F3E7DA] font-bold hover:text-[#D4A373]"}
            >
                {name}
            </Link>
        </li>
    ));


    return (
        <div className="navbar bg-[#1E1A16] border-b border-[#3A2B22] shadow-[0_2px_10px_rgba(0,0,0,0.25)] px-4 md:px-6">

            {/* LEFT */}
            <div className="navbar-start">
                {/* Mobile menu */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden text-[#F3E7DA] hover:bg-[#2A241F]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 w-52 p-2 rounded-xl bg-[#1E1A16] border border-[#3A2B22] shadow-lg z-50"
                    >
                        {links}
                    </ul>
                </div>

                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-[#E0B07A] ml-2 font-playfair">
                    StudyNook
                </Link>
            </div>

            {/* CENTER (desktop menu) */}
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal gap-6 px-1 text-sm font-medium">
                    {links}
                </ul>
            </div>

            {/* RIGHT */}
            <div className="navbar-end gap-3">
                {
                    user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="flex items-center gap-2 border border-[#3A2B22] px-3 py-1 rounded-full hover:border-[#A47148] cursor-pointer">
                                <Image
                                    src={user.image || "https://via.placeholder.com/32"}
                                    alt={user.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                    width={32}
                                    height={32}
                                />
                                <span className="hidden md:inline-block text-sm font-medium text-[#F3E7DA]">
                                    {user.name}
                                </span>
                            </div>

                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 w-44 p-2 rounded-xl bg-[#1E1A16] border border-[#3A2B22] shadow-lg z-50"
                            >
                                <li className="px-4 py-2 text-sm font-medium text-[#EADBC8] border-b border-[#3A2B22]">
                                    {user.name}
                                </li>
                                <li>
                                    <a
                                        onClick={async () => {
                                            await authClient.signOut();
                                            toast.success('Logged out successfully');
                                            router.push('/');
                                        }}
                                        className="text-red-400 hover:bg-[#2A241F] cursor-pointer"
                                    >
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <Link href="/login" className="btn btn-sm md:btn-md rounded-md bg-transparent border border-[#8B5E3C] text-[#EADBC8] font-semibold hover:bg-[#2A241F] hover:border-[#A47148]">
                                Login
                            </Link>
                            <Link href="/register" className="btn btn-sm md:btn-md rounded-md bg-[#8B5E3C] text-white  font-semibold hover:bg-[#6A442B] border-none">
                                Register
                            </Link>
                        </div>
                    )
                }

            </div>
        </div>
    );
};

export default Navbar;