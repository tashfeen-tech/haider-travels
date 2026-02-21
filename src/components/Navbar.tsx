"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Car, Menu, X, Phone, UserCircle } from "lucide-react";
import styles from "./Navbar.module.css";
import { useAuth } from "@/lib/AuthContext";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, profile } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ""}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <Car size={32} className={styles.logoIcon} />
                    <div className={styles.logoText}>
                        <span className={styles.brandName}>HAIDER</span>
                        <span className={styles.brandSub}>TRAVELS</span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className={styles.desktopMenu}>
                    <Link href="/" className={styles.navLink}>Home</Link>
                    <Link href="/fleet" className={styles.navLink}>Our Fleet</Link>
                    <Link href="/about" className={styles.navLink}>About</Link>
                    <Link href="/contact" className={styles.navLink}>Contact</Link>
                    {user ? (
                        <Link href="/my-bookings" className={styles.navLink} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <UserCircle size={18} />
                            My Bookings
                        </Link>
                    ) : (
                        <Link href="/auth" className={styles.navLink} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <UserCircle size={18} />
                            Sign In
                        </Link>
                    )}
                    <a href="tel:03214104443" className="btn-primary">
                        <Phone size={18} />
                        <span>Book Now</span>
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={styles.mobileToggle}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    <Link href="/fleet" onClick={() => setIsMobileMenuOpen(false)}>Our Fleet</Link>
                    <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                    {user ? (
                        <Link href="/my-bookings" onClick={() => setIsMobileMenuOpen(false)}>My Bookings</Link>
                    ) : (
                        <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                    )}
                    <a href="tel:03214104443" className="btn-primary">Book Now</a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
