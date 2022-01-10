import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import logo from '../assets/logo.png';
import { categories } from '../utils/data';

const isNotActiveStyle = 'flex items-center px-5 gap-3 p-2 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 p-2 font-extrabold bg-gray-100 border-r-4 border-black  transition-all duration-200 ease-in-out capitalize';

export default function Sidebar({toggleSidebar, user}) {
  const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-250 hide-scrollbar">
        <div className="flex flex-col">
          <Link
            to="/"
            className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
            onClick={()=>toggleSidebar(false)}
          >
            <img src={logo} alt="logo" className="w-full" />
          </Link>
          <div className="flex flex-col gap-5">
  
            <NavLink
              
              to="/"
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              onClick={()=>toggleSidebar(false)}
            >
              <RiHomeFill />
              Home
            </NavLink>
            <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover cateogries</h3>
            {categories.slice(0, categories.length - 1).map((category) => (
              <NavLink
              
                to={`/category/${category.name}`}
                className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
                onClick={()=>{toggleSidebar(false); navigate('/category/'+category.name)}}
                key={category.name}
              >
                <img src={category.image} className="w-8 h-8 rounded-full shadow-sm" />
                {category.name}
              </NavLink>
            ))}
          </div>
        </div>
        {user && (
          <Link
            to={`user-profile/${user._id}`}
            className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
            onClick={()=>toggleSidebar(false)}
          >
            <img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile" />
            <p>{user.username}</p>
            <IoIosArrowForward />
          </Link>
        )}
      </div>
    )
}
