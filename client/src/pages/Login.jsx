import React , { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Link } from 'react-router-dom';
import NavbarA from './NavbarA';

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useLoginGoogle } from '../hooks/useLoginGoogle';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { Login, error} = useLogin()
    const { LoginGoogle, errorGoogle } = useLoginGoogle()
    
    const handleSubmit = async e => {
      e.preventDefault()
      await Login(email, password)
    }
    const handleSubmitGoogle = async (credentialResponse) => {
        const { credential } = credentialResponse;
        await LoginGoogle(credential)
    }
    /*const handleSubmitGoogle = async (credentialResponse) => {
        const { credential } = credentialResponse;
        console.log('Google token:', credential);
        try {
            const jsonPayload = JSON.stringify(credential);

        // Envoyer le token au serveur
        const response = await axios.post('http://localhost:5130/api/Account/loginwithGoogle', jsonPayload, {
            headers: {
                'Content-Type': 'application/json' // S'assurer que le serveur traite la requête comme du JSON
            }
        });
    
            console.log('Server response:', response.data);
            // Vous pouvez ici gérer la suite, par exemple rediriger l'utilisateur ou stocker les données de l'utilisateur connecté dans le contexte global/state.
        } catch (error) {
            console.error('Error sending Google token to backend:', error);
        }
    }*/
  
  return (
    <>
        <div
	        className="bg-purple-750 absolute top-0 left-0 bg-gradient-to-b  bottom-0 leading-5 h-full w-full overflow-hidden">
        
        
        <div 
        className="relative h-4/5 sm:flex sm:flex-row  justify-start bg-transparent rounded-none shadow-xl">
		    <div className=" flex flex-col self-center lg:px-55 px-10 sm:max-w-6xl xl:max-w-md  ">
	    	    <div className="self-start hidden lg:flex flex-col  text-gray-300">
	    		    <h1 className="my-3 font-semibold  text-6xl">SharpJ</h1>
                    <h2 className=" text-2xl">Avec SharpJ, communiquez, collaborez et planifiez!</h2>	
	    	    </div>
	        </div>
            <div className="flex justify-center self-center  ">
                <form onSubmit={handleSubmit} className="p-4 bg-white mx-28 rounded-2xl w-96 ">
                    <div className="mb-7 " >
		    		    <h3 className=" font-semibold text-xl mb-2 px-4 text-gray-800">Se connecter </h3>
		    		    <p className="text-gray-400 text-sm px-4 "style={{backgroundColor:"transparent"}} >Vous n’avez pas de compte ?  
                        <Link to="/Signup"
		    				className="text-sm text-purple-750 hover:text-purple-751" style={{backgroundColor:"transparent"}}> Inscrivez-vous
                        </Link></p>
		    	    </div>
                    <div className="space-y-4">
                        <div className=" relative flex justify-center self-center">
		    			<input className=" w-72 text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-751" 
						type='email' 
						id ='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
						placeholder="Email"
						/>
                        </div>

                        <div className="relative flex justify-center self-center">
                        <input
                          type="password" 
						  id ='password'
						  placeholder="Mot de passe"
						  onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          
                          className="text-sm px-4 py-3 rounded-lg w-72 bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-751"
                        />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm ml-9">
							    <Link to="/ForgetPassword" className="text-purple-750 hover:text-purple-751">
								Mot de passe oublié ?

							    </Link>
						    </div>
					    </div>
                        <div className="flex justify-center">
						<button type="submit" 
                        onClick={handleSubmit}
                        
                        className="w-72 flex justify-center bg-purple-750  hover:bg-purple-751 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
						>Se connecter
                        </button>
                        {error && <div className="text-red-500 mt-4">{error}</div>}
                        </div>
                        
                        <div className="flex items-center justify-center space-x-2 my-5">
						<span className="h-px w-16 bg-gray-100"></span>
						<span className="text-gray-300 font-normal">or</span>
						<span className="h-px w-16 bg-gray-100"></span>
					</div>
					<div className=" flex justify-center ">
                    <GoogleLogin
                            onSuccess={handleSubmitGoogle}
                            onError={()=> {
                            console.log('Login Failed');
                            }}
                    />
                    
					</div>
                </div>
                
        		<div className="mt-7 text-center text-gray-300 text-xs">
					<span> Sharpj 1.0 2023-2024</span>
				</div>
                   
                </form>
            </div>
        </div>
        
	    
        <NavbarA/>
            </div>
    </>
  )
}

export default Login