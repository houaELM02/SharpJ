import React, { useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import Swal from 'sweetalert2';
import {  useNavigate,Link } from 'react-router-dom';
import NavbarA from '../pages/NavbarA';

const initialFieldValues = {
    entrepriseName: '',
    secteur: '',
    description:'',
    logoName: '',
    logoFile: null
}

const NewEntreprise = () => {
    
    const { user } = useAuthContext(); // user  is the token
    const [error, setError] = useState(null);
    const Navigate = useNavigate(); 

    const [values , setValues] = useState(initialFieldValues)
    
    const handleInputChange = (e) => {
        const {name , value} = e.target;
        setValues({
          ...values,
          [name]: value,
        });
        console.log(values);
      };
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataWithImage = new FormData();
    formDataWithImage.append('Name', values.entrepriseName);
    formDataWithImage.append('Secteur', values.secteur);
    formDataWithImage.append('Description', values.description);
    formDataWithImage.append('LogoName', values.logoName);
    formDataWithImage.append('LogoFile', values.logoFile);

    console.log(...formDataWithImage);
    try {
      var id = user.userId;
      const response = await axios.post(
        `http://localhost:5130/api/Entreprise/${id}`,
        formDataWithImage,
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      );
        Swal.fire({
        title: 'Entreprise Created!',
        icon: 'success',
        text: 'Votre Entreprise est crée en succée.',
      });
  
      console.log('Entreprise creation successful:', response);
      localStorage.setItem(
        'user',
        JSON.stringify({
          ...user
          //userName: response.data.profile.firstName,
          //logo: response.data.profile.image,
          
        })
      );
      //dispatch({ type: 'PROFILE_STATUS', payload: true });
     Navigate('/Dashboard');
     
      //window.location.reload();
    } catch (error) {
      console.log(...formDataWithImage); 
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: error.response ? error.response.data : 'An error occurred',
      });
      setError(error.response ? error.response.data : 'An error occurred');
    }
  };
    
  return (
    <>
        <div className="bg-purple-750 absolute top-0 left-0 bg-gradient-to-b  bottom-0 leading-5 h-full w-full overflow-hidden">
            <div className="relative h-4/5 sm:flex sm:flex-row flex justify-center bg-transparent rounded-none shadow-xl">
    		    <div className="flex justify-center self-center  z-10">
		    	    <form onSubmit={handleSubmit} className="p-6 bg-white min-h-full rounded-2xl w-full ">
		    		    <div className="mb-7 ">
		    			    <h3 className="font-semibold text-xl text-center mb-2 text-gray-800">Crée votre espace entreprise </h3>
		    		    </div>
				        <div className="space-y-4">
                        <div className=" relative flex justify-center self-center">
                            <label className=" px-2 text-sm font-semibold text-gray-800 flex justify-center self-center">Logo de l'entreprise</label>
						    <div className="flex items-center py-4">
							    
								<label className="cursor-pointer ">
                                <span className="focus:outline-none text-white font-semibold text-sm py-2 px-4 rounded-full bg-purple-609 hover:bg-purple- hover:shadow-lg">Importer</span>
                                <input  type='file'
                                        id='logo'
                                        name='logoName'
                                        onChange={e => setValues( {
                                            ...values,
                                            logoFile: e.target.files[0]
                                        })}
                                        accept='image/*' 
                                        className="hidden"
                                 
                                 />
                                </label>
							</div>
                        </div>
						
		    		        <div className=" relative flex justify-center self-center">
		    			    <input className=" w-72 text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-751" 
						    type='text' 
						    id ='entrepriseName'
                            name='entrepriseName'
                            onChange={handleInputChange}
                            value = {values.entrepriseName}
						    placeholder="Nom de l'entreprise"
						    />
                            </div>
                            <div className="relative flex justify-center self-center">
                            <input
                            type='text'  
						    id ='secteur'
                            name='secteur'
                            onChange={handleInputChange}
                            value ={ values.secteur}
						    placeholder="Secteur"
                            
                            className="text-sm px-4 py-3 rounded-lg w-72 bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-751"
                            />
                            </div>
                            <div className=" relative flex justify-center self-center">
		    			    <textarea required="" 
                            id='description'
                            name='description' 
                            onChange={handleInputChange}
                            value ={values.description}
                            className="text-sm  px-4 py-3 rounded-lg w-72 bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-751" 
                            placeholder="Description" 
                            spellCheck="false"></textarea>
									
                            </div>
					        <div className="w-full flex flex-row gap-2 ">
                            <button
                            className=" bg-purple-750  hover:bg-purple-751 text-gray-100  w-6/12  p-3 flex flex-row justify-center items-center gap-1 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
                            type="submit"
                            onClick={handleSubmit}
                            >
                                Créer
                            </button>
              
                            <Link
                            className=" bg-purple-750  hover:bg-purple-751 text-gray-100  w-6/12  p-3 flex flex-row justify-center items-center gap-1 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
                             to='/Accueil'>
                                Annuler
                            </Link>
					        	
					        </div>

                            
                        </div>
        		    </form>
                </div>    
            </div>
            <NavbarA/>
        </div>
    </>
  )
}

export default NewEntreprise;