"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import CarCard from "@/components/CarCard";
import BookingModal from "@/components/BookingModal";
import { FLEET_DATA, Car } from "@/data/fleet";
import { motion } from "framer-motion";
import styles from "./Fleet.module.css";

const TYPES = ["All", "Sedan", "Premium Sedan", "SUV", "Pickup / 4x4", "Van"];

export default function FleetPage() {
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeType, setActiveType] = useState("All");
    const [maxPrice, setMaxPrice] = useState(30000);
    const [seatFilter, setSeatFilter] = useState("Any");

    const filtered = FLEET_DATA.filter((car) => {
        const typeMatch = activeType === "All" || car.type === activeType;
        const priceMatch = car.pricePerDay <= maxPrice;
        const seatMatch =
            seatFilter === "Any" ||
            (seatFilter === "5" && car.seats === 5) ||
            (seatFilter === "7+" && car.seats >= 7);
        return typeMatch && priceMatch && seatMatch;
    });

    return (
        <>
            <Navbar />
            <div className={styles.page}>
                {/* Hero Banner */}
                <div className={styles.heroBanner}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        Our <span className="gradient-text">Premium Fleet</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                    >
                        {FLEET_DATA.length} vehicles available in Lahore — from sleek sedans to powerful 4x4s
                    </motion.p>
                </div>

                <div className={styles.layout}>
                    {/* Sidebar Filters */}
                    <aside className={styles.sidebar}>
                        <h3>Filter Vehicles</h3>

                        <div className={styles.filterGroup}>
                            <label>Vehicle Type</label>
                            <div className={styles.typeGrid}>
                                {TYPES.map((t) => (
                                    <button
                                        key={t}
                                        className={`${styles.typeBtn} ${activeType === t ? styles.active : ""}`}
                                        onClick={() => setActiveType(t)}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles.filterGroup}>
                            <label>
                                Max Price: <span className={styles.priceValue}>Rs. {maxPrice.toLocaleString()}</span>
                            </label>
                            <input
                                type="range"
                                min={5000}
                                max={30000}
                                step={1000}
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                className={styles.rangeInput}
                            />
                            <div className={styles.rangeLabels}>
                                <span>Rs. 5,000</span>
                                <span>Rs. 30,000</span>
                            </div>
                        </div>

                        <div className={styles.filterGroup}>
                            <label>Seats</label>
                            <div className={styles.typeGrid}>
                                {["Any", "5", "7+"].map((s) => (
                                    <button
                                        key={s}
                                        className={`${styles.typeBtn} ${seatFilter === s ? styles.active : ""}`}
                                        onClick={() => setSeatFilter(s)}
                                    >
                                        {s === "Any" ? "Any" : `${s} seats`}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            className={styles.resetBtn}
                            onClick={() => {
                                setActiveType("All");
                                setMaxPrice(30000);
                                setSeatFilter("Any");
                            }}
                        >
                            Reset Filters
                        </button>
                    </aside>

                    {/* Fleet Grid */}
                    <main className={styles.grid}>
                        {filtered.length === 0 ? (
                            <div className={styles.empty}>
                                <p>No vehicles match your filters.</p>
                                <button onClick={() => { setActiveType("All"); setMaxPrice(30000); setSeatFilter("Any"); }}>
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            filtered.map((car, i) => (
                                <motion.div
                                    key={car.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.07 }}
                                    onClick={() => { setSelectedCar(car); setIsModalOpen(true); }}
                                    style={{ cursor: "pointer" }}
                                >
                                    <CarCard car={car} />
                                </motion.div>
                            ))
                        )}
                    </main>
                </div>
            </div>

            <BookingModal
                car={selectedCar}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
