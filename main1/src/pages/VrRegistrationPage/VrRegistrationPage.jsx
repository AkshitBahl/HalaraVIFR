import React, { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const VrRegistrationPage = () => {
  const [vrid, setVrid] = useState("");
 const {writeVrData} = UserAuth();
const navigate = useNavigate();


  const handleSubmit = (e) =>{
    try {
      writeVrData(vrid);
      navigate("/devices");
    } catch (error) {
      console.log(error);
    }
   
  }
  return (
    <div>
      <input
        type="text"
        placeholder="vrid"
        value={vrid}
        onChange={(e) => setVrid(e.target.value)}
      />

      <button onClick={handleSubmit}>submit</button>
    </div>
  );
};

export default VrRegistrationPage;
