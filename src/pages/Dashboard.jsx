import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashProfile from '../components/DashProfile'; // Importa el que creamos arriba

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* Aquí podrías poner un Sidebar en el futuro */}
      
      {/* Contenido principal */}
      <div className='w-full'>
        {tab === 'profile' && <DashProfile />}
      </div>
    </div>
  );
}