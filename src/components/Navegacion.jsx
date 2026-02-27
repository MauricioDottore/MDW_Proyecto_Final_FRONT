import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Avatar, Dropdown, Tooltip, Button, TextInput } from "flowbite-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  // Obtenemos el usuario actual desde el estado global de Redux
  const user = useSelector((state) => state.user.currentUser);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 px-4 sm:px-6 sticky top-0 z-50 w-full">
      <div className="flex justify-between items-center w-full">
        
        {/* PARTE 1: Lado Izquierdo - Logo */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="flex items-center group z-50">
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-pink-500 to-indigo-600 bg-[length:200%_auto] transition-all duration-1000 ease-in-out group-hover:bg-[right_center]">
                BUYPEDIA
              </span>
            </span>
          </Link>
        </div>

        {/* PARTE 2: Centro - Navegación de escritorio */}
        <div className="hidden md:flex items-center gap-1 shrink-0">
          {[
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
            { name: "Products", href: "/projects" }
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

        {/* PARTE 3: Derecha - Buscador, Modo Oscuro y Usuario */}
        <div className="flex-1 flex items-center justify-end gap-3 sm:gap-4">
          
          {/* Buscador */}
          <div className="hidden lg:flex items-center bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full group focus-within:border-indigo-200 transition-all">
            <AiOutlineSearch className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-32 outline-none ml-2"
            />
          </div>

          {/* Botón Modo Oscuro */}
          <button className="p-2 rounded-full group transition-all duration-300 hover:bg-slate-100">
            <FaMoon className="text-lg text-slate-500 transition-all duration-500 group-hover:rotate-[360deg] group-hover:text-yellow-400" />
          </button>

          {/* Lógica Condicional del Usuario */}
          {user ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Tooltip 
                  content={`@${user.username} - ${user.email}`} 
                  placement="bottom"
                >
                  <Avatar 
                    alt="user" 
                    img={user.profilePicture} 
                    rounded   
                  />
                  
                  
                </Tooltip>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm font-bold truncate">@{user.username}</span>
                <span className="block text-sm font-medium truncate text-gray-500">{user.email}</span>
              </Dropdown.Header>
              <Link to={'/dashboard?tab=profile'}>
                <Dropdown.Item>Perfil</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item className="text-red-500 font-semibold">
                Cerrar Sesión
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <Link 
              to="/sign-in" 
              className="hidden md:inline-block relative px-8 py-2.5 text-sm font-bold text-white transition-all duration-700 rounded-full bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-[length:200%_auto] hover:bg-[right_center] shadow-md hover:shadow-indigo-200 active:scale-95"
            >
              Sign In
            </Link>
          )}

          {/* Botón Menú Móvil */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-all z-50"
          >
            {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      <div className={`md:hidden absolute top-0 left-0 w-full bg-white border-b shadow-xl transition-all duration-500 ease-in-out transform ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}>
        <div className="pt-20 pb-8 px-6 flex flex-col gap-4">
          {[
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
            { name: "Products", href: "/projects" }
          ].map((link) => (
            <Link 
              key={link.name}
              to={link.href} 
              onClick={() => setIsOpen(false)}
              className={`text-lg font-semibold p-3 rounded-xl transition-all ${
                path === link.href ? "bg-indigo-50 text-indigo-600" : "text-slate-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-gray-100" />
          
          {user ? (
             <Link to="/dashboard?tab=profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl">
                <img src={user.profilePicture} alt="user" className="w-10 h-10 rounded-full object-cover" />
                <span className="font-bold text-indigo-700">{user.username}</span>
             </Link>
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