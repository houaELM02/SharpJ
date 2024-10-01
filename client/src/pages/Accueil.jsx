import React from 'react';
import { Link } from 'react-router-dom';
import NavbarA from './NavbarA';


function Accueil() {
    
    
  return (
    <>
    <div
	className="bg-purple-750 absolute top-0 left-0 bg-gradient-to-b  bottom-0 leading-5 h-full w-full overflow-hidden">
    <div 
        className=" relative h-4/5 sm:flex  sm:flex-col flex justify-center bg-transparent rounded-none shadow-xl">
        <div className="mb-9 relative  flex justify-center self-center ">
        <p className="text-3xl font-bold text-white"style={{backgroundColor:"transparent"}}>Sharpj team vous souhaite la bienvenue</p>
        </div>
        <div className="relative  flex justify-center self-center  w-4/5 px-10  my-4 py-6 bg-white rounded-lg">
            <div className="mt-1/2">
                <p className="text-2xl text-gray-700 font-bold hover:text-gray-600 mx-9 " style={{backgroundColor:"transparent"}} >Crée votre Espace Entreprise</p>
            </div>
            <div className="flex justify-center  ">
				<Link to='/NewEntreprise'  className="  w-72 flex justify-center bg-purple-750  hover:bg-purple-751 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500">
						Commencez
				</Link>
                
            </div>
        </div>
        
    </div>
    <NavbarA/>
    </div>

    
    
    </>
  )
}

export default Accueil