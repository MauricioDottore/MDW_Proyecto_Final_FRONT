import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, TextInput, Select, Label } from 'flowbite-react';
import { useSelector } from 'react-redux';

// Constantes fuera del componente para mejor rendimiento
const DEFAULT_IMAGES = {
  // Un objeto tech icónico: una computadora portátil (MacBook)
  tech: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000',

  // Un objeto fashion icónico: un abrigo (gabardina clásica)
  fashion: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000',

  // Un objeto home icónico: una lámpara de pie moderna
  home: 'https://images.unsplash.com/photo-1507473885765-e6ed6572b5af?q=80&w=1000',

  // Un objeto luxury icónico: un reloj de pulsera suizo
  luxury: 'https://images.unsplash.com/photo-1619224329245-f09dfd70f3f6?q=80&w=1000',

  // Un objeto uncategorized icónico: unos auriculares de diadema (como objeto genérico)
  uncategorized: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000' // (Esta ya era un objeto, es una buena opción)
};

const BLACK_TEXT_STYLE = { color: 'black', fontWeight: '900' };
const INPUT_STYLE = { color: '#374151', fontWeight: '500' };

export default function CreatePost() {
  const [formData, setFormData] = useState({
    category: 'uncategorized',
    image: DEFAULT_IMAGES.uncategorized
  });
  const [publishError, setPublishError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const userColor = currentUser?.profileColor || '#4f46e5';

  // Manejador único para todos los campos
  const handleChange = (e) => {
    const { id, value } = e.target;
    
    if (id === 'category') {
      setFormData({ 
        ...formData, 
        category: value, 
        image: DEFAULT_IMAGES[value] || DEFAULT_IMAGES.uncategorized 
      });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPublishError(null);

    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError(error.message || 'Algo salió mal al publicar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Nuevo <span style={{ color: userColor }}>Producto</span>
          </h1>
          <p className="text-slate-600 font-medium italic">Añade un artículo exclusivo a la colección.</p>
          <div className="h-1.5 w-20 mx-auto mt-4 rounded-full" style={{ backgroundColor: userColor }} />
        </header>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-200 flex flex-col gap-6">
            
            {/* NOMBRE */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="name" className="text-sm uppercase tracking-wider" style={BLACK_TEXT_STYLE}>
                🏷️ NOMBRE DEL PRODUCTO
              </Label>
              <TextInput id="name" type="text" placeholder="Ej: iPhone 15 Pro Max" required style={INPUT_STYLE} onChange={handleChange} />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {/* CATEGORÍA */}
              <div className="flex-1 flex flex-col gap-2">
                <Label htmlFor="category" className="text-sm uppercase tracking-wider" style={BLACK_TEXT_STYLE}>📁 CATEGORÍA</Label>
                <Select id="category" required style={INPUT_STYLE} onChange={handleChange}>
                  <option value="uncategorized">Seleccionar Categoría</option>
                  <option value="tech">Tecnología</option>
                  <option value="fashion">Moda</option>
                  <option value="home">Hogar</option>
                  <option value="luxury">Lujo</option>
                </Select>
              </div>

              {/* PRECIO */}
              <div className="flex-1 flex flex-col gap-2">
                <Label htmlFor="price" className="text-sm uppercase tracking-wider" style={BLACK_TEXT_STYLE}>💰 PRECIO (USD)</Label>
                <TextInput id="price" type="number" placeholder="0.00" required style={INPUT_STYLE} onChange={handleChange} />
              </div>
            </div>

            {/* VISTA PREVIA */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm uppercase tracking-wider" style={BLACK_TEXT_STYLE}>🖼️ IMAGEN ASIGNADA</Label>
              <div className="relative h-48 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-inner">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>

            {/* DESCRIPCIÓN */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="description" className="text-sm uppercase tracking-wider" style={BLACK_TEXT_STYLE}>📝 DESCRIPCIÓN</Label>
              <textarea
                id="description"
                required
                className="w-full p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-cyan-500 min-h-[120px] transition-all bg-white font-medium"
                style={{ color: '#374151' }}
                placeholder="Detalles del producto..."
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl transition-all duration-300 shadow-lg text-white font-black uppercase tracking-widest text-sm ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}
              style={{ background: `linear-gradient(135deg, ${userColor} 0%, #000000 100%)` }}
            >
              {loading ? 'Publicando...' : '🚀 Publicar en Catálogo'}
            </button>

            {publishError && <Alert color="failure" className="mt-4 font-bold">⚠️ {publishError}</Alert>}
          </div>
        </form>
      </div>
    </div>
  );
}