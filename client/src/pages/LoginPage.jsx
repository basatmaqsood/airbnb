import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import Modal from "../components/PromptWindow";
import { UserContext } from "../context/UserContext";

function LoginPage() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const [showErrorPrompt, setShowErrorPropmpt] = useState(false);
  const {setUser} = useContext(UserContext);
  async function handleSubmit(e){
    e.preventDefault();
    try{
      const res = await axios.post('/login',{email,password})
      setUser(res.data);
      setRedirect(true);
    }catch(err){
      console.log(err);
      setShowErrorPropmpt(true);
    }
  }

  if(redirect){
    return <Navigate to='/'/>
  }


  return (
    <div className="mt-4 flex flex-col gap-2 justify-around grow items-center">
      <div className="mb-64 flex flex-col gap-3">
        <h1 className="text-4xl text-center">Login</h1>
        <form className="max-w-sm mx-auto" onSubmit={(e)=>{handleSubmit(e)}}>
          <input type="email" placeholder="your@email.com" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
          <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
          <button className="primary ">Login</button>
        </form>
          <div className="text-center text-gray-500">Don&apos;t have an account? <Link className="underline text-primary" to='/register'>Register Now!</Link></div>
      </div>
      {
        showErrorPrompt && <Modal message="There was an error while logging in. Check your Email and Passowrd and try again." setNavigation={false} setShowErrorPrompt={setShowErrorPropmpt}/>
      }
    </div>
  );
}

export default LoginPage;
