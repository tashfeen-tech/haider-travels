export interface Car {
    id: string;
    name: string;
    type: string; // Sedan, SUV, etc.
    transmission: 'Manual' | 'Automatic';
    seats: number;
    pricePerDay: number;
    image: string;
    available: boolean;
    features: string[];
}

export const FLEET_DATA: Car[] = [
    {
        id: 'toyota-yaris-1',
        name: 'Toyota Yaris',
        type: 'Sedan',
        transmission: 'Automatic',
        seats: 5,
        pricePerDay: 6000,
        image: '/cars/toyota-yaris.png',
        available: true,
        features: ['AC', 'Bluetooth', 'Airbags', 'Apple CarPlay']
    },
    {
        id: 'honda-civic-2023',
        name: 'Honda Civic 2023',
        type: 'Premium Sedan',
        transmission: 'Automatic',
        seats: 5,
        pricePerDay: 8000,
        image: '/cars/honda-civic.png',
        available: true,
        features: ['Sunroof', 'Adaptive Cruise', 'Leather Seats', 'Lane Assist']
    },
    {
        id: 'kia-sorento',
        name: 'KIA Sorento',
        type: 'SUV',
        transmission: 'Automatic',
        seats: 7,
        pricePerDay: 18000,
        image: '/cars/kia-sorento.png',
        available: true,
        features: ['Panoramic Sunroof', 'All-Wheel Drive', 'Premium Audio', '7 Seater']
    },
    {
        id: 'toyota-revo',
        name: 'Toyota Hilux Revo',
        type: 'Pickup / 4x4',
        transmission: 'Automatic',
        seats: 5,
        pricePerDay: 14000,
        image: '/cars/toyota-hilux-revo.png',
        available: true,
        features: ['4x4', 'Off-road Capability', 'Turbo Diesel', 'Tow Bar']
    },
    {
        id: 'mg-hs',
        name: 'MG HS Trophy',
        type: 'SUV',
        transmission: 'Automatic',
        seats: 5,
        pricePerDay: 12000,
        image: '/cars/mg-hs-trophy.png',
        available: true,
        features: ['Turbo Engine', 'Ambient Lighting', '360 Camera', 'Panoramic Roof']
    },
    {
        id: 'hiace-10',
        name: 'Toyota Hiace',
        type: 'Van',
        transmission: 'Manual',
        seats: 10,
        pricePerDay: 10000,
        image: '/cars/toyota-hiace.png',
        available: true,
        features: ['10 Seater', 'Dual AC', 'Large Luggage Space', 'Group Travel']
    }
];

