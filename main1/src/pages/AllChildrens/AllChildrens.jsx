import React,{useState,useEffect} from 'react'
import "./Allchildrens.css"
import ChildItem from '../../components/ChildItem/ChildItem';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../../firebase';
import { UserAuth } from '../../context/AuthContext';
import AccountPage from "../AccountPage/AccountPage"
const AllChildrens = () => {
  const [childData,setChildData] = useState("");
  const {user} = UserAuth();
  useEffect(()=>{
      fetchData();
  },[])

  const fetchData = async () => {
      try {
        const q = query(collection(db, "Child"), where("userid", "==", user.uid));
        const querySnapshot = await getDocs(q)
        let data = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setChildData(data);

      } catch (error) {
        console.log(error);
      }
    };
  return (
    <div className='students'>
      <AccountPage/>
    <div className='allchild'>
     {childData.length>0 && childData.map((cdata,index)=>{
      return(
        <ChildItem cdata={cdata} key={index}/>
      )
     })}
    </div>
    </div>
  )
}

export default AllChildrens
