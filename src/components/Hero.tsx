"use client";

import { motion } from "framer-motion";
import { ChevronRight, Calendar, MapPin, Search } from "lucide-react";
import styles from "./Hero.module.css";

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>

            <div className={styles.container}>
                <div className={styles.content}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className={styles.title}
                    >
                        Redefining <span className="gradient-text">Luxury</span> <br />
                        Car Rental in <span className={styles.highlight}>Lahore</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={styles.subtitle}
                    >
                        Explore the city with elegance. Premium fleet, professional drivers,
                        and unmatched service tailored for your comfort.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className={styles.bookingCard}
                    >
                        <div className={styles.bookingGrid}>
                            <div className={styles.bookingItem}>
                                <label><MapPin size={16} /> Pickup Location</label>
                                <select>
                                    <option>Lahore All Areas</option>
                                    <option>Allama Iqbal Airport</option>
                                    <option>Gulberg</option>
                                    <option>DHA</option>
                                </select>
                            </div>

                            <div className={styles.bookingItem}>
                                <label><Calendar size={16} /> Pickup Date</label>
                                <input type="date" />
                            </div>

                            <div className={styles.bookingItem}>
                                <label><Calendar size={16} /> Return Date</label>
                                <input type="date" />
                            </div>

                            <button className={styles.searchBtn}>
                                <Search size={20} />
                                <span>Search Cars</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className={styles.scrollIndicator}>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={styles.mouse}
                >
                    <div className={styles.wheel}></div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
