import {useState} from 'react';
import type {Producto, ItemCarrito} from './types';
import {ShoppingBag, X, Plus, Minus} from 'lucide-react';

// 1. Datos simulados (Mock Data con estética Zen)
const PRODUCTOS_MOCK: Producto[] = [
    {
        id: 1,
        nombre: "Vela de Soja Sándalo",
        precio: 24,
        descripcion: "Cera natural con notas de madera y calma.",
        imagen: "https://unsplash.com"
    },
    {
        id: 2,
        nombre: "Tetera de Cerámica Matcha",
        precio: 48,
        descripcion: "Hecha a mano en arcilla texturizada gris.",
        imagen: "https://unsplash.com"
    },
    {
        id: 3,
        nombre: "Incienso de Cedro Japonés",
        precio: 18,
        descripcion: "20 varillas de purificación y enfoque.",
        imagen: "https://unsplash.com"
    }
];

export default function App() {
    // 2. Estados de la Aplicación (El cerebro del Front)
    const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
    const [carritoAbierto, setCarritoAbierto] = useState<boolean>(false);

    // 3. Controladores de Eventos (Lógica pura de datos)
    const agregarAlCarrito = (producto: Producto) => {
        setCarrito(prev => {
            const existe = prev.find(item => item.producto.id === producto.id);
            if (existe) {
                return prev.map(item =>
                    item.producto.id === producto.id ? {...item, cantidad: item.cantidad + 1} : item
                );
            }
            return [...prev, {producto, cantidad: 1}];
        });
    };

    const modificarCantidad = (id: number, accion: 'incrementar' | 'decrementar') => {
        setCarrito(prev => prev.map(item => {
            if (item.producto.id === id) {
                const nuevaCantidad = accion === 'incrementar' ? item.cantidad + 1 : item.cantidad - 1;
                return {...item, cantidad: nuevaCantidad};
            }
            return item;
        }).filter(item => item.cantidad > 0)); // Filtro backend: si baja de 1, se remueve
    };

    const totalCarrito = carrito.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans antialiased text-[#2C2C2C]">

            {/* HEADER MINIMALISTA */}
            <header className="border-b border-[#EAE6DF] sticky top-0 bg-[#FDFBF7]/80 backdrop-blur-md z-40">
                <div className="max-w-5xl mx-auto px-6 h-20 flex justify-between items-center">
                    <h1 className="text-xl font-light tracking-[0.2em] uppercase text-[#1A1A1A]">KAIZEN . O</h1>
                    <button
                        onClick={() => setCarritoAbierto(true)}
                        className="relative p-2 text-[#4A4A4A] hover:text-black transition-colors"
                    >
                        <ShoppingBag strokeWidth={1.2} size={22}/>
                        {carrito.length > 0 && (
                            <span
                                className="absolute -top-1 -right-1 bg-[#4A5D4E] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-light">
                {carrito.reduce((sum, item) => sum + item.cantidad, 0)}
              </span>
                        )}
                    </button>
                </div>
            </header>

            {/* CATÁLOGO DE PRODUCTOS */}
            <main className="max-w-5xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {PRODUCTOS_MOCK.map(producto => (
                        <div key={producto.id} className="group flex flex-col">
                            <div className="aspect-[4/5] w-full overflow-hidden bg-[#F5F2EB] mb-6 rounded-sm">
                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                    className="w-full h-full object-cover object-center grayscale-[30%] group-hover:scale-102 transition-transform duration-700 ease-out"
                                />
                            </div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-normal text-base text-[#1A1A1A]">{producto.nombre}</h3>
                                <span className="font-light text-sm text-[#6B6B6B]">${producto.precio}</span>
                            </div>
                            <p className="text-xs text-[#8C8C8C] font-light leading-relaxed mb-4 flex-grow">{producto.descripcion}</p>
                            <button
                                onClick={() => agregarAlCarrito(producto)}
                                className="w-full py-2.5 border border-[#1A1A1A] text-xs uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 rounded-sm"
                            >
                                Añadir al espacio
                            </button>
                        </div>
                    ))}
                </div>
            </main>

            {/* CARRITO LATERAL (SIDEBAR) */}
            {carritoAbierto && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-xs"
                         onClick={() => setCarritoAbierto(false)}/>
                    <div
                        className="relative w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col p-8 z-10 border-l border-[#EAE6DF]">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-sm uppercase tracking-widest font-medium">Tu Carrito</h2>
                            <button onClick={() => setCarritoAbierto(false)}
                                    className="text-[#8C8C8C] hover:text-black">
                                <X strokeWidth={1} size={20}/>
                            </button>
                        </div>

                        <div className="flex-grow overflow-y-auto space-y-6 pr-2">
                            {carrito.length === 0 ? (
                                <p className="text-xs text-[#8C8C8C] font-light italic">Tu espacio está vacío.</p>
                            ) : (
                                carrito.map(item => (
                                    <div key={item.producto.id} className="flex gap-4 border-b border-[#F5F2EB] pb-4">
                                        <img src={item.producto.imagen} alt={item.producto.nombre}
                                             className="w-16 h-20 object-cover bg-[#F5F2EB] rounded-xs grayscale-[20%]"/>
                                        <div className="flex-grow flex flex-col justify-between">
                                            <div>
                                                <h4 className="text-sm font-normal">{item.producto.nombre}</h4>
                                                <p className="text-xs text-[#8C8C8C] font-light">${item.producto.precio} c/u</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => modificarCantidad(item.producto.id, 'decrementar')}
                                                    className="p-1 border border-[#EAE6DF] hover:border-[#1A1A1A] rounded-xs">
                                                    <Minus size={12}/></button>
                                                <span className="text-xs font-light">{item.cantidad}</span>
                                                <button
                                                    onClick={() => modificarCantidad(item.producto.id, 'incrementar')}
                                                    className="p-1 border border-[#EAE6DF] hover:border-[#1A1A1A] rounded-xs">
                                                    <Plus size={12}/></button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {carrito.length > 0 && (
                            <div className="border-t border-[#EAE6DF] pt-6 mt-4">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-xs uppercase tracking-widest font-light">Subtotal</span>
                                    <span className="text-lg font-normal">${totalCarrito}</span>
                                </div>
                                <button
                                    className="w-full py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-widest hover:bg-[#2C2C2C] transition-colors rounded-sm">
                                    Proceder al pago
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
