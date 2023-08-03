import React, { useEffect, useState } from "react";
import VrItem from "../VrItem/VrItem";
import "./VrList.css";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { UserAuth } from "../../context/AuthContext";

const VrList = () => {
  const { user } = UserAuth();
  const [vrdata, setVrdata] = useState([]);

useEffect(()=>{
  fetchData()
},[])


  const fetchData = async () => {
    try {
      const q = query(collection(db, "Vr"), where("userid", "==", user.uid));
      const querySnapshot = await getDocs(q)
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setVrdata(data);
      // console.log(vrdata);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(vrdata);
  
  return (
    <div className="vrlist">


      <Link className="vr-add" to="/vrregistration">
            Add Vr
      </Link>
      {vrdata.length>0 && vrdata.map((data,index)=>{
        return(
          <VrItem data={data} index={index} key={index}/>
        )
      })}
    
    </div>
  );
};

export default VrList;
