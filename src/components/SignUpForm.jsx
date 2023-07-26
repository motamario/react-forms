import React from "react";
import { useState } from "react";
import '../App.css'


export default function SignUpForm ({setToken}){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
                const url = "https://fsa-jwt-practice.herokuapp.com/signup";
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ username, password })
                });
    
                if (!response.ok) {
                    // Handle non-successful response here if needed
                    // For example, if the server returns an error status code
                    throw new Error("Failed to sign up");
                }
    
                const result = await response.json();
                console.log(result);
                setToken(result.token)
        } catch (error){
            setError(error.message);
        }
    }
    return (
        <div>
            <h2>Sign Up </h2> 
            { error && <p>{error}</p> }
            <form onSubmit={handleSubmit}>
                <label>
                Username: {" "} 
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername (e.target.value)}/>
                </label>
                <label>
                    Password: {" "} 
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button>Submit</button>
           </form>
        </div>      
    )
}