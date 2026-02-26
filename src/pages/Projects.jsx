import { useEffect, useState } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('Todos');

  // Categorías de ejemplo
  const categories = ['Todos', 'Tecnología', 'Hogar', 'Moda', 'Accesorios'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/product/get');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header de la sección */}
      <div className="bg-slate-50 border-b border-slate-100 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Explorar Catálogo</h1>
          <p className="text-slate-500 mt-2 text-lg">Encuentra los mejores productos seleccionados para ti.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
        
        {/* Sidebar de Filtros (Muy profesional) */}
        <aside className="w-full md:w-64 space-y-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Categorías</h3>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`text-left px-4 py-2 rounded-xl transition-all ${
                    filter === cat 
                    ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-100' 
                    : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
            <p className="text-indigo-700 font-bold text-sm">¿Buscas algo específico?</p>
            <p className="text-indigo-600/70 text-xs mt-1">Los nuevos ingresos llegan cada martes.</p>
          </div>
        </aside>

        {/* Grilla de Productos */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="group relative bg-white border border-slate-100 rounded-3xl p-4 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500">
                  {/* Imagen con Badge de Descuento */}
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 mb-4">
                    <img 
                      src={product.image || 'https://via.placeholder.com/300'} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter text-indigo-600 shadow-sm">
                      Nuevo Ingreso
                    </span>
                  </div>

                  {/* Detalle del producto */}
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-tighter">{product.category || 'General'}</p>
                    <h2 className="text-xl font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
                      {product.name}
                    </h2>
                    <div className="flex items-center justify-between pt-2">
                      <p className="text-2xl font-black text-slate-900">${product.price}</p>
                      <button className="bg-slate-900 text-white p-3 rounded-2xl hover:bg-indigo-600 transition-colors shadow-lg active:scale-90">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Esqueleto o Loading (Visualmente atractivo)
              [1,2,3,4,5,6].map((i) => (
                <div key={i} className="animate-pulse bg-slate-50 rounded-3xl h-80 border border-slate-100"></div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}