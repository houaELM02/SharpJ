import React, { useState } from 'react'
import {Link } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";
import Swal from 'sweetalert2';
import axios from "axios";
import NavbarA from './NavbarA';

function Invite() {
    const { user } = useAuthContext();
    const [error, setError] = useState(null);
    const [email , setEmail] = useState('')
    
    const handleSubmit = async e => {
        e.preventDefault()
        
        
        console.log(email);
        
        setError('')
        try {
            var id = user.userId;
            
            const response = await axios.post(`http://localhost:5130/api/Employe/invite/${id}?email=${email}`,{} ,
            {
                headers: {
                  Authorization: `Bearer ${user}`,
                },
              });
            const { data } = response;
            console.log('Signup response:', data.message);

            
          Swal.fire({
            icon: 'success',
            title: 'Envoie de l invitation avec réussite',
            text: 'Votre invitation a été complétée avec succès !',
          });
        
        } 
        catch (error) {
            
            console.log('Invit error:', error.response?.data?.error || 'Failed to  invite');
            
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
        <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-700 h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <span className="text-2xl text-gray-700 font-bold hover:text-gray-600 mx-9 ">Rassembler les équipes</span>
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
                    type="submit" onClick={handleSubmit}>
                                Inviter
                    </button>
              
                    <Link
                    className=" bg-purple-750  hover:bg-purple-751 text-gray-100  w-6/12  p-3 flex flex-row justify-center items-center gap-1 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
                    to ='/Dashboard'>
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

export default Invite