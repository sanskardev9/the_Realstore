import React, { useState } from 'react'
import {auth} from '../firebase.config'
import {createUserWithEmailAndPassword} from 'firebase/auth'


const EmailLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    
    const signIn = async() => {
        try{
            await createUserWithEmailAndPassword(auth, email, password, name);
        }catch(e){
            console.error("Error",e)
        }
    };
    

  return (
    <div className='login-details text-center' style={{marginTop:'300px'}}>
        <input placeholder='Email' type='text' onChange={(e) =>{setEmail(e.target.value)}}/>
        <input placeholder='Password' type='password' onChange={(e) =>{(setPassword(e.target.value))}}/>
        <input placeholder='Name' type='text' onChange={(e) =>{(setName(e.target.value))}}/>
        <button onClick={signIn}>Login</button>
    </div>
  )
}

export default EmailLogin