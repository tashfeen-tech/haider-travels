"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CarCard from "@/components/CarCard";
import BookingModal from "@/components/BookingModal";
import { FLEET_DATA, Car } from "@/data/fleet";
import { motion } from "framer-motion";

export default function Home() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookClick = (car: Car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  return (
    <>
      <Navbar />
      <Hero />

      <section id="fleet" style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', marginBottom: '16px', textAlign: 'center', fontWeight: 800 }}>
            Our <span className="gradient-text">Premium Fleet</span>
          </h2>

          <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px', fontSize: '18px' }}>
            Choose from our diverse range of well-maintained vehicles for any occasion,
            from daily commutes to grand celebrations.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '32px'
        }}>
          {FLEET_DATA.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => handleBookClick(car)}
              style={{ cursor: 'pointer' }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>
      </section>

      <BookingModal
        car={selectedCar}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Services Section */}
      <section style={{ background: 'var(--surface)', padding: '100px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 42px)', marginBottom: '60px', textAlign: 'center', fontWeight: 800 }}>
            Why Choose <span className="gradient-text">Haider Travels</span>?
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px'
          }}>
            {[
              { title: "24/7 Support", desc: "Always here to help you on the road." },
              { title: "Best Rates", desc: "Competitive pricing with no hidden costs." },
              { title: "Clean Vehicles", desc: "Sanitized and well-maintained cars every time." },
              { title: "Pro Drivers", desc: "Experienced and verified professional chauffeurs." }
            ].map((service, i) => (
              <div key={i} className="premium-card" style={{ padding: '32px', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '12px', fontSize: '20px' }}>{service.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '80px 24px 40px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          <div>
            <h3 style={{ marginBottom: '20px', letterSpacing: '2px' }}>HAIDER TRAVELS</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
              The most trusted car rental service in Lahore, providing luxury and comfort for over a decade.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="#" style={{ color: 'var(--text-muted)' }}>Home</a></li>
              <li><a href="#fleet" style={{ color: 'var(--text-muted)' }}>Our Fleet</a></li>
              <li><a href="#" style={{ color: 'var(--text-muted)' }}>About Us</a></li>
              <li><a href="#" style={{ color: 'var(--text-muted)' }}>Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Contact</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)' }}>
              <li>Shareef Market, Madina Colony, Lahore, Punjab, Pakistan</li>
              <li>+92 321 4104443</li>
              <li>arifwasim786@gmail.com</li>
            </ul>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '60px auto 0', paddingTop: '30px', borderTop: '1px solid var(--border)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
          © 2026 Haider Travels. All rights reserved.
        </div>
      </footer>
    </>
  );
}
