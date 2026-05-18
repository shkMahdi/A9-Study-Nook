import Link from "next/link";

const Navbar = () => {
    const links = [
        { name: "Home", href: "/" },
        { name: "Rooms", href: "/rooms" },
        { name: "Add Room", href: "/add-room" },
        { name: "My Listings", href: "/my-listings" },
        { name: "My Bookings", href: "/my-bookings" },
    ]
    return (
        <nav className="bg-[#1E1A16] shadow-[0_2px_10px_rgba(0,0,0,0.25)] border-b border-[#3A2B22]">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                <Link href="/" className="text-2xl font-bold text-[#E0B07A]">
                    StudyNook
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                    {links.map((link) => (
                        <Link href={link.href} className="text-[#F3E7DA] hover:text-[#D4A373]" key={link.name}>
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">

                    <div className="hidden md:flex gap-3">
                        <button className="bg-transparent border border-[#8B5E3C] text-[#EADBC8] hover:bg-[#2A241F] px-3 py-1 rounded-full text-sm">
                            Login
                        </button>
                        <button className="bg-[#8B5E3C] text-white hover:bg-[#6A442B] px-3 py-1 rounded-full text-sm">
                            Register
                        </button>
                    </div>

                    <div className="relative">
                        <button className="flex items-center gap-2 border px-3 py-1 rounded-full hover:border-gray-400">
                            <span className="w-8 h-8 bg-gray-300 rounded-full"></span>
                            <span className="hidden md:inline-block text-sm font-medium">
                                John Doe
                            </span>
                        </button>

                        <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-xl border">
                            <p className="px-4 py-2 text-sm font-medium border-b">
                                John Doe
                            </p>
                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                                My Bookings
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                                My Listings
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500">
                                Logout
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;