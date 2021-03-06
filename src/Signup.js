import React, { useState } from "react"
import axios from "axios";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";


const Signup = ()=>{

    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[confirmpassword,setConfirmpassword] = useState("");
    // const[message,setMessage] = useState(null);

    let history = useHistory();

    async function submitHandler(e){
        e.preventDefault();
        if(password !== confirmpassword){
            // setMessage("Password do not match");
            alert("password do not match")
        }else {
            // setMessage(null)

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

            console.log(data.status)

            if(data.status === "success"){
                history.push('/')
            }else {
                alert(data.message)
            }

            // console.log(data)
            } catch (error) {
                console.log(error.message)
            }
        }
    }

    // console.log(message)

    return(
        <> 
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-3 mycutomnav">
                <div class="col-3">
                    <div class="container-fluid">
                        <span class="navbar-brand mb-0 h1 customheader">Weather Application</span>
                    </div>
                </div>
            </nav>
            <div className = "main-login">

                <div className = "signup-left-panel">
                    <div className = "login">
                        <h1 className = "center1">Register</h1>
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
                                    required
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
                                    required
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
                                    required
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
                                    required
                                />
                            </div>

                            <button 
                            type="submit" 
                            class="btn btn-primary"
                            >Submit</button>
                        </form>
                        <div className = "parent">
                                Already User ?   
                                <Link to = "/"> 
                                    login 
                                </Link>
                        </div>
                    </div>
                </div>

                <div className = "signup-right-panel">
                    <img src = "https://www.spatialtimes.com/static/9baaa29580ff1004d4b9fbebcdeba225/8dba1/tanner-van-dera-741079-unsplash.jpg" alt = "please check your internet connection"/>
                </div>
            </div>
        </>
    )
}

export default Signup;