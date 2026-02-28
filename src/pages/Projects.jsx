import { useEffect, useState } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('Todos');
  const [loading, setLoading] = useState(true);

  // Categorías (Asegúrate de que coincidan con los values de tu CreatePost)
  const categories = ['Todos', 'tech', 'home', 'fashion', 'luxury'];


    useEffect(() => {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const res = await fetch('/api/post/getposts');
          const data = await res.json();
          
          if (res.ok) {
            // CAMBIO AQUÍ: data es { posts: [...] }, por eso usamos data.posts
            setProducts(data.posts); 
          }
        } catch (error) {
          console.log("Error:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }, []);
    
  // Lógica de filtrado en tiempo real
  const filteredProducts = filter === 'Todos' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-white">
      {/* Header ... (se mantiene igual) */}
      
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Categorías</h3>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`text-left px-4 py-2 rounded-xl transition-all capitalize ${
                    filter === cat 
                    ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-100' 
                    : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat === 'tech' ? 'Tecnología' : cat === 'home' ? 'Hogar' : cat === 'fashion' ? 'Moda' : cat === 'luxury' ? 'Lujo' : cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Grilla de Productos */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {!loading && filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product._id} className="group relative bg-white border border-slate-100 rounded-3xl p-4 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500">
                  {/* ... Resto de tu diseño de Card (imagen, nombre, precio) */}
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-indigo-600 uppercase">{product.category}</p>
                    <h2 className="text-xl font-bold text-slate-800 truncate">{product.name}</h2>
                    <p className="text-2xl font-black text-slate-900">${product.price}</p>
                  </div>
                </div>
              ))
            ) : !loading && filteredProducts.length === 0 ? (
              <p className="text-slate-500 text-center col-span-full py-20 font-medium">No hay productos en esta categoría todavía.</p>
            ) : (
              // Skeletons de carga
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

// controllers/post.controller.js
export const getposts = async (req, res, next) => {
  try {
    const posts = await Post.find(); // Asegúrate de que Post sea tu modelo
    res.status(200).json({ posts }); // Aquí lo enviamos envuelto en un objeto
  } catch (error) {
    next(error);
  }
};