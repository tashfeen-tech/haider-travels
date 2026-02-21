# 🚗 Haider Travels — Complete Usage Guide

> **Premium car rental website for Lahore, Pakistan**  
> Built with Next.js 16, Firebase, and Framer Motion

---

## 🔗 Important Links

| Resource | URL |
|----------|-----|
| **🌐 Live Website** | [https://haider-travels-tau.vercel.app](https://haider-travels-tau.vercel.app) |
| **🔧 Vercel Dashboard** | [https://vercel.com/tashfeens-projects-8f733995/haider-travels](https://vercel.com/tashfeens-projects-8f733995/haider-travels) |
| **🔥 Firebase Console** | [https://console.firebase.google.com/project/haider-travels/overview](https://console.firebase.google.com/project/haider-travels/overview) |
| **📦 Firebase Firestore DB** | [https://console.firebase.google.com/project/haider-travels/firestore](https://console.firebase.google.com/project/haider-travels/firestore) |
| **👤 Firebase Auth** | [https://console.firebase.google.com/project/haider-travels/authentication](https://console.firebase.google.com/project/haider-travels/authentication) |
| **📁 Firebase Storage** | [https://console.firebase.google.com/project/haider-travels/storage](https://console.firebase.google.com/project/haider-travels/storage) |
| **🔐 Admin Login** | [https://haider-travels-tau.vercel.app/admin/login](https://haider-travels-tau.vercel.app/admin/login) |

---

## 📄 All Website Pages

| Page | URL | Description |
|------|-----|-------------|
| Homepage | [/](https://haider-travels-tau.vercel.app/) | Hero section, fleet preview, services, footer |
| Fleet | [/fleet](https://haider-travels-tau.vercel.app/fleet) | Full car listings with filters (type, price, seats) |
| About | [/about](https://haider-travels-tau.vercel.app/about) | Company story, values, stats |
| Contact | [/contact](https://haider-travels-tau.vercel.app/contact) | Contact form (saves to Firebase), WhatsApp, phone |
| Sign In / Register | [/auth](https://haider-travels-tau.vercel.app/auth) | User authentication (Firebase Auth) |
| My Bookings | [/my-bookings](https://haider-travels-tau.vercel.app/my-bookings) | Logged-in users can view/cancel their bookings |
| Admin Login | [/admin/login](https://haider-travels-tau.vercel.app/admin/login) | Admin authentication portal |
| Admin Dashboard | [/admin/dashboard](https://haider-travels-tau.vercel.app/admin/dashboard) | Full admin panel (bookings, messages, stats) |

---

## 🚀 Features Overview

### 🏠 Customer-Facing Features

1. **Homepage**
   - Premium dark-themed hero section with animated text
   - Quick "Book Now" CTA button (calls WhatsApp)
   - Fleet preview grid showing all 6 vehicles
   - "Why Choose Haider?" service highlights
   - Footer with contact info and quick links

2. **Fleet Page** (`/fleet`)
   - Grid of all available cars with images and pricing
   - **Filters**: Vehicle type (Sedan, SUV, Van, 4x4), price range, seat count
   - Click any car to open booking modal

3. **Booking System**
   - Click a car → opens a beautiful booking modal
   - Enter: name, phone, email, pickup date, return date, with/without driver
   - **Auto-calculates**: total price based on days × daily rate
   - **Auto-fills**: user data if logged in
   - Saves directly to **Firebase Firestore** (`bookings` collection)
   - Shows success message with link to track booking

4. **User Authentication** (`/auth`)
   - Sign up with email, password, name, phone
   - Login with email & password
   - User profile stored in Firestore (`users` collection)
   - Role-based access: `user` or `admin`

5. **My Bookings** (`/my-bookings`)
   - View all bookings made with the logged-in email
   - See booking status: `pending`, `confirmed`, `cancelled`
   - Cancel pending bookings
   - Real-time updates via Firestore `onSnapshot`

6. **Contact Page** (`/contact`)
   - Contact form (name, email, phone, message)
   - Saves to Firebase Firestore (`contactMessages` collection)
   - Direct links: phone call, WhatsApp, email
   - Business hours and location info

7. **About Page** (`/about`)
   - Company story and mission
   - Key stats and value propositions
   - CTA to browse fleet

### 🔐 Admin Dashboard Features

**Access**: `/admin/login` → then redirected to `/admin/dashboard`

1. **Dashboard Tab**
   - Total bookings count
   - Pending requests count
   - Confirmed rides count
   - Estimated revenue (from confirmed bookings)
   - Recent bookings table (top 5)

2. **Bookings Tab**
   - View ALL bookings with full details
   - Customer info: name, phone, email
   - Car name, with/without driver
   - Pickup & return dates
   - Total price
   - Status badge (pending/confirmed/cancelled)
   - **Actions**: Approve ✅ or Reject ❌ pending bookings
   - Cancel confirmed bookings
   - Timestamp of when booking was created

3. **Messages Tab**
   - View all contact form submissions
   - Unread messages badge counter
   - Mark messages as read (click to open)
   - Delete messages
   - Sender avatar, name, email, phone
   - Full message body
   - Timestamp

---

## 🔥 Firebase Database Structure

### Firestore Collections

```
📂 bookings
├── name: string
├── email: string
├── phone: string
├── pickupDate: string (YYYY-MM-DD)
├── returnDate: string (YYYY-MM-DD)
├── withDriver: boolean
├── carId: string
├── carName: string
├── carImage: string
├── pricePerDay: number
├── days: number
├── totalPrice: number
├── status: "pending" | "confirmed" | "cancelled"
├── userId: string (nullable)
└── createdAt: Timestamp

📂 contactMessages
├── name: string
├── email: string
├── phone: string
├── message: string
├── read: boolean
└── createdAt: Timestamp

📂 users
├── uid: string
├── email: string
├── name: string
├── phone: string
├── role: "user" | "admin"
└── createdAt: Timestamp
```

---

## 🚗 Fleet Inventory

| Vehicle | Type | Seats | Price/Day | Features |
|---------|------|-------|-----------|----------|
| Toyota Yaris | Sedan | 5 | Rs. 6,000 | AC, Bluetooth, Airbags, Apple CarPlay |
| Honda Civic 2023 | Premium Sedan | 5 | Rs. 8,000 | Sunroof, Adaptive Cruise, Leather Seats, Lane Assist |
| KIA Sorento | SUV | 7 | Rs. 18,000 | Panoramic Sunroof, AWD, Premium Audio, 7 Seater |
| Toyota Hilux Revo | Pickup / 4x4 | 5 | Rs. 14,000 | 4x4, Off-road, Turbo Diesel, Tow Bar |
| MG HS Trophy | SUV | 5 | Rs. 12,000 | Turbo Engine, Ambient Lighting, 360 Camera, Panoramic Roof |
| Toyota Hiace | Van | 10 | Rs. 10,000 | 10 Seater, Dual AC, Large Luggage Space, Group Travel |

---

## 🛠️ Admin Setup Guide

### Making a User an Admin

1. Go to [Firebase Console → Authentication](https://console.firebase.google.com/project/haider-travels/authentication)
2. Find the user you want to make admin (or create one via the website `/auth`)
3. Copy their **UID**
4. Go to [Firebase Console → Firestore](https://console.firebase.google.com/project/haider-travels/firestore)
5. Navigate to `users` collection → find the document with that UID
6. Change the `role` field from `"user"` to `"admin"`
7. Now that user can log in at `/admin/login` and access the dashboard

### Managing Bookings

1. Log in at [/admin/login](https://haider-travels-tau.vercel.app/admin/login) with your admin account
2. Go to **Dashboard** tab for an overview
3. Go to **Bookings** tab to see all booking requests
4. Click ✅ to **approve** a booking (status → confirmed)
5. Click ❌ to **reject** or cancel a booking (status → cancelled)
6. Status updates appear in real-time for both admin and customer

### Managing Contact Messages

1. Go to **Messages** tab in the admin dashboard
2. Unread messages show a "New" badge
3. Click a message to mark it as read
4. Click the 🗑️ icon to delete a message

---

## 💻 Local Development

```bash
# Clone the repository
git clone <repo-url>

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Firebase credentials

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to Vercel
npx -y vercel --prod --yes
```

### Environment Variables (`.env.local`)

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

## 🏗️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type-safe code |
| **Firebase Auth** | User authentication |
| **Firebase Firestore** | Real-time database for bookings, messages, users |
| **Firebase Storage** | File/image storage |
| **Framer Motion** | Page transitions and animations |
| **Lucide React** | Modern icon library |
| **CSS Modules** | Scoped component styling |
| **Vercel** | Hosting and deployment |

---

## 📞 Business Contact

- **Phone / WhatsApp**: +92 347 6669992
- **Email**: info@haidertravels.com
- **Location**: Lahore, Punjab, Pakistan
- **Hours**: 24/7

---

*Last updated: February 21, 2026*
