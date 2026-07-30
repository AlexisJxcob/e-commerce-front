import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import type { Producto, ItemCarrito } from './types';

// URLs de imágenes de Unsplash optimizadas por ID para evitar bloqueos agresivos de red
const PRODUCTOS_MOCK: Producto[] = [
    { id: 1, nombre: "Vela de Soja Sándalo", precio: 24, descripcion: "Cera natural vertida a mano con aceites esenciales orgánicos y notas de cedro.", imagen: "https://unsplash.com" },
    { id: 2, nombre: "Cuenco de Cerámica Ritual", precio: 38, descripcion: "Modelado a mano en arcilla negra con acabado mate texturizado japonés.", imagen: "https://unsplash.com" },
    { id: 3, nombre: "Tetera de Hierro Fundido", precio: 72, descripcion: "Inspirada en el diseño tradicional Tetsubin con filtro de acero inoxidable integrado.", imagen: "https://unsplash.com" },
    { id: 4, nombre: "Incienso Botánico Puro", precio: 19, descripcion: "Lote de 25 varillas naturales a base de musgo de roble y sándalo blanco.", imagen: "https://unsplash.com" },
    { id: 5, nombre: "Aceite Esencial Bruma", precio: 28, descripcion: "Extracto puro destilado al vapor para promover el enfoque y la relajación profunda.", imagen: "https://unsplash.com" },
    { id: 6, nombre: "Soporte de Incienso Travertino", precio: 45, descripcion: "Bloque de piedra natural travertino pulido artesanalmente con ranuras concéntricas.", imagen: "https://unsplash.com" }
];

export default function App() {
    // Inicializar carrito leyendo del localStorage si existe (Persistencia Real)
    const [carrito, setCarrito] = useState<ItemCarrito[]>(() => {
        const guardado = localStorage.getItem('kaizen_cart');
        return guardado ? JSON.parse(guardado) : [];
    });
    const [carritoAbierto, setCarritoAbierto] = useState<boolean>(false);

    // Sincronizar cambios del carrito con el LocalStorage del navegador
    useEffect(() => {
        localStorage.setItem('kaizen_cart', JSON.stringify(carrito));
    }, [carrito]);

    const handleAgregarAlCarrito = (producto: Producto) => {
        setCarrito(prev => {
            const existe = prev.find(item => item.producto.id === producto.id);
            if (existe) {
                return prev.map(item =>
                    item.producto.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }
            return [...prev, { producto, cantidad: 1 }];
        });
        setCarritoAbierto(true); // Microinteracción: Abrir el carrito al añadir
    };

    const handleModificarCantidad = (id: number, accion: 'incrementar' | 'decrementar') => {
        setCarrito(prev => prev.map(item => {
            if (item.producto.id === id) {
                const nuevaCantidad = accion === 'incrementar' ? item.cantidad + 1 : item.cantidad - 1;
                return { ...item, cantidad: nuevaCantidad };
            }
            return item;
        }).filter(item => item.cantidad > 0));
    };

    const handleLimpiarCarrito = () => {
        if (window.confirm("¿Deseas remover todos los elementos de tu espacio?")) {
            setCarrito([]);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] selection:bg-[#4A5D4E]/20 selection:text-black">

            <Navbar
                carrito={carrito}
                onAbrirCarrito={() => setCarritoAbierto(true)}
            />

            <main className="max-w-5xl mx-auto px-6 py-16">
                {/* Cabecera de catálogo */}
                <div className="mb-16 text-center md:text-left opacity-0 animate-fade-in">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-[#8C8C8C] mb-2">Colección Permanente</p>
                    <h2 className="text-xl font-light text-[#1A1A1A] tracking-wide">Objetos de Calma y Enfoque</h2>
                </div>

                {/* Grid de productos extendido */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
                    {PRODUCTOS_MOCK.map(producto => (
                        <ProductCard
                            key={producto.id}
                            producto={producto}
                            onAgregar={handleAgregarAlCarrito}
                        />
                    ))}
                </div>
            </main>

            <CartSidebar
                abierto={carritoAbierto}
                carrito={carrito}
                onCerrar={() => setCarritoAbierto(false)}
                onModificarCantidad={handleModificarCantidad}
                onLimpiar={handleLimpiarCarrito}
            />
        </div>
    );
}
