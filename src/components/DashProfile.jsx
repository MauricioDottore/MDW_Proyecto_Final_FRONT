import { Button, TextInput, Alert, Modal } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { HiOutlineLogout, HiOutlineTrash, HiCheck, HiOutlineExclamationCircle } from 'react-icons/hi';
import { 
  updateStart, updateSuccess, updateFailure,
  deleteUserStart, deleteUserSuccess, deleteUserFailure,
  signoutSuccess
} from '../redux/user/userSlice';

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user || {});
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  
  // ESTADOS PARA MODALES
  const [showModal, setShowModal] = useState(false); // Modal eliminar
  const [showSignoutModal, setShowSignoutModal] = useState(false); // Modal cerrar sesión
  
  const dispatch = useDispatch();

  const colors = [
    { name: 'Indigo', bg: 'bg-indigo-600', hex: '#4f46e5' },
    { name: 'Emerald', bg: 'bg-emerald-500', hex: '#10b981' },
    { name: 'Rose', bg: 'bg-rose-500', hex: '#f43f5e' },
    { name: 'Amber', bg: 'bg-amber-400', hex: '#fbbf24' },
    { name: 'Sky', bg: 'bg-sky-500', hex: '#0ea5e9' },
    { name: 'Slate', bg: 'bg-slate-700', hex: '#334155' },
  ];

  // Lógica de colores dinámicos
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

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignout = async () => {
    setShowSignoutModal(false);
    try {
      const res = await fetch('/api/user/signout', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const inputStyles = '[&_input]:py-4 [&_input]:px-6 [&_input]:rounded-2xl [&_input]:border-none [&_input]:bg-slate-50 [&_input]:text-slate-900 [&_input]:font-bold focus:[&_input]:ring-2 focus:[&_input]:ring-indigo-500';

  return (
    <div className='max-w-xl mx-auto p-4 w-full min-h-screen mb-10'>
      <div className='text-center my-10'>
        <h1 className='text-4xl font-black tracking-tight text-slate-800 mb-2'>
          Ajustes de <span style={{ color: currentColor }}>Perfil</span>
        </h1>
        <p className='text-slate-400 text-sm font-semibold uppercase tracking-widest'>Personalización sin imágenes</p>
      </div>

      <form onSubmit={handleSubmit} className='flex flex-col gap-8 bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-2xl shadow-indigo-100/40'>
        <div className='flex flex-col items-center gap-6'>
          <div className={`w-40 h-40 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 ring-[12px] ring-slate-50 ${currentBgClass}`}>
            <span className='text-7xl font-black text-white select-none'>{initial}</span>
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
            <label className='text-[10px] font-black uppercase tracking-[0.3em] ml-2' style={{ color: currentColor }}>Nombre de Usuario</label>
            <TextInput type='text' id='username' defaultValue={currentUser?.username} onChange={handleChange} className={inputStyles} />
          </div>
          <div className='space-y-2'>
            <label className='text-[10px] font-black uppercase tracking-[0.3em] ml-2' style={{ color: currentColor }}>Correo Electrónico</label>
            <TextInput type='email' id='email' defaultValue={currentUser?.email} onChange={handleChange} className={inputStyles} />
          </div>
          <div className='space-y-2'>
            <label className='text-[10px] font-black uppercase tracking-[0.3em] ml-2' style={{ color: currentColor }}>Contraseña</label>
            <TextInput type='password' id='password' placeholder='Nueva contraseña' onChange={handleChange} className={inputStyles} />
          </div>
        </div>

        <Button 
          type='submit' 
          disabled={loading || Object.keys(formData).length === 0} 
          style={{ backgroundColor: currentColor }}
          className='rounded-2xl enabled:hover:opacity-90 py-2.5 shadow-xl transition-all border-none'
        >
          <span className='font-black text-xs uppercase tracking-[0.2em] text-white'>
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </span>
        </Button>
      </form>

      {updateUserSuccess && <Alert color='success' className='mt-5 rounded-2xl font-bold'>{updateUserSuccess}</Alert>}
      {error && <Alert color='failure' className='mt-5 rounded-2xl font-bold'>{error}</Alert>}

      <div className='flex justify-between items-center mt-12 px-6'>
        <button 
          onClick={() => setShowModal(true)} 
          type='button' 
          className='text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-[0.2em] flex items-center gap-2 transition-colors'
        >
          <HiOutlineTrash className='text-lg' /> Borrar Cuenta
        </button>

        <button 
          onClick={() => setShowSignoutModal(true)} 
          type='button' 
          className='text-[10px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-[0.2em] flex items-center gap-2 transition-colors'
        >
          <HiOutlineLogout className='text-lg' /> Cerrar Sesión
        </button>
      </div>

      {/* MODAL ELIMINAR CUENTA */}
      <Modal show={showModal} onClose={() => setShowModal(false)} size='md' popup>
        <div className='relative bg-white rounded-3xl shadow-xl p-8'>
          <button onClick={() => setShowModal(false)} className='absolute top-4 right-4 text-slate-400 hover:text-slate-600'>✕</button>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 text-red-500 h-16 w-16' />
            <h3 className='mb-4 text-xl font-black text-slate-800 uppercase tracking-tight'>¿Eliminar cuenta?</h3>
            <p className='mb-8 text-slate-500 font-medium'>Esta acción es permanente. Perderás todos tus datos.</p>
            <div className='flex flex-col gap-3'>
              {/* Botón de Acción Peligrosa */}
              <Button color='failure' onClick={handleDeleteUser} className='rounded-xl py-2 font-bold uppercase tracking-widest'>
                Sí, eliminar definitivamente
              </Button>
              {/* Botón de Cancelar Corregido */}
              <button 
                onClick={() => setShowModal(false)} 
                className='rounded-xl py-3 font-bold uppercase tracking-widest bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors text-sm'
              >
                No, mantener cuenta
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* MODAL CERRAR SESIÓN */}
      <Modal show={showSignoutModal} onClose={() => setShowSignoutModal(false)} size='md' popup>
        <div className='relative bg-white rounded-3xl shadow-xl p-8'>
          <button onClick={() => setShowSignoutModal(false)} className='absolute top-4 right-4 text-slate-400 hover:text-slate-600'>✕</button>
          <div className='text-center'>
            <HiOutlineLogout className='mx-auto mb-4 h-16 w-16' style={{ color: currentColor }} />
            <h3 className='mb-4 text-xl font-black text-slate-800 uppercase tracking-tight'>¿Cerrar sesión?</h3>
            <p className='mb-8 text-slate-500 font-medium'>Tendrás que volver a ingresar tus credenciales para acceder.</p>
            <div className='flex flex-col gap-3'>
              {/* Botón de Confirmar con tu color dinámico */}
              <Button 
                onClick={handleSignout} 
                style={{ backgroundColor: currentColor }} 
                className='rounded-xl py-2 font-bold uppercase tracking-widest border-none'
              >
                Sí, cerrar sesión
              </Button>
              {/* Botón de Cancelar Corregido */}
              <button 
                onClick={() => setShowSignoutModal(false)} 
                className='rounded-xl py-3 font-bold uppercase tracking-widest bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors text-sm'
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}