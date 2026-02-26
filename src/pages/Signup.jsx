// src/pages/Home.jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner Comercial */}
      <section className="bg-indigo-700 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-left">
            <span className="bg-yellow-400 text-indigo-900 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
              Ofertas de Verano
            </span>
            <h1 className="text-5xl md:text-6xl font-black mt-4 leading-tight">
              Todo lo que buscas, <br /> en un solo lugar.
            </h1>
            <p className="text-indigo-100 text-lg mt-6 mb-10 max-w-lg">
              Únete a la comunidad de compradores más grande de Buypedia y obtén envíos gratis en tu primera compra.
            </p>
            <div className="flex gap-4">
              <Link 
                to="/sign-up" 
                className="bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-100 transition-all active:scale-95"
              >
                Crear mi cuenta gratis
              </Link>
              <button className="border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                Ver Ofertas
              </button>
            </div>
          </div>
          
          {/* Espacio para Imagen de Producto Destacado */}
          <div className="hidden md:block md:w-1/2 mt-12 md:mt-0 relative">
             <div className="w-full h-80 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 flex items-center justify-center text-8xl shadow-2xl">
               📦
             </div>
             <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="bg-green-100 text-green-600 p-2 rounded-full">✓</div>
                <div className="text-slate-800 text-sm font-bold">Envío gratis <br/><span className="text-gray-400 font-normal">en 24hs</span></div>
             </div>
          </div>
        </div>
      </section>

      {/* Categorías Rápidas */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Tecnología', 'Moda', 'Hogar', 'Deportes'].map((cat) => (
            <div key={cat} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer text-center">
              <h3 className="font-bold text-gray-700">{cat}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}