import React, {useState, useEffect} from 'react'
import { useSearchParams , useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from "axios";
import NavbarA from '../pages/NavbarA';

const initialFieldValues = {
    firstName: '',
    lastName: '',
    
    password: '',
    confirmPassword:'',
    fonctionnalite: '',
    imageName: '',
    imageFile: null
}

function Employe() {
    const [entrepriseName, setEntrepriseName] = useState('');
    const [entrepriseId, setEntrepriseId] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const Navigate = useNavigate();
    const [values , setValues] = useState(initialFieldValues)
    const [searchParams] = useSearchParams();
    const mail = searchParams.get('email');


    useEffect(() => {
      setEmail(mail);
    }, []);
    const handleInputChange = (e) => {
        const {name , value} = e.target;
        setValues({
          ...values,
          [name]: value,
        });
        console.log(values);
      };
      useEffect(() => {
        const FetchentrepriseName = async () => {
          try {
            const id = searchParams.get('entreprise');
            setEntrepriseId(id);
    
            const response = await axios.get(`http://localhost:5130/api/Entreprise/${id}`);
    
            const  name  = response.data;
            console.log('hal entreprise ban '+name)
            setEntrepriseName(name); 
          } catch (error) {
            console.error('Error fetching entreprise details:', error);
          }
        };
       
          
        FetchentrepriseName();
      }, [searchParams]);
      

      const handleSubmit = async e => {
        e.preventDefault()
        
        const formDataWithImage = new FormData();
        formDataWithImage.append('lastName', values.lastName);
        formDataWithImage.append('firstName', values.firstName);
        formDataWithImage.append('email', email);
        formDataWithImage.append('password', values.password);
        formDataWithImage.append('confirmPassword', values.confirmPassword);
        formDataWithImage.append('fonctionnalite', values.fonctionnalite);
        formDataWithImage.append('imageName', values.imageName);
        formDataWithImage.append('imageFile', values.imageFile);
        formDataWithImage.append('entrepriseId',entrepriseId );
    
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
            const response = await axios.post('http://localhost:5130/api/Employe/registerEmploye',
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
    className="relative sm:flex sm:flex-row  py-11 justify-center  bg-tranparent rounded-none shadow-xl">
        
        <div className="flex justify-center self-center  ">
            <form onSubmit={handleSubmit}  className="p-4 bg-white mx-28 rounded-2xl w-auto  ">
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
								<input placeholder="Nom" 
                                className="  w-36  text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-751"
                                 required="required" 
                                 type="text" 
                                 name="lastName" 
                                 id="lastName"
                                 onChange={handleInputChange}
                                value={values.lastName}/>
								
							</div>
							<div className=" text-xs">
								<input placeholder="Prénom" 
                                required="required" type="text" 
                                name="firstName" id="firstName"
                                onChange={handleInputChange}
                                value={values.firstName}
                                className=" w-36 text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-751"/>
								
							</div>
						</div>


                    <div className="relative flex justify-center self-center">
                    <input className=" w-72 text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-751" 
                    type='email' 
                    id ='email'
                    name='email'
                    readOnly
                    value={email}
                    placeholder="Email"
                    />
                    </div>
                    <div className=" relative flex justify-center self-center">
                    <input className=" w-72 text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-751" 
                    type='password' 
                    id ='password'
                    name='password'
                    onChange={handleInputChange}
                     value={values.password}
                    placeholder="Mot de passe"
                    />
                    </div>

                    <div className="relative flex justify-center self-center">
                    <input
                      type="password" 
                      id ='confirmPassword'
                      placeholder="Confirmer le mot de passe "
                      name='confirmPassword'
                      onChange={handleInputChange}
                    value={values.confirmPassword}
                      className="w-72 text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-751"
                    />
                    </div>
                    <div className="  md:flex flex-row  md:space-x-1 ">
							<div className="  text-xs">
								<input placeholder="Entreprise" className="  w-36  text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-751" 
                                required="required" 
                                value={entrepriseName} 
                                readOnly type="text" 
                                name="entrepriseName" id="entreprise"/>
								
							</div>
							<div className=" text-xs">
								<input placeholder="Poste"
                                required="required" 
                                type="text" name="fonctionnalite" 
                                id="fonctionnalite"
                                onChange={handleInputChange}
                                value={values.fonctionnalite}
                                className=" w-36 text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-751"
                            />
								
							</div>
						</div>
                    
                    <div className="flex justify-center">
                    <button onClick={handleSubmit} type="submit" className="w-72 flex justify-center bg-purple-750  hover:bg-purple-751 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                    >S'inscrire</button>
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

export default Employe