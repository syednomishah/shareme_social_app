import React, { useState, useEffect, useRef, createRef } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes} from 'react-router-dom';
import { client } from '../sanityClient';
import logo from '../assets/logo.png';
import { Sidebar, UserProfile  } from '../components';
import Pins from './Pins';
import { userQuery } from '../utils/data';
import { getUser } from '../utils/queries';

export default function Home() {

    const [sidebar, toggleSidebar] = useState(false); 
    const [user , setUser] = useState(null);
    const scrollRef = createRef(null);

    const userInfo = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

    useEffect(()=>{
        getUser(userInfo?.googleId).then(user=>{
            setUser(user);
        })
    },[]);

    useEffect(()=>{
        scrollRef.current.scrollTo(0,0);
    },[]);

    return (
        <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
           <div className="hidden md:flex h-screen flex-initial">
            <Sidebar user={user && user} />
           </div>
           <div className="flex md:hidden flex-row">
               <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
                    <HiMenu fontSize={40} className='cursor-pointer' onClick={()=>toggleSidebar(true)} />
                    <Link to="/">
                        <img src={logo} alt="logo" className="w-28" />
                    </Link>
                    <Link to={`user-profile/${user?._id}`}>
                        <img src={user?.image} alt="logo" className="w-16 rounded-full" />
                    </Link>
               </div>
               {
                    sidebar && (
                        <div className="fixed w-2/3 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
                            <div className="absolute w-full flex justify-end items-center p-2">
                                <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={()=>toggleSidebar(false)} />
                                </div>
                                <Sidebar user={user && user} toggleSidebar={toggleSidebar} />
                            </div>
                    )
                }
           </div>
           
           <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
                <Routes>
                    <Route path="/user-profile/:userId" element={<UserProfile />} />
                    <Route path="/*" element={<Pins user={user && user} />} />
                </Routes>
           </div>
        </div>
    )
}
