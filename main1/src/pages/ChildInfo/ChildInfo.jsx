import React, { useEffect, useState } from "react";
import { doc,collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { Link, useParams } from "react-router-dom";
import "./ChildInfo.css"
const ChildInfo = () => {
  
  let { childid } = useParams();
  const [eachChildData,setEachChildData] = useState([]);
  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    try {
      const q = query(collection(db, "Child"))
      const querySnapshot = await getDocs(q)
      let data = [];
      querySnapshot.forEach((doc) => {
        if(doc.id===childid){
          data.push({ ...doc.data(), id: doc.id });
        }

      });
      setEachChildData(data);
      // console.log(vrdata);
    } catch (error) {
      console.log(error);
    }
  };
console.log(eachChildData);
  return (
  <div>
     {eachChildData.map((eachdata,index)=>{
      return(
        <div key={index} className="childinfo">
          <p>ChildName:{eachdata.childName}</p>
          <p>Address:{eachdata.ChildAddress}</p>
          <p>Parent's Name:{eachdata.ParentName}</p>
          <p>Parent's Number:{eachdata.ParentNumber}</p>
          <p>Date of Birth:{eachdata.dob}</p>
          <p>Educator:{eachdata.username}</p>
          <p>VrId:{eachdata.VrId}</p>
        </div>
      )
      
     })}

     <Link to={`/child/session/${childid}`}>View Session Details</Link>
     <Link to={`/child/stream/${childid}`}>View Stream</Link>
  </div>
  )
};

export default ChildInfo;
