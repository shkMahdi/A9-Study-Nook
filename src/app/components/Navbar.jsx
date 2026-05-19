import Link from "next/link";

const Navbar = () => {
    const links = [
        { name: "Home", href: "/" },
        { name: "Rooms", href: "/rooms" },
        { name: "Add Room", href: "/add-room" },
        { name: "My Listings", href: "/my-listings" },
        { name: "My Bookings", href: "/my-bookings" },
    ];

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
                        {links.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className="text-[#F3E7DA] hover:text-[#D4A373]">
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-[#E0B07A] ml-2">
                    StudyNook
                </Link>
            </div>

            {/* CENTER (desktop menu) */}
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal gap-6 px-1 text-sm font-medium">
                    {links.map((link) => (
                        <li key={link.name}>
                            <Link href={link.href} className="text-[#F3E7DA] hover:text-[#D4A373]">
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* RIGHT */}
            <div className="navbar-end gap-3">

                {/* Auth buttons */}
                <div className="hidden md:flex gap-3">
                    <button className="btn btn-sm rounded-full bg-transparent border border-[#8B5E3C] text-[#EADBC8] hover:bg-[#2A241F] hover:border-[#A47148] normal-case">
                        Login
                    </button>
                    <button className="btn btn-sm rounded-full bg-[#8B5E3C] text-white hover:bg-[#6A442B] border-none normal-case">
                        Register
                    </button>
                </div>

                {/* Profile dropdown */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="flex items-center gap-2 border border-[#3A2B22] px-3 py-1 rounded-full hover:border-[#A47148] cursor-pointer">
                        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                        <span className="hidden md:inline-block text-sm font-medium text-[#F3E7DA]">
                            John Doe
                        </span>
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 w-44 p-2 rounded-xl bg-[#1E1A16] border border-[#3A2B22] shadow-lg z-50"
                    >
                        <li className="px-4 py-2 text-sm font-medium text-[#EADBC8] border-b border-[#3A2B22]">
                            John Doe
                        </li>
                        <li>
                            <a className="text-[#F3E7DA] hover:bg-[#2A241F]">My Bookings</a>
                        </li>
                        <li>
                            <a className="text-[#F3E7DA] hover:bg-[#2A241F]">My Listings</a>
                        </li>
                        <li>
                            <a className="text-red-400 hover:bg-[#2A241F]">Logout</a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Navbar;