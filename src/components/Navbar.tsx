import { ShoppingBag } from 'lucide-react';
import type { ItemCarrito } from '../types';

interface NavbarProps {
    carrito: ItemCarrito[];
    onAbrirCarrito: () => void;
}

export default function Navbar({ carrito, onAbrirCarrito }: NavbarProps) {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

    return (
        <header className="border-b border-[#EAE6DF] sticky top-0 bg-[#FDFBF7]/80 backdrop-blur-md z-40 transition-all duration-300">
            <div className="max-w-5xl mx-auto px-6 h-20 flex justify-between items-center">
                <h1 className="text-xl font-light tracking-[0.25em] uppercase text-[#1A1A1A]">KAIZEN . O</h1>
                <button
                    onClick={onAbrirCarrito}
                    className="relative p-2 text-[#4A4A4A] hover:text-black transition-colors duration-300 focus:outline-none"
                    aria-label="Abrir carrito"
                >
                    <ShoppingBag strokeWidth={1} size={22} />
                    {totalItems > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 bg-[#4A5D4E] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-light animate-fade-in">
              {totalItems}
            </span>
                    )}
                </button>
            </div>
        </header>
    );
}
