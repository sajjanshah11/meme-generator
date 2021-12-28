import React,{ useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"

const Login = () =>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const[loading,setLoading]  = useState()

    async function submitHandler(e){
        e.preventDefault();
        try {
            const config = {
                headers:{
                    "Content-type" : "application/json"
                }
            }       
            const { data } = await axios.get('http://localhost:4000/api/user/login',{
                // headers:{
                //     "email":"krishna1@gmail.com",
                //     "password":"12345",
                //     "Content-type" : "application/json"
                // }
            })
            console.log(data)
            
        } catch (error) {
            console.log(error.message)
            setError(error.response.data.message)
        }
    }
    console.log(error)
    return(
        <> 
            <h1>LOGIN</h1>
             <form onSubmit = {submitHandler}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input 
                        type="email" 
                        value = {email}
                        class="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        onChange = {(e)=>setEmail(e.target.value)}

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
                        onChange = {(e)=>setPassword(e.target.value)}
                     />
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
            <div className="py-3">
                <div>
                    New Customer ? <Link to="/signup">Register Here</Link>
                </div>
            </div>
        </>
    )
}

export default Login;