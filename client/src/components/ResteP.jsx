import React, {useState, useEffect} from 'react';
import NavbarA from '../pages/NavbarA';
import { useSearchParams , useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from "axios";

const initialFieldValues = {
    
    newPassword: '',
    confirmPassword:'',

}

function ResteP() {
    
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const Navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const mail = searchParams.get('email');
    const tok = searchParams.get('token');
    useEffect(() => {
        setEmail(mail);
        setToken(tok);
    }, []);
   
    const handleSubmit = async e => {
        e.preventDefault()
        
        
        setError('')
        
        if (newPassword !== confirmPassword) {
        setError('Les mots de passe ne correspondent pas');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Les mots de passe ne correspondent pas',
        });
        return;
        }
        
        try {
            const response = await axios.put('http://localhost:5130/api/Account/resetPassword',{email,token, newPassword, confirmPassword});
            const { data } = response;
            console.log('reset password response:', data.message);
            if (data.flag === false) {
                
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message,
                });
            }else{
            
            
          Swal.fire({
            icon: 'success',
            title: 'Modification du mot de passe',
            text: 'Votre mot de passe a été modifié avec succès ! Connectez-vous maintenant !',
          });
          
          Navigate('/Login')
        }
        
        } 
        catch (error) {
            
            console.log('rest password error:', error.response?.data?.error || 'Failed to reset password');
            
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
                <div 
                    className="relative h-4/5 sm:flex  sm:flex-col flex justify-center bg-transparent rounded-none shadow-xl">
                
                <div className="flex justify-center self-center  ">
                    <form  className="p-4 bg-white mx-28 rounded-2xl w-96 ">
                        <div className="flex flex-col items-center w-full py-3">
                            <svg fill="#374151" height="64px" width="64px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 472.615 472.615" xmlSpace="preserve" stroke="#374151">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                            <g id="SVGRepo_iconCarrier"> <g> <g> <path d="M0,49.231v157.538h472.615V49.231H0z M127.644,139.133l-9.846,17.058l-19.337-11.165v22.328H78.769v-22.328 l-19.337,11.165l-9.846-17.058l19.335-11.163l-19.335-11.164l9.846-17.058l19.337,11.166V88.586h19.692v22.328l19.337-11.166 l9.846,17.058L108.31,127.97L127.644,139.133z M226.106,139.133l-9.846,17.058l-19.337-11.165v22.328h-19.692v-22.328 l-19.337,11.165l-9.846-17.058l19.335-11.163l-19.335-11.164l9.846-17.058l19.337,11.166V88.586h19.692v22.328l19.337-11.166 l9.846,17.058l-19.335,11.164L226.106,139.133z M324.568,139.133l-9.846,17.058l-19.337-11.165v22.328h-19.692v-22.328 l-19.337,11.165l-9.846-17.058l19.335-11.163l-19.335-11.164l9.846-17.058l19.337,11.166V88.586h19.692v22.328l19.337-11.166 l9.846,17.058l-19.335,11.164L324.568,139.133z M423.029,139.133l-9.846,17.058l-19.337-11.165v22.328h-19.692v-22.328 l-19.337,11.165l-9.846-17.058l19.335-11.163l-19.335-11.164l9.846-17.058l19.337,11.166V88.586h19.692v22.328l19.337-11.166 l9.846,17.058l-19.335,11.164L423.029,139.133z"/> </g> </g> <g> <g> <path d="M384,315.051H204.486c-8.995-39.434-44.268-68.897-86.332-68.897c-48.837,0-88.615,39.679-88.615,88.615 c0,48.837,39.778,88.615,88.615,88.615c38.48,0,71.243-24.74,83.448-59.103h74.09l24.615,24.615l34.462-34.462l19.692,19.692H384 l29.538-29.538L384,315.051z M88.615,354.436c-10.876,0-19.692-8.817-19.692-19.692c0-10.876,8.816-19.692,19.692-19.692 c10.876,0,19.692,8.816,19.692,19.692C108.308,345.619,99.491,354.436,88.615,354.436z"/> </g> </g> </g>
                            </svg>
                            <span className="text-2xl text-gray-700 text-center font-bold hover:text-gray-600 mx-9 ">Réinitialiser votre mot de passe</span>
                            <span className="text-sm text-gray-700  hover:text-gray-600 mx-9 ">Entrez votre nouveau mot de passe.</span>
                        </div>
                        <div className="space-y-3">
                            <div className="relative flex justify-center self-center">
                            <input
                              type="password" 
                              id ='password'
                              placeholder="Nouveau mot de passe"
                              name='newPassword'
                              onChange={(e)=> setNewPassword(e.target.value)}
                              value={newPassword}
                              className=" w-72 text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-751"
                            />
                            </div>
                            <div className="relative flex justify-center self-center">
                            <input
                              type="password" 
                              id ='confirmPassword'
                              placeholder="Confirmer le mot de passe"
                              name='confirmPassword'
                              onChange={(e)=> setConfirmPassword(e.target.value)}
                              value={confirmPassword}
                              className=" w-72 text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-751"
                            />
                            </div>
                            <div className="flex justify-center">
                            <button type="submit" 
                            onClick={handleSubmit}
                            
                            className="w-72 flex justify-center bg-purple-750  hover:bg-purple-751 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500"
                            >Modifier
                            </button>
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

export default ResteP