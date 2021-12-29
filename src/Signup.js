import React, { useState } from "react"
import axios from "axios";
import { Link } from 'react-router-dom';


const Signup = ()=>{

    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[confirmpassword,setConfirmpassword] = useState("");
    const[message,setMessage] = useState(null);

    async function submitHandler(e){
        e.preventDefault();
        if(password !== confirmpassword){
            setMessage("Password do not match");
        }else {
            setMessage(null)

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };    

            const { data } = await axios.post(
                "/api/user/signup",
                { name,email, password },
                config
            );

            console.log(data)
            } catch (error) {
                console.log(error.message)
            }
        }
    }

    console.log(message)

    return(
        <>
            <h1>SIGNUP</h1>
            <form onSubmit = {submitHandler}>
                 <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label"> Name </label>
                    <input 
                        type="name" 
                        value = {name}
                        class="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        onChange = {(e) => setName(e.target.value)}
                        />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input 
                        type="email" 
                        value = {email}
                        class="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        onChange = {(e) => setEmail(e.target.value)}
                        />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input 
                        type="password" 
                        value = {password}
                        class="form-control" 
                        id="exampleInputPassword1"
                        onChange = {(e) => setPassword(e.target.value)} 
                    />
                </div>
                 <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                    <input 
                        type="password" 
                        value = {confirmpassword}
                        class="form-control" 
                        id="exampleInputPassword1" 
                        onChange = {(e) => setConfirmpassword(e.target.value)}
                    />
                </div>
            </form>

            <Link to = "/login">
                <button  class="btn btn-primary" >
                    LOGIN
                </button>
            </Link>
        </>
    )
}

export default Signup;