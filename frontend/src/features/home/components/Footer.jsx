import React from 'react'
import { useSelector } from 'react-redux';

const Footer = () => {
    const theme = useSelector((state) => state.theme.theme);

    const isDark = theme === "dark";
    return (
        <footer className={`border-t  mt-12 ${isDark ? 'text-white' : "text-black"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">MovieFlix</h3>
                        <p className="text-sm text-gray-500">
                            Your ultimate destination for movies and entertainment.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Navigation</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li>
                                <a href="#" className="hover:text-[#e50914]">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#e50914]">
                                    Movies
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#e50914]">
                                    TV Shows
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#e50914]">
                                    My List
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Help</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li>
                                <a href="#" className="hover:text-[#e50914]">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#e50914]">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#e50914]">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#e50914]">
                                    Terms of Use
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Follow Us</h4>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-[var(--card-bg)] flex items-center justify-center hover:bg-[#e50914] transition-colors"
                            >
                                <span className="text-xl">📘</span>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-[var(--card-bg)] flex items-center justify-center hover:bg-[#e50914] transition-colors"
                            >
                                <span className="text-xl">🐦</span>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-[var(--card-bg)] flex items-center justify-center hover:bg-[#e50914] transition-colors"
                            >
                                <span className="text-xl">📷</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-[var(--border-color)] text-center text-sm text-gray-500">
                    <p>&copy; 2024 MovieFlix. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer