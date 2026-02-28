import { Button, TextInput, Alert } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { HiOutlineLogout, HiOutlineTrash, HiCheck } from 'react-icons/hi';
import { 
  updateStart, 
  updateSuccess, 
  updateFailure 
} from '../redux/user/userSlice';

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user || {});
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const dispatch = useDispatch();

  const colors = [
    { name: 'Indigo', bg: 'bg-indigo-600', hex: '#4f46e5' },
    { name: 'Emerald', bg: 'bg-emerald-500', hex: '#10b981' },
    { name: 'Rose', bg: 'bg-rose-500', hex: '#f43f5e' },
    { name: 'Amber', bg: 'bg-amber-400', hex: '#fbbf24' },
    { name: 'Sky', bg: 'bg-sky-500', hex: '#0ea5e9' },
    { name: 'Slate', bg: 'bg-slate-700', hex: '#334155' },
  ];

  const initial = currentUser?.username?.charAt(0).toUpperCase() || '?';
  const currentColor = formData.profileColor || currentUser?.profileColor || '#4f46e5';
  const currentBgClass = colors.find(c => c.hex === currentColor)?.bg || 'bg-indigo-600';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleColorSelect = (hexColor) => {
    setFormData({ ...formData, profileColor: hexColor });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) return;

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("¡Perfil actualizado con éxito!");
        setFormData({}); 
      }
    } catch (err) {
      dispatch(updateFailure(err.message));
    }
  };

  // Clase reutilizable para los inputs que asegura visibilidad del texto
  const inputStyles = '[&_input]:py-4 [&_input]:px-6 [&_input]:rounded-2xl [&_input]:border-none [&_input]:bg-slate-50 [&_input]:text-slate-900 [&_input]:font-bold focus:[&_input]:ring-2 focus:[&_input]:ring-indigo-500';

  return (
    <div className='max-w-xl mx-auto p-4 w-full min-h-screen mb-10'>
      <div className='text-center my-10'>
        <h1 className='text-4xl font-black tracking-tight text-slate-800 mb-2'>
          Ajustes de <span className='text-indigo-600'>Perfil</span>
        </h1>
        <p className='text-slate-400 text-sm font-semibold uppercase tracking-widest'>Personalización sin imágenes</p>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col gap-8 bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-2xl shadow-indigo-100/40'>
        
        <div className='flex flex-col items-center gap-6'>
          <div className={`w-40 h-40 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 ring-[12px] ring-slate-50 ${currentBgClass}`}>
            <span className='text-7xl font-black text-white select-none'>
              {initial}
            </span>
          </div>
          
          <div className='flex flex-col items-center gap-2'>
            <span className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>Color de perfil</span>
            <div className='flex gap-3'>
              {colors.map((color) => (
                <button
                  key={color.name}
                  type='button'
                  onClick={() => handleColorSelect(color.hex)}
                  className={`w-8 h-8 rounded-full ${color.bg} border-2 ${currentColor === color.hex ? 'border-slate-800 scale-125' : 'border-transparent'} transition-all flex items-center justify-center hover:scale-110`}
                >
                  {currentColor === color.hex && <HiCheck className='text-white text-[10px]' />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-6'>
          <div className='space-y-2'>
            <label className='text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] ml-2'>Nombre de Usuario</label>
            <TextInput 
              type='text' id='username' defaultValue={currentUser?.username} onChange={handleChange}
              className={inputStyles}
            />
          </div>
          
          <div className='space-y-2'>
            <label className='text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] ml-2'>Correo Electrónico</label>
            <TextInput 
              type='email' id='email' defaultValue={currentUser?.email} onChange={handleChange}
              className={inputStyles}
            />
          </div>

          <div className='space-y-2'>
            <label className='text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] ml-2'>Contraseña</label>
            <TextInput 
              type='password' id='password' placeholder='Nueva contraseña' onChange={handleChange}
              className={inputStyles}
            />
          </div>
        </div>

        <Button 
          type='submit' 
          disabled={loading || Object.keys(formData).length === 0}
          className='rounded-2xl bg-indigo-600 enabled:hover:bg-indigo-700 py-2.5 shadow-xl shadow-indigo-100'
        >
          <span className='font-black text-xs uppercase tracking-[0.2em] text-white'>
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </span>
        </Button>
      </form>

      {updateUserSuccess && <Alert color='success' className='mt-5 rounded-2xl font-bold'>{updateUserSuccess}</Alert>}
      {error && <Alert color='failure' className='mt-5 rounded-2xl font-bold'>{error}</Alert>}

      <div className='flex justify-between items-center mt-12 px-6'>
        <button type='button' className='text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-[0.2em] flex items-center gap-2 transition-colors'>
          <HiOutlineTrash className='text-lg' /> Borrar Cuenta
        </button>
        <button type='button' className='text-[10px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-[0.2em] flex items-center gap-2 transition-colors'>
          <HiOutlineLogout className='text-lg' /> Cerrar Sesión
        </button>
      </div>
    </div>
  );
}