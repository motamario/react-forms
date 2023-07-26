import  React from 'react';
import { useState } from "react";
import '../App.css'

export default function Authenticate({token}) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);



  async function handleClick() {
       

    try {
        const url = "https://fsa-jwt-practice.herokuapp.com/authenticate";
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
          // Handle non-successful response here if needed
          // For example, if the server returns an error status code
          throw new Error("Failed to authenticate");
        }

      const result = await response.json();
      console.log(result);
      setSuccessMessage(result.message);
      setUsername(result.data.username);


  } catch (error) {
    setError(error.message);
  }
}
    return  (
      <div>
          <h2>Authenticate </h2>
          {successMessage && <p>{successMessage}</p>}
          { error && <p>{error}</p> }
          {username && <p>Welcome, {username}!</p>}

          <button onClick={handleClick}>Authenticate Token</button>
      </div>
  );
  }