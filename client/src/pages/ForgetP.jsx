import React, { useState } from 'react'
import {Link } from 'react-router-dom';
import NavbarA from './NavbarA';
import Swal from 'sweetalert2';
import axios from "axios";

function ForgetP() {
    
    const [email , setEmail] = useState('');
    const [error, setError] = useState(null);
    const handleSubmit = async e => {
        e.preventDefault()
        
        
        console.log(email);
        
        setError('')
        try {
            
            
            const response = await axios.post(`http://localhost:5130/api/Account/forgotPassword/${email}`,{});
            const { data } = response;
            console.log('Forget Password response:', data.message);

            
          Swal.fire({
            icon: 'success',
            title: 'Envoie de l email avec réussite',
            text: 'Votre demande a été complétée avec succès !',
          });
        
        } 
        catch (error) {
            
            console.log('Forget error:', error.response?.data?.error || 'Failed to  invite');
            
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
              });
            }
      
    };
  return (
    <>
    <div
	className="bg-purple-750 absolute top-0 left-0 bg-gradient-to-b  bottom-0 leading-5 h-full w-full overflow-hidden">
    
	
        
    <div className="relative h-4/5 sm:flex  sm:flex-col flex justify-center bg-transparent rounded-none shadow-xl ">
    <form onSubmit={handleSubmit} className="container md:mx-auto h-auto w-3/5 bg-white py-9 px-12 rounded-xl shadow-md">
    <div className="flex flex-col items-center w-full">
    <svg fill="#374151" height="64px" width="64px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xmlSpace="preserve" stroke="#374151">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
    <g id="SVGRepo_tracerCarrier"strokeLinecap="round" strokeLinejoin="round"/>
    <g id="SVGRepo_iconCarrier"> <g id="XMLID_509_"> <path id="XMLID_510_" d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85 S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15 s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25 C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z"/> </g> </g>
    </svg>
    <span className="text-2xl text-gray-700 font-bold hover:text-gray-600 mx-9 ">Problèmes de connexion ?</span>
    <span className="text-sm text-gray-700  hover:text-gray-600 mx-9 ">Entrez votre adresse e-mail et nous vous enverrons un lien pour récupérer votre compte.</span>
        
        <div className=" relative flex flex-row justify-center self-center mt-4">
		    <input className=" w-72 text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-751 mx-4" 
			type='email' 
			id ='email'
            name='email'
            onChange={e => setEmail(e.target.value)}
			placeholder="Email"
			/>
                  
            <div className="w-1/2 flex flex-row gap-2 ">
                <button
                    className=" bg-purple-750  hover:bg-purple-751 text-gray-100  w-6/12  p-3 flex flex-row justify-center items-center gap-1 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
                    type="submit" onClick={handleSubmit}> Envoyer
                </button>
              
                    <Link
                    className=" bg-purple-750  hover:bg-purple-751 text-gray-100  w-6/12  p-3 flex flex-row justify-center items-center gap-1 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
                    to ='/'>
                    Annuler
                    </Link>
					        	
			</div> 
        </div> 
        </div>
        </form>
    </div>
    <NavbarA/>
    </div>

    </>
  )
}

export default ForgetP