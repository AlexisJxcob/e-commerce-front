import type { Producto } from '../types';

interface ProductCardProps {
    producto: Producto;
    onAgregar: (producto: Producto) => void;
}

export default function ProductCard({ producto, onAgregar }: ProductCardProps) {
    return (
        <div className="group flex flex-col opacity-0 animate-fade-in [animation-fill-mode:forwards]">
            {/* Contenedor de la Imagen con zoom suave */}
            <div className="aspect-[3/4] w-full overflow-hidden bg-[#F5F2EB] mb-6 rounded-xs relative">
                <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    loading="lazy"
                    className="w-full h-full object-cover object-center grayscale-[25%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
            </div>

            {/* Información del Producto */}
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-normal text-sm tracking-wide text-[#1A1A1A]">{producto.nombre}</h3>
                <span className="font-light text-sm text-[#6B6B6B]">${producto.precio}</span>
            </div>
            <p className="text-[11px] text-[#8C8C8C] font-light leading-relaxed mb-5 flex-grow">{producto.descripcion}</p>

            {/* Botón Minimalista */}
            <button
                onClick={() => onAgregar(producto)}
                className="w-full py-2.5 border border-[#1A1A1A]/30 text-[10px] uppercase tracking-widest bg-transparent text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-all duration-300 rounded-xs focus:outline-none"
            >
                Añadir al espacio
            </button>
        </div>
    );
}
