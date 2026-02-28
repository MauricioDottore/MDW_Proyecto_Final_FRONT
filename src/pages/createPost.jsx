import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, TextInput, Select, FileInput } from 'flowbite-react';
import { useSelector } from 'react-redux';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const userColor = currentUser?.profileColor || '#4f46e5';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/product/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/product/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Algo salió mal al publicar el producto');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* ENCABEZADO */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Nuevo <span style={{ color: userColor }}>Producto</span>
          </h1>
          <p className="text-slate-500 font-medium italic">
            Añade un artículo exclusivo a la colección de Buypedia.
          </p>
          <div 
            className="h-1.5 w-20 mx-auto mt-4 rounded-full" 
            style={{ backgroundColor: userColor }}
          ></div>
        </div>

        {/* FORMULARIO */}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          
          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 flex flex-col gap-6">
            
            {/* TÍTULO Y CATEGORÍA */}
            <div className="flex flex-col md:flex-row gap-4">
              <TextInput
                type="text"
                placeholder="Nombre del producto"
                required
                id="name"
                className="flex-1"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Select
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="md:w-48"
              >
                <option value="uncategorized">Categoría</option>
                <option value="tech">Tecnología</option>
                <option value="fashion">Moda</option>
                <option value="home">Hogar</option>
                <option value="luxury">Lujo</option>
              </Select>
            </div>

            {/* PRECIO */}
            <div className="relative">
               <TextInput
                type="number"
                placeholder="Precio (USD)"
                required
                id="price"
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            {/* CARGA DE IMAGEN (UI Mejorada) */}
            <div className="flex flex-col gap-4 p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
              <div className="flex items-center justify-between gap-4">
                <FileInput 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setFile(e.target.files[0])}
                  className="flex-1"
                />
                <Button
                  type="button"
                  size="sm"
                  outline
                  style={{ color: userColor, borderColor: userColor }}
                  className="hover:bg-slate-100 transition-all font-bold uppercase text-xs"
                >
                  Subir Imagen
                </Button>
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold text-center">
                Formatos recomendados: JPG, PNG o WEBP (Máx 2MB)
              </p>
            </div>

            {/* DESCRIPCIÓN */}
            <textarea
                placeholder="Describe los detalles premium de este producto..."
                className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 min-h-[150px] outline-none transition-all"
                required
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            {/* BOTÓN DE PUBLICAR (Estilo Premium que pediste) */}
            <button
              type="submit"
              className="w-full relative group overflow-hidden rounded-2xl py-4 transition-all duration-300 shadow-lg hover:shadow-2xl active:scale-[0.98] border-none"
              style={{ background: `linear-gradient(135deg, ${userColor} 0%, #000000 100%)` }}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center justify-center gap-3 relative z-10">
                <span className="text-white font-black uppercase tracking-[0.25em] text-sm">
                  Publicar en Catálogo
                </span>
              </div>
            </button>

            {publishError && (
              <Alert color="failure" className="mt-5 rounded-xl font-bold">
                {publishError}
              </Alert>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}