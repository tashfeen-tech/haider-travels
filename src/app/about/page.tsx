"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import styles from "./About.module.css";
import { Shield, Star, Clock, Users, MapPin, Award } from "lucide-react";

const VALUES = [
    {
        icon: Shield,
        title: "Safety First",
        desc: "Every vehicle is regularly inspected, sanitized, and maintained to the highest standards.",
    },
    {
        icon: Star,
        title: "Premium Experience",
        desc: "From booking to drop-off, we make every journey feel first-class.",
    },
    {
        icon: Clock,
        title: "24/7 Availability",
        desc: "Day or night, our team is always ready to assist you on the road.",
    },
    {
        icon: Users,
        title: "Professional Drivers",
        desc: "Our drivers are verified, experienced, and trained in customer service excellence.",
    },
    {
        icon: MapPin,
        title: "All of Lahore",
        desc: "We cover every corner of Lahore — from DHA to Johar Town and beyond.",
    },
    {
        icon: Award,
        title: "Trusted Since Day One",
        desc: "Hundreds of satisfied customers trust Haider Travels for their travel needs every month.",
    },
];

const STATS = [
    { value: "500+", label: "Happy Customers" },
    { value: "6+", label: "Premium Vehicles" },
    { value: "10+", label: "Years Experience" },
    { value: "24/7", label: "Support Available" },
];

export default function AboutPage() {
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
                        About <span className="gradient-text">Haider Travels</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        The most trusted name in premium car rental services across Lahore, Pakistan.
                    </motion.p>
                </div>

                {/* Story */}
                <section className={styles.storySection}>
                    <motion.div
                        className={styles.storyCard}
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        <h2>Our <span className="gradient-text">Story</span></h2>
                        <p>
                            Haider Travels was founded with a single vision: to bring luxury, reliability,
                            and professionalism to car rentals in Lahore. What started as a small fleet has grown
                            into one of the city&apos;s most respected car rental services.
                        </p>
                        <p>
                            We believe every journey should be comfortable, safe, and memorable. Whether you&apos;re
                            heading to a corporate meeting, an airport, a wedding, or exploring the city —
                            Haider Travels ensures you arrive in style.
                        </p>
                        <p>
                            Our fleet is carefully curated to include the finest vehicles from compact sedans to
                            powerful SUVs, all maintained to impeccable standards and driven by our team of
                            professional, courteous chauffeurs.
                        </p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        className={styles.statsGrid}
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                    >
                        {STATS.map((stat, i) => (
                            <div key={i} className={styles.statCard}>
                                <span className={styles.statValue}>{stat.value}</span>
                                <span className={styles.statLabel}>{stat.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </section>

                {/* Values */}
                <section className={styles.valuesSection}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Why Clients Choose <span className="gradient-text">Us</span>
                    </motion.h2>

                    <div className={styles.valuesGrid}>
                        {VALUES.map((v, i) => (
                            <motion.div
                                key={i}
                                className={styles.valueCard}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                viewport={{ once: true }}
                            >
                                <div className={styles.valueIcon}>
                                    <v.icon size={28} />
                                </div>
                                <h3>{v.title}</h3>
                                <p>{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className={styles.cta}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Ready to Ride?
                    </motion.h2>
                    <p>Book your vehicle today and experience the Haider Travels difference.</p>
                    <a href="/fleet" className="btn-primary" style={{ fontSize: "18px", padding: "16px 40px" }}>
                        Browse Fleet
                    </a>
                </section>
            </div>
        </>
    );
}
