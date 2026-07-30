import { X, Plus, Minus, Trash2 } from 'lucide-react';
import type { ItemCarrito } from '../types';

interface CartSidebarProps {
    abierto: boolean;
    carrito: ItemCarrito[];
    onCerrar: () => void;
    onModificarCantidad: (id: number, accion: 'incrementar' | 'decrementar') => void;
    onLimpiar: () => void;
}

export default function CartSidebar({ abierto, carrito, onCerrar, onModificarCantidad, onLimpiar }: CartSidebarProps) {
    const total = carrito.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);

    return (
        <div className={`fixed inset-0 z-50 transition-visibility duration-300 ${abierto ? 'visible' : 'invisible'}`}>
            {/* Fondo difuminado traslúcido */}
            <div
                className={`absolute inset-0 bg-black/15 backdrop-blur-xs transition-opacity duration-300 ${abierto ? 'opacity-100' : 'opacity-0'}`}
                onClick={onCerrar}
            />

            {/* Panel Desplazable */}
            <div className={`absolute top-0 right-0 w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col p-8 border-l border-[#EAE6DF] transition-transform duration-300 ease-in-out ${abierto ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Cabecera del Carrito */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xs uppercase tracking-widest font-medium text-[#1A1A1A]">Tu Espacio</h2>
                    <button onClick={onCerrar} className="text-[#8C8C8C] hover:text-black transition-colors">
                        <X strokeWidth={1} size={20} />
                    </button>
                </div>

                {/* Listado de Ítems */}
                <div className="flex-grow overflow-y-auto space-y-6 pr-2 scrollbar-thin">
                    {carrito.length === 0 ? (
                        <div className="h-40 flex items-center justify-center">
                            <p className="text-xs text-[#8C8C8C] font-light italic tracking-wide">Tu entorno está vacío.</p>
                        </div>
                    ) : (
                        carrito.map(item => (
                            <div key={item.producto.id} className="flex gap-4 border-b border-[#F5F2EB] pb-5 animate-fade-in">
                                <img src={item.producto.imagen} alt={item.producto.nombre} className="w-16 h-20 object-cover bg-[#F5F2EB] rounded-xs grayscale-[15%]" />
                                <div className="flex-grow flex flex-col justify-between py-0.5">
                                    <div>
                                        <h4 className="text-xs font-normal text-[#1A1A1A] tracking-wide">{item.producto.nombre}</h4>
                                        <p className="text-[11px] text-[#8C8C8C] font-light长 font-mono mt-0.5">${item.producto.precio} USD</p>
                                    </div>

                                    {/* Selectores de cantidad */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border border-[#EAE6DF] rounded-xs bg-[#FDFBF7]">
                                            <button onClick={() => onModificarCantidad(item.producto.id, 'decrementar')} className="px-2 py-1 text-[#8C8C8C] hover:text-black transition-colors"><Minus size={10} /></button>
                                            <span className="text-[11px] font-mono px-1 w-4 text-center">{item.cantidad}</span>
                                            <button onClick={() => onModificarCantidad(item.producto.id, 'incrementar')} className="px-2 py-1 text-[#8C8C8C] hover:text-black transition-colors"><Plus size={10} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer del Carrito con Totales */}
                {carrito.length > 0 && (
                    <div className="border-t border-[#EAE6DF] pt-6 mt-4">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-xs uppercase tracking-widest font-light text-[#6B6B6B]">Subtotal</span>
                            <span className="text-base font-normal font-mono text-[#1A1A1A]">${total} USD</span>
                        </div>
                        <div className="space-y-3">
                            <button
                                onClick={() => alert("Simulación de checkout completada.")}
                                className="w-full py-3 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest hover:bg-[#333333] transition-colors duration-300 rounded-xs font-medium"
                            >
                                Proceder al checkout
                            </button>
                            <button
                                onClick={onLimpiar}
                                className="w-full py-2 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-[#8C8C8C] hover:text-red-700 transition-colors duration-300"
                            >
                                <Trash2 size={12} strokeWidth={1.5} /> Vaciar orden
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
