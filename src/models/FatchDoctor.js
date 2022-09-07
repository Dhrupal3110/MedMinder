import React from 'react'

const FatchDoctor = () => {
    const getDoctors = async () => {
    const response = await fetch(`http://127.0.0.1:5000/api/doctor/Do.Data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json)
    const myJSON = JSON.stringify(json);
  }
  return (
    <div>
      <button onClick={getDoctors}>click me</button>
    </div>
  )
}

export default FatchDoctor
