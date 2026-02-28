import { Button, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { useState } from 'react'; // Necesario para la previsualización
import { HiOutlineCamera, HiOutlineLogout, HiOutlineTrash } from 'react-icons/hi';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user || {});
  
  // Agregamos este estado para que imageFileUrl no de error de "not defined"
  const [imageFileUrl, setImageFileUrl] = useState(null);

  return (
    <div className='max-w-xl mx-auto p-4 w-full min-h-screen mb-10'>
      <div className='text-center my-10'>
        <h1 className='text-4xl font-black tracking-tight text-slate-800 mb-2'>
          Ajustes de <span className='text-indigo-600'>Perfil</span>
        </h1>
        <p className='text-slate-400 text-sm font-semibold uppercase tracking-widest'>Configuración de cuenta</p>
      </div>

      <form className='flex flex-col gap-8 bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-2xl shadow-indigo-100/40'>
        
        <div className='relative w-44 h-44 self-center'>
          <div className='w-full h-full rounded-full ring-[12px] ring-slate-50 overflow-hidden shadow-2xl bg-slate-100'>
            <img
              // Si imageFileUrl es null, usa la foto de currentUser
              src={imageFileUrl || currentUser?.profilePicture}
              alt='user'
              className='w-full h-full object-cover'
            />
          </div>
          <label className='absolute bottom-2 right-2 bg-indigo-600 p-3.5 rounded-full text-white shadow-xl cursor-pointer hover:bg-indigo-700 transition-all border-4 border-white active:scale-90'>
            <HiOutlineCamera className='text-xl' />
            <input type='file' hidden accept='image/*' />
          </label>
        </div>

        <div className='flex flex-col gap-6'>
          <div className='space-y-2'>
            <label className='text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] ml-2'>Nombre de Usuario</label>
            <TextInput 
              type='text' id='username' placeholder='Ej: peterparker' defaultValue={currentUser?.username} 
              className='[&_input]:py-4 [&_input]:px-6 [&_input]:rounded-2xl [&_input]:border-none [&_input]:bg-slate-50 [&_input]:text-slate-700 [&_input]:font-bold focus:[&_input]:ring-2 focus:[&_input]:ring-indigo-500'
            />
          </div>
          
          <div className='space-y-2'>
            <label className='text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] ml-2'>Correo Electrónico</label>
            <TextInput 
              type='email' id='email' placeholder='tu@email.com' defaultValue={currentUser?.email} 
              className='[&_input]:py-4 [&_input]:px-6 [&_input]:rounded-2xl [&_input]:border-none [&_input]:bg-slate-50 [&_input]:text-slate-700 [&_input]:font-bold focus:[&_input]:ring-2 focus:[&_input]:ring-indigo-500'
            />
          </div>

          <div className='space-y-2'>
            <label className='text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] ml-2'>Contraseña</label>
            <TextInput 
              type='password' id='password' placeholder='••••••••••••' 
              className='[&_input]:py-4 [&_input]:px-6 [&_input]:rounded-2xl [&_input]:border-none [&_input]:bg-slate-50 [&_input]:text-slate-700 [&_input]:font-bold focus:[&_input]:ring-2 focus:[&_input]:ring-indigo-500'
            />
          </div>
        </div>

        <Button type='submit' className='rounded-2xl bg-indigo-600 enabled:hover:bg-indigo-700 py-2.5 shadow-xl shadow-indigo-100'>
          <span className='font-black text-xs uppercase tracking-[0.2em] text-white'>Guardar Cambios</span>
        </Button>
      </form>

      <div className='flex justify-between items-center mt-12 px-6'>
        <button className='text-[10px] font-black text-slate-400 hover:text-red-500 uppercase tracking-[0.2em] transition-colors flex items-center gap-2'>
          <HiOutlineTrash className='text-lg' /> Borrar Cuenta
        </button>
        <button className='text-[10px] font-black text-slate-400 hover:text-indigo-600 uppercase tracking-[0.2em] transition-colors flex items-center gap-2'>
          <HiOutlineLogout className='text-lg' /> Cerrar Sesión
        </button>
      </div>
    </div>
  );
}