"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Calendar, Car, MapPin, CreditCard, Clock, LogOut, CalendarCheck, Package } from "lucide-react";
import Link from "next/link";
import styles from "./MyBookings.module.css";

interface Booking {
    id: string;
    carName: string;
    pickupDate: string;
    returnDate: string;
    totalPrice: number;
    status: "pending" | "confirmed" | "cancelled";
    withDriver: boolean;
    createdAt: any;
    name: string;
    phone: string;
    email: string;
}

export default function MyBookingsPage() {
    const { user, profile, loading: authLoading, logout } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        // Query bookings by user email
        const q = query(
            collection(db, "bookings"),
            where("email", "==", user.email),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((d) => ({
                id: d.id,
                ...d.data(),
            })) as Booking[];
            setBookings(data);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching bookings:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const cancelBooking = async (id: string) => {
        if (!confirm("Are you sure you want to cancel this booking?")) return;
        try {
            await updateDoc(doc(db, "bookings", id), { status: "cancelled" });
        } catch (err) {
            console.error("Error cancelling booking:", err);
        }
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "—";
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" });
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case "pending": return styles.statusPending;
            case "confirmed": return styles.statusConfirmed;
            case "cancelled": return styles.statusCancelled;
            default: return "";
        }
    };

    if (authLoading) {
        return (
            <>
                <Navbar />
                <div className={styles.page}>
                    <div className={styles.loadingContainer}>Loading...</div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className={styles.page}>
                <div className={styles.heroBanner}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        My <span className="gradient-text">Bookings</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                    >
                        Track and manage all your rental reservations
                    </motion.p>
                </div>

                <div className={styles.content}>
                    {!user ? (
                        <div className={styles.loginPrompt}>
                            <p>Please sign in to view your bookings.</p>
                            <Link href="/auth" className="btn-primary">
                                Sign In / Register
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* User Bar */}
                            <div className={styles.userBar}>
                                <div className={styles.userInfo}>
                                    <div className={styles.userAvatar}>
                                        {(profile?.name || user.email || "U")[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <div className={styles.userName}>
                                            {profile?.name || "User"}
                                        </div>
                                        <div className={styles.userEmail}>{user.email}</div>
                                    </div>
                                </div>
                                <button onClick={logout} className={styles.logoutBtn}>
                                    <LogOut size={16} /> Sign Out
                                </button>
                            </div>

                            {loading ? (
                                <div className={styles.loadingContainer}>
                                    Loading your bookings...
                                </div>
                            ) : bookings.length === 0 ? (
                                <div className={styles.emptyState}>
                                    <div className={styles.emptyIcon}>
                                        <Package size={36} />
                                    </div>
                                    <h3>No Bookings Yet</h3>
                                    <p>You haven&apos;t made any bookings. Browse our fleet to get started!</p>
                                    <Link href="/fleet" className="btn-primary">
                                        Browse Fleet
                                    </Link>
                                </div>
                            ) : (
                                <div className={styles.bookingsList}>
                                    {bookings.map((booking, i) => (
                                        <motion.div
                                            key={booking.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: i * 0.07 }}
                                            className={styles.bookingCard}
                                        >
                                            <div className={styles.cardTop}>
                                                <div className={styles.carTitle}>
                                                    <Car size={20} color="var(--primary)" />
                                                    <h3>{booking.carName}</h3>
                                                    <span className={styles.driverBadge}>
                                                        {booking.withDriver ? "With Driver" : "Self Drive"}
                                                    </span>
                                                </div>
                                                <span className={`${styles.statusBadge} ${getStatusClass(booking.status)}`}>
                                                    {booking.status}
                                                </span>
                                            </div>

                                            <div className={styles.cardBody}>
                                                <div className={styles.detailItem}>
                                                    <span className={styles.detailLabel}>
                                                        <Calendar size={12} /> Pickup
                                                    </span>
                                                    <span className={styles.detailValue}>
                                                        {formatDate(booking.pickupDate)}
                                                    </span>
                                                </div>
                                                <div className={styles.detailItem}>
                                                    <span className={styles.detailLabel}>
                                                        <CalendarCheck size={12} /> Return
                                                    </span>
                                                    <span className={styles.detailValue}>
                                                        {formatDate(booking.returnDate)}
                                                    </span>
                                                </div>
                                                <div className={styles.detailItem}>
                                                    <span className={styles.detailLabel}>
                                                        <CreditCard size={12} /> Total Price
                                                    </span>
                                                    <span className={styles.priceValue}>
                                                        Rs. {booking.totalPrice?.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className={styles.cardFooter}>
                                                <span className={styles.bookingDate}>
                                                    <Clock size={12} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                                                    Booked: {booking.createdAt?.toDate
                                                        ? booking.createdAt.toDate().toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })
                                                        : "Recently"}
                                                </span>
                                                {booking.status === "pending" && (
                                                    <button
                                                        onClick={() => cancelBooking(booking.id)}
                                                        className={styles.cancelBtn}
                                                    >
                                                        Cancel Booking
                                                    </button>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
