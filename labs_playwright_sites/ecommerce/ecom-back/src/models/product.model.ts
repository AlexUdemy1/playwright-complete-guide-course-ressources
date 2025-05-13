import dotenv from 'dotenv';

dotenv.config();

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    stock: number;
    image: string;
    quantity?: number;
}

const BASE_URL = process.env.BASE_URL || "http://localhost:3001";  // Default to localhost if not defined

export const products: Product[] = [
    { id: 1, name: "BMW X5", price: 39999, description: "Luxury SUV", stock: 10, image: `${BASE_URL}/assets/cars/BMW_X5.png` },
    { id: 2, name: "LOTUS ELETRE", price: 45000, description: "Electric SUV", stock: 10, image: `${BASE_URL}/assets/cars/LOTUS_ELETRE.png` },
    { id: 3, name: "MERCEDES BENZ CLASS V", price: 55000, description: "Luxury Van", stock: 10, image: `${BASE_URL}/assets/cars/MERCEDES-BENZ_CLASS_V.png` },
    { id: 4, name: "MERCEDES BENZ EQB", price: 60000, description: "Electric SUV", stock: 10, image: `${BASE_URL}/assets/cars/MERCEDES-BENZ_EQB.png` },
    { id: 5, name: "MERCEDES BENZ EQE", price: 55000, description: "Electric Sedan", stock: 10, image: `${BASE_URL}/assets/cars/MERCEDES-BENZ_EQE.png` },
    { id: 6, name: "RENAULT CAPTUR", price: 39999, description: "Compact SUV", stock: 10, image: `${BASE_URL}/assets/cars/RENAULT_CAPTUR.png` },
    { id: 7, name: "RENAULT CLIO", price: 14999, description: "Economy Hatchback", stock: 10, image: `${BASE_URL}/assets/cars/RENAULT_CLIO.png` },
    { id: 8, name: "TESLA MODEL Y", price: 59999, description: "Electric Crossover", stock: 10, image: `${BASE_URL}/assets/cars/TESLA_MODEL_Y.png` },
    { id: 9, name: "VOLKSWAGEN POLO", price: 19999, description: "Compact Hatchback", stock: 10, image: `${BASE_URL}/assets/cars/VOLKSWAGEN_POLO.png` },
    { id: 10, name: "VOLKSWAGEN TAIGO", price: 45000, description: "Sporty Crossover", stock: 15, image: `${BASE_URL}/assets/cars/VOLKSWAGEN_TAIGO.png` }
];
