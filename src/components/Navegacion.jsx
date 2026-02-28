import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown } from "flowbite-react";
import { signoutSuccess } from "../redux/user/userSlice";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const path = location.pathname;

  const { currentUser } = useSelector((state) => state.user || {});

  const initial = currentUser?.username ? currentUser.username.charAt(0).toUpperCase() : '?';
  const userColor = currentUser?.profileColor || '#4f46e5';

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate('/sign-in');
      }
    } catch (error) {
      console.log("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 px-4 sm:px-6 sticky top-0 z-50 w-full">
      <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
        
        {/* LOGO */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="flex items-center group z-50">
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-pink-500 to-indigo-600 bg-[length:200%_auto] transition-all duration-1000 ease-in-out group-hover:bg-[right_center]">
                BUYPEDIA
              </span>
            </span>
          </Link>
        </div>

        {/* NAVEGACIÓN ESCRITORIO */}
        <div className="hidden md:flex items-center gap-1 shrink-0">
          {[
            { name: "Home", href: "/" },
            { name: "Products", href: "/projects" },
            { name: "About", href: "/about" }
          ].map((link) => (
            <Link 
              key={link.name}
              to={link.href} 
              className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-all duration-500 ease-in-out overflow-hidden group/item ${
                path === link.href ? "text-white shadow-md shadow-indigo-100" : "text-slate-600 hover:text-indigo-600"
              }`}
            >
              <span className={`absolute inset-0 transition-opacity duration-500 bg-gradient-to-r from-indigo-500 to-purple-500 ${
                path === link.href ? "opacity-100" : "opacity-0 group-hover/item:opacity-10"
              }`}></span>
              <span className="relative z-10">{link.name}</span>
            </Link>
          ))}
        </div>

        {/* PARTE DERECHA: DARK MODE & USER */}
        <div className="flex-1 flex items-center justify-end gap-3 sm:gap-4">
          
          <button className="p-2 rounded-full transition-all duration-300 hover:bg-slate-100 text-slate-500">
            <FaMoon className="text-lg" />
          </button>

          {currentUser ? (
            <Dropdown
              inline
              label={
                /* AVATAR CON INDICADOR DE ADMIN */
                <div className="relative group">
                  <div 
                    style={{ backgroundColor: userColor }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md border-2 transition-all duration-300 cursor-pointer group-hover:scale-105 ${currentUser?.isAdmin ? 'border-cyan-400' : 'border-white'}`}
                  >
                    <span className="text-white font-black text-sm select-none">
                      {initial}
                    </span>
                  </div>
                  
                  {/* PUNTO DE PULSO SOLO PARA ADMINS */}
                  {currentUser?.isAdmin && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                    </span>
                  )}
                </div>
              }
            >
              <div className="px-4 py-3 text-sm text-gray-900 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="block font-bold truncate">@{currentUser?.username}</span>
                  {/* BADGE DE ADMIN EN EL MENÚ */}
                  {currentUser?.isAdmin && (
                    <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-[9px] text-white font-black px-1.5 py-0.5 rounded shadow-sm uppercase tracking-tighter">
                      Admin
                    </span>
                  )}
                </div>
                <span className="block truncate font-medium text-gray-500 text-xs">{currentUser?.email}</span>
              </div>

              <div 
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
                onClick={() => navigate('/dashboard?tab=profile')}
              >
                Mi Perfil
              </div>

              <div className="h-px bg-gray-100 my-1"></div>

              <div 
                className="px-4 py-2 text-sm text-red-600 font-bold hover:bg-red-50 cursor-pointer transition-colors"
                onClick={handleSignOut}
              >
                Cerrar Sesión
              </div>
            </Dropdown>
          ) : (
            <Link to="/sign-in" className="hidden md:inline-block px-8 py-2.5 text-sm font-bold text-white rounded-full bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 hover:shadow-lg transition-all">
              Sign In
            </Link>
          )}

          {/* MENÚ HAMBURGUESA MÓVIL */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 z-50"
          >
            {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      <div className={`md:hidden absolute top-0 left-0 w-full bg-white border-b shadow-xl transition-all duration-500 ease-in-out transform ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}>
        <div className="pt-20 pb-8 px-6 flex flex-col gap-4">
          {["Home", "Products", "About"].map((name) => (
            <Link 
              key={name}
              to={name === "Home" ? "/" : `/${name.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="text-lg font-semibold p-3 rounded-xl hover:bg-indigo-50 text-slate-600 text-center"
            >
              {name}
            </Link>
          ))}
          <hr className="border-gray-100" />
          
          {currentUser ? (
             <div 
               onClick={() => { navigate("/dashboard?tab=profile"); setIsOpen(false); }} 
               className="flex items-center justify-center gap-3 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-indigo-50 transition-colors"
             >
                <div className="relative">
                  <div 
                    style={{ backgroundColor: userColor }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${currentUser?.isAdmin ? 'border-2 border-cyan-400' : ''}`}
                  >
                    <span className="text-white font-black text-sm">{initial}</span>
                  </div>
                  {currentUser?.isAdmin && (
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-cyan-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800">@{currentUser?.username}</span>
                  {currentUser?.isAdmin && <span className="text-[10px] text-cyan-600 font-black uppercase">Administrator</span>}
                </div>
             </div>
          ) : (
            <Link to="/sign-in" onClick={() => setIsOpen(false)} className="w-full text-center py-4 text-white font-bold rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-500">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}