import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from "axios";
import NavbarA from '../pages/NavbarA';


const initialFieldValues = {
    firstName: '',
    lastName: '',
    email:'',
    password: '',
    confirmPassword:'',
    imageName: '',
    imageFile: null
}

function Signup() {
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

    const handleSubmit = async e => {
        e.preventDefault()
        
        const formDataWithImage = new FormData();
        formDataWithImage.append('lastName', values.lastName);
        formDataWithImage.append('firstName', values.firstName);
        formDataWithImage.append('email', values.email);
        formDataWithImage.append('password', values.password);
        formDataWithImage.append('confirmPassword', values.confirmPassword);
        formDataWithImage.append('imageName', values.imageName);
        formDataWithImage.append('imageFile', values.imageFile);
    
        console.log(...formDataWithImage);
        setError('')
        console.log(values.imageFile)
        if (values.password !== values.confirmPassword) {
        setError('Les mots de passe ne correspondent pas');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Les mots de passe ne correspondent pas',
        });
        return;
        }
        
        try {
            const response = await axios.post('http://localhost:5130/api/Account/register',
            formDataWithImage);
            const { data } = response;
            console.log('Signup response:', data.message);

            
          Swal.fire({
            icon: 'success',
            title: 'Inscription avec réussite',
            text: 'Votre inscription a été complétée avec succès ! Connectez-vous maintenant !',
          });
          
          Navigate('/Login')
        
        } 
        catch (error) {
            
            console.log('Signup error:', error.response?.data?.error || 'Failed to sign up');
            
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

</div>
<div 
className="relative sm:flex sm:flex-row  py-7 justify-center  bg-tranparent rounded-none shadow-xl">
    
    <div className="flex justify-center self-center  ">
        <form onSubmit={handleSubmit} className="p-4 bg-white mx-28 rounded-2xl w-auto ">
            <div className="mb-2 ">
                    <h3 className="font-semibold text-xl text-center mb-2 text-gray-800">Bienvenue chez SharpJ </h3>
            </div>
            
            <div className="space-y-3">
                <div className=" relative flex justify-center self-center">
                        <label className=" px-2 text-sm font-semibold text-gray-800 flex justify-center self-center">Importer votre image</label>
                        <div className="flex items-center py-4">
                            
                            <label className="cursor-pointer ">
                            <span className="focus:outline-none text-white font-semibold text-sm py-2 px-4 rounded-full bg-purple-609 hover:bg-purple- hover:shadow-lg">Importer</span>
                            <input type="file" 
                            id='imageName'
                            name ='imageName'
                            onChange={e => setValues( {
                                ...values,
                                imageFile: e.target.files[0]
                            })}
                            accept='image/*' 
                            className="hidden"
                            />
                            </label>
                        </div>
                    </div>
                    <div className="  md:flex flex-row  md:space-x-1 ">
                        <div className="  text-xs">
                            <input placeholder="Nom" className="w-36  text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-751" 
                            required={true} 
                            type="text" 
                            name="lastName" 
                            id="lastName"
                            onChange={handleInputChange}
                            value={values.lastName}/>
                            
                        </div>
                        <div className=" text-xs">
                            <input placeholder="Prénom" className=" w-36 text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-751"
                            required={true} 
                            type="text" 
                            name="firstName" 
                            id="firstName"
                            onChange={handleInputChange}
                            value={values.firstName}/>
                            
                        </div>
                    </div>


                <div className="relative flex justify-center self-center">
                <input className=" w-72 text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-751" 
                type='email' 
                name="email"
                id ='email'
                placeholder="Email"
                onChange={handleInputChange}
                value ={values.email}
                />
                </div>
                <div className=" relative flex justify-center self-center">
                <input className=" w-72 text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-751" 
                type='password'
                name="password" 
                id ='password'
                placeholder="Mot de passe"
                onChange={handleInputChange}
                value ={values.password}

                />
                </div>

                <div className="relative flex justify-center self-center">
                <input
                className="text-sm  px-4 py-3 rounded-lg w-72 bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-751"
                  type="password" 
                  name="confirmPassword" 
                  id ='confirmpassword'
                  placeholder="Confirmer le mot de passe "
                  onChange={handleInputChange}
                  value ={values.confirmPassword}
                  />
                </div>

                
                <div className="flex justify-center">
                <button type="submit"
                onClick={handleSubmit}
                
                className="w-72 flex justify-center bg-purple-750  hover:bg-purple-751 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                >S'inscrire</button>
                {error && (
                <div className="text-red-500 mt-4">
                {error ? error : "An error occurred"}
                </div>)} 
                </div>
                <div className="flex items-center justify-center space-x-2 my-5">
                <span className="h-px w-16 bg-gray-100"></span>
                <span className="text-gray-300 font-normal">ou</span>
                <span className="h-px w-16 bg-gray-100"></span>
            </div>
            <div className=" flex justify-center  ">
                <button type="submit" className="w-72 flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hoverborder-purple-400 hover:border-purple-750 text-sm text-gray-500 p-3  rounded-lg tracking-wide font-medium  cursor-pointer transition ease-in duration-500">
                <svg  className="w-4 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/>
                  <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"/>
                  <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"/>
                  <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/>
                </svg>
                <span>S'inscrire avec Google</span>
                 </button>
            </div>
        </div>
        <div className="mt-4 text-center text-gray-300 text-xs">
            <span> Sharpj 1.0 2023-2024</span>
        </div>
           
        </form>
    </div>
</div>



    <NavbarA/>
    
</>
  )
}

export default Signup