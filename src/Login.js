import React,{ useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios"
import "./weather.css";
import  { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const Login = () =>{
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const[loading,setLoading]  = useState(false);

    let history = useHistory();

    useEffect(()=>{
        const email = localStorage.getItem("email")
        const token = localStorage.getItem("token")
        // console.log(token,email)
        // console.log("hi")
        if(email && token){  
            history.push('/main')
        } 
    },[])

    async function submitHandler(e){
        e.preventDefault();
        // console.log(email,password)
        try{
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            // setLoading(true)    

            const { data } = await axios.post(
            "/api/user/login",
            { email, password },
            config
            );

           if(data.status === "success"){
                localStorage.setItem("email",data.email)
                localStorage.setItem("id",data._id)
                localStorage.setItem("token",data.token)

                history.push("/main")
           }else {
               alert(data.message)
           }
            // setLoading(false)
        }catch(error){
            console.log(error)
            setError(error.response.data.message)

        }
    }
    // console.log(error)
    return(
        <> 
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-3">
                <div class="col-3">
                    <div class="container-fluid">
                        <span class="navbar-brand mb-0 h1">Weather Application</span>
                    </div>
                </div>
            </nav>
                <div className = "main-login">
                    <div className = "login">
                        <h1 className = "center1">Login</h1>
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

                        <div>
                            New Customer ? <Link to="/signup">Register Here</Link>
                        </div>
                    </div>
                </div>    
        </>
    )
}

export default Login;