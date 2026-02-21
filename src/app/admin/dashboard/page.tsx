"use client";

import { useEffect, useState } from "react";
import { auth, db, storage } from "@/lib/firebase";
import {
    collection, query, orderBy, onSnapshot, doc, updateDoc, addDoc, deleteDoc,
    serverTimestamp, getCountFromServer
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import {
    Car,
    LayoutDashboard,
    CalendarCheck,
    MessageSquare,
    LogOut,
    Clock,
    CheckCircle,
    XCircle,
    TrendingUp,
    Plus,
    Trash2,
    Eye,
    Settings,
    Users
} from "lucide-react";
import styles from "./Dashboard.module.css";

interface Booking {
    id: string;
    name: string;
    email: string;
    phone: string;
    carName: string;
    carId: string;
    pickupDate: string;
    returnDate: string;
    totalPrice: number;
    status: "pending" | "confirmed" | "cancelled";
    createdAt: any;
    withDriver: boolean;
    days: number;
}

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    createdAt: any;
    read: boolean;
}

type Tab = "dashboard" | "bookings" | "messages";

export default function AdminDashboard() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<Tab>("dashboard");
    const { user, profile, loading: authLoading, logout: authLogout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.push("/admin/login");
            } else if (profile?.role !== "admin") {
                router.push("/"); // Redirect non-admins to home
            }
        }
    }, [user, profile, authLoading, router]);

    // Bookings listener
    useEffect(() => {
        if (!user || profile?.role !== "admin") return;

        const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const bookingData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Booking[];
            setBookings(bookingData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    // Messages listener
    useEffect(() => {
        if (!user) return;

        const q = query(collection(db, "contactMessages"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as ContactMessage[];
            setMessages(msgData);
        });

        return () => unsubscribe();
    }, [user]);

    const updateStatus = async (id: string, status: string) => {
        try {
            await updateDoc(doc(db, "bookings", id), { status });
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    const markMessageRead = async (id: string) => {
        try {
            await updateDoc(doc(db, "contactMessages", id), { read: true });
        } catch (err) {
            console.error("Error marking message read:", err);
        }
    };

    const deleteMessage = async (id: string) => {
        if (!confirm("Delete this message?")) return;
        try {
            await deleteDoc(doc(db, "contactMessages", id));
        } catch (err) {
            console.error("Error deleting message:", err);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/admin/login");
    };

    if (loading) return <div className={styles.loader}>Initializing Secure Admin Dashboard...</div>;

    const stats = {
        total: bookings.length,
        pending: bookings.filter(b => b.status === "pending").length,
        confirmed: bookings.filter(b => b.status === "confirmed").length,
        revenue: bookings.filter(b => b.status === "confirmed").reduce((acc, b) => acc + (b.totalPrice || 0), 0),
        unreadMessages: messages.filter(m => !m.read).length
    };

    const formatTimestamp = (ts: any) => {
        if (!ts?.toDate) return "—";
        return ts.toDate().toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    };

    return (
        <div className={styles.dashboard}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.brand}>
                    <Car size={32} color="var(--primary)" />
                    <span>HAIDER ADMIN</span>
                </div>

                <nav className={styles.nav}>
                    <div
                        className={`${styles.navItem} ${activeTab === "dashboard" ? styles.active : ""}`}
                        onClick={() => setActiveTab("dashboard")}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </div>
                    <div
                        className={`${styles.navItem} ${activeTab === "bookings" ? styles.active : ""}`}
                        onClick={() => setActiveTab("bookings")}
                    >
                        <CalendarCheck size={20} />
                        Bookings
                        {stats.pending > 0 && (
                            <span className={styles.badge}>{stats.pending}</span>
                        )}
                    </div>
                    <div
                        className={`${styles.navItem} ${activeTab === "messages" ? styles.active : ""}`}
                        onClick={() => setActiveTab("messages")}
                    >
                        <MessageSquare size={20} />
                        Messages
                        {stats.unreadMessages > 0 && (
                            <span className={styles.badge}>{stats.unreadMessages}</span>
                        )}
                    </div>
                </nav>

                <button onClick={handleLogout} className={styles.logoutBtn}>
                    <LogOut size={20} />
                    Sign Out
                </button>
            </aside>

            {/* Main Content */}
            <main className={styles.content}>
                <header className={styles.header}>
                    <h1>
                        {activeTab === "dashboard" && "Dashboard Overview"}
                        {activeTab === "bookings" && "All Bookings"}
                        {activeTab === "messages" && "Contact Messages"}
                    </h1>
                    <div className={styles.userProfile}>
                        <span>Welcome, Admin</span>
                        <div className={styles.avatar}>A</div>
                    </div>
                </header>

                {/* ========== DASHBOARD TAB ========== */}
                {activeTab === "dashboard" && (
                    <>
                        {/* Stats Grid */}
                        <div className={styles.statsGrid}>
                            <div className={styles.statCard} onClick={() => setActiveTab("bookings")} style={{ cursor: "pointer" }}>
                                <div className={styles.statInfo}>
                                    <p>Total Bookings</p>
                                    <h3>{stats.total}</h3>
                                </div>
                                <div className={styles.statIcon} style={{ background: "rgba(212, 175, 55, 0.1)", color: "var(--primary)" }}>
                                    <CalendarCheck size={24} />
                                </div>
                            </div>
                            <div className={styles.statCard} onClick={() => setActiveTab("bookings")} style={{ cursor: "pointer" }}>
                                <div className={styles.statInfo}>
                                    <p>Pending Requests</p>
                                    <h3>{stats.pending}</h3>
                                </div>
                                <div className={styles.statIcon} style={{ background: "rgba(255, 193, 7, 0.1)", color: "#ffc107" }}>
                                    <Clock size={24} />
                                </div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statInfo}>
                                    <p>Confirmed Rides</p>
                                    <h3>{stats.confirmed}</h3>
                                </div>
                                <div className={styles.statIcon} style={{ background: "rgba(40, 167, 69, 0.1)", color: "#28a745" }}>
                                    <CheckCircle size={24} />
                                </div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statInfo}>
                                    <p>Estimated Revenue</p>
                                    <h3>Rs. {stats.revenue.toLocaleString()}</h3>
                                </div>
                                <div className={styles.statIcon} style={{ background: "rgba(0, 123, 255, 0.1)", color: "#007bff" }}>
                                    <TrendingUp size={24} />
                                </div>
                            </div>
                        </div>

                        {/* Recent Bookings Preview */}
                        <div className={styles.tableContainer}>
                            <div className={styles.tableHeader}>
                                <h2>Recent Booking Requests</h2>
                                <button className={styles.viewAllBtn} onClick={() => setActiveTab("bookings")}>
                                    View All →
                                </button>
                            </div>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Customer</th>
                                        <th>Car Details</th>
                                        <th>Duration</th>
                                        <th>Total Price</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.slice(0, 5).map((booking) => (
                                        <tr key={booking.id}>
                                            <td>
                                                <div className={styles.customerInfo}>
                                                    <span className={styles.customerName}>{booking.name}</span>
                                                    <span className={styles.customerPhone}>{booking.phone}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.carInfo}>
                                                    <span className={styles.carName}>{booking.carName}</span>
                                                    <span className={styles.driverTag}>
                                                        {booking.withDriver ? "With Driver" : "Self Drive"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className={styles.duration}>
                                                    <span>{booking.pickupDate}</span>
                                                    <span className={styles.separator}>→</span>
                                                    <span>{booking.returnDate}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={styles.price}>Rs. {booking.totalPrice?.toLocaleString()}</span>
                                            </td>
                                            <td>
                                                <span className={`${styles.status} ${styles[booking.status]}`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className={styles.actions}>
                                                    {booking.status === "pending" && (
                                                        <>
                                                            <button
                                                                onClick={() => updateStatus(booking.id, "confirmed")}
                                                                className={styles.approveBtn}
                                                                title="Approve"
                                                            >
                                                                <CheckCircle size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => updateStatus(booking.id, "cancelled")}
                                                                className={styles.rejectBtn}
                                                                title="Reject"
                                                            >
                                                                <XCircle size={18} />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {bookings.length === 0 && (
                                <div className={styles.emptyTable}>
                                    No bookings yet. They will appear here in real-time.
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* ========== BOOKINGS TAB ========== */}
                {activeTab === "bookings" && (
                    <div className={styles.tableContainer}>
                        <div className={styles.tableHeader}>
                            <h2>All Bookings ({bookings.length})</h2>
                        </div>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Car Details</th>
                                    <th>Duration</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                    <th>Booked At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking.id}>
                                        <td>
                                            <div className={styles.customerInfo}>
                                                <span className={styles.customerName}>{booking.name}</span>
                                                <span className={styles.customerPhone}>{booking.phone}</span>
                                                <span className={styles.customerEmail}>{booking.email}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.carInfo}>
                                                <span className={styles.carName}>{booking.carName}</span>
                                                <span className={styles.driverTag}>
                                                    {booking.withDriver ? "With Driver" : "Self Drive"}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={styles.duration}>
                                                <span>{booking.pickupDate}</span>
                                                <span className={styles.separator}>→</span>
                                                <span>{booking.returnDate}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={styles.price}>Rs. {booking.totalPrice?.toLocaleString()}</span>
                                        </td>
                                        <td>
                                            <span className={`${styles.status} ${styles[booking.status]}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={styles.timestamp}>{formatTimestamp(booking.createdAt)}</span>
                                        </td>
                                        <td>
                                            <div className={styles.actions}>
                                                {booking.status === "pending" && (
                                                    <>
                                                        <button
                                                            onClick={() => updateStatus(booking.id, "confirmed")}
                                                            className={styles.approveBtn}
                                                            title="Approve"
                                                        >
                                                            <CheckCircle size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => updateStatus(booking.id, "cancelled")}
                                                            className={styles.rejectBtn}
                                                            title="Reject"
                                                        >
                                                            <XCircle size={18} />
                                                        </button>
                                                    </>
                                                )}
                                                {booking.status === "confirmed" && (
                                                    <button
                                                        onClick={() => updateStatus(booking.id, "cancelled")}
                                                        className={styles.rejectBtn}
                                                        title="Cancel"
                                                    >
                                                        <XCircle size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {bookings.length === 0 && (
                            <div className={styles.emptyTable}>
                                No bookings yet. They will appear here in real-time as customers book.
                            </div>
                        )}
                    </div>
                )}

                {/* ========== MESSAGES TAB ========== */}
                {activeTab === "messages" && (
                    <div className={styles.messagesContainer}>
                        {messages.length === 0 ? (
                            <div className={styles.emptyTable} style={{ padding: '60px', textAlign: 'center' }}>
                                No contact messages yet.
                            </div>
                        ) : (
                            <div className={styles.messagesList}>
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`${styles.messageCard} ${!msg.read ? styles.unread : ""}`}
                                        onClick={() => !msg.read && markMessageRead(msg.id)}
                                    >
                                        <div className={styles.messageTop}>
                                            <div className={styles.messageSender}>
                                                <div className={styles.senderAvatar}>
                                                    {msg.name?.[0]?.toUpperCase() || "?"}
                                                </div>
                                                <div>
                                                    <div className={styles.senderName}>
                                                        {msg.name}
                                                        {!msg.read && <span className={styles.newBadge}>New</span>}
                                                    </div>
                                                    <div className={styles.senderContact}>
                                                        {msg.email} · {msg.phone}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.messageActions}>
                                                <span className={styles.messageTime}>{formatTimestamp(msg.createdAt)}</span>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id); }}
                                                    className={styles.deleteBtn}
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                        <p className={styles.messageBody}>{msg.message}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
