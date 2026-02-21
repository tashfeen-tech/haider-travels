"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import styles from "./Contact.module.css";
import { Phone, Mail, MapPin, MessageCircle, Clock, Send } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await addDoc(collection(db, "contactMessages"), {
                ...form,
                createdAt: serverTimestamp(),
            });
            setSuccess(true);
            setForm({ name: "", email: "", phone: "", message: "" });
        } catch {
            setError("Failed to send message. Please try calling us directly.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className={styles.page}>
                {/* Hero */}
                <div className={styles.heroBanner}>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        Get In <span className="gradient-text">Touch</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        We&apos;re available 24/7. Reach out and we&apos;ll respond promptly.
                    </motion.p>
                </div>

                <div className={styles.layout}>
                    {/* Contact Info */}
                    <motion.div
                        className={styles.infoPanel}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <h2>Contact Information</h2>
                        <p className={styles.infoSubtitle}>Reach us through any of these channels anytime.</p>

                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}><Phone size={22} /></div>
                            <div>
                                <span className={styles.infoLabel}>Call / WhatsApp</span>
                                <a href="tel:+923214104443" className={styles.infoValue}>+92 321 410 4443</a>
                            </div>
                        </div>

                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}><MessageCircle size={22} /></div>
                            <div>
                                <span className={styles.infoLabel}>WhatsApp</span>
                                <a href="https://wa.me/923214104443" target="_blank" rel="noopener noreferrer" className={styles.infoValue}>
                                    Chat on WhatsApp
                                </a>
                            </div>
                        </div>

                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}><Mail size={22} /></div>
                            <div>
                                <span className={styles.infoLabel}>Email</span>
                                <a href="mailto:arifwasim786@gmail.com" className={styles.infoValue}>
                                    arifwasim786@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}><MapPin size={22} /></div>
                            <div>
                                <span className={styles.infoLabel}>Location</span>
                                <span className={styles.infoValue}>Shareef Market, Madina Colony, Lahore, Punjab, Pakistan</span>
                            </div>
                        </div>

                        <div className={styles.infoItem}>
                            <div className={styles.infoIcon}><Clock size={22} /></div>
                            <div>
                                <span className={styles.infoLabel}>Hours</span>
                                <span className={styles.infoValue}>24 hours / 7 days a week</span>
                            </div>
                        </div>

                        <a
                            href="https://wa.me/923214104443?text=Hi%20Haider%20Travels%2C%20I%20would%20like%20to%20book%20a%20car."
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`btn-primary ${styles.whatsappBtn}`}
                        >
                            <MessageCircle size={20} />
                            Book via WhatsApp
                        </a>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className={styles.formPanel}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        <h2>Send a Message</h2>

                        {success ? (
                            <div className={styles.successBox}>
                                <div className={styles.successIcon}>✓</div>
                                <h3>Message Sent!</h3>
                                <p>We&apos;ll get back to you very soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.row}>
                                    <div className={styles.inputGroup}>
                                        <label>Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="Your name"
                                            required
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Phone Number</label>
                                        <input
                                            type="tel"
                                            placeholder="03xx xxxxxxx"
                                            required
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        required
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>Your Message</label>
                                    <textarea
                                        placeholder="Tell us about your rental needs..."
                                        required
                                        rows={5}
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    />
                                </div>

                                {error && <p className={styles.error}>{error}</p>}

                                <button type="submit" className={styles.submitBtn} disabled={loading}>
                                    <Send size={18} />
                                    {loading ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </>
    );
}
