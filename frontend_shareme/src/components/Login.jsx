import React from 'react'
import shareVideo from '../assets/share.mp4';
import logowhite from '../assets/logowhite.png';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { FcGoogle } from "react-icons/fc";
import { client } from '../sanityClient';
export default function Login() {

    const navigate = useNavigate();

    const onSuccessResponseGoogle = res=>{
        console.log('got response: ',res);
        localStorage.setItem('user', JSON.stringify(res.profileObj));
        let { name, imageUrl, googleId } = res.profileObj;
        const doc = {
            _id: googleId,
            _type: 'user',
            username: name,
            image: imageUrl
        }
        client.createIfNotExists(doc).then(()=>{
            console.log('user created');
            navigate('/', {replace: true})
        })
    }

    const onResponseFail = res=>{
        console.log('response failed: ',res);
    }
    return (
        <div className="flex justify-center items-center flex-col h-screen">
            <div className="relative h-full w-full">
                <video 
                    className='h-full w-full object-cover'
                    src={shareVideo}
                    type="video/mp4"
                    controls={false}
                    loop
                    muted
                    autoPlay
                />
                <div className="absolute flex flex-col justify-center items-center bg-blackOverlay top-0 bottom-0 right-0 left-0">
                    <div className="p-5">
                        <img width="140px" src={logowhite}  alt="logo"/>
                    </div>
                    <div className="shadow-2xl">
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                            render={renderProps => (
                                <button 
                                    onClick={renderProps.onClick} 
                                    disabled={renderProps.disabled}
                                    className="bg-mainColor flex justify-center items-center p-2 rounded-lg cursor-pointer"
                                >
                                   <FcGoogle className="mr-4"/> Sign in with Google
                                </button>
                            )}
                            buttonText="Login with Google"
                            onSuccess={onSuccessResponseGoogle}
                            onFailure={onResponseFail}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
