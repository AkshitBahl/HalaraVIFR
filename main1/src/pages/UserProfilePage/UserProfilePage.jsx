import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import AccountPage from "../AccountPage/AccountPage"
const UserProfilePage = () => {
  const { user } = UserAuth();
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const q = query(collection(db, "users"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setUserInfo(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  console.log(userInfo);


  return (
    <div style={{display:"flex"}}>
      <AccountPage/>
    <div>
      <p>User Email : {user && user.email}</p>
      <p>User Name : {user && user.displayName}</p>
      <p>User id : {user && user.uid}</p>
      {userInfo.map((data) => {
        return (
          <div>
            <p>User Qualification: {data.qualification}</p>
            <p>User Address : {data.address}</p>
            <p>PhoneNumber : {data.phoneNumber}</p>
            <p>Institution Name : {data.Institutionname}</p>
            <p>Education Id : {data.educationid}</p>
          </div>
          
        );
      })}

      <Link to="/profile">Edit</Link>
    </div>
    </div>
  );
};

export default UserProfilePage;
