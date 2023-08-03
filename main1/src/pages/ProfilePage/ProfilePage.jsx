import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

const ProfilePage = () => {
  const { writeUserData, user,writeEducatorData } = UserAuth();
  const [qualification, setQualification] = useState("");
  const [name, setName] = useState(
    `${user.displayName ? user.displayName : ""}`
  );
  const [address, setAddress] = useState("");
  const [institutionname, setInstitutionname] = useState("");
  const [educationid, setEducationid] = useState("");
  const [count, setCount] = useState(11);
  const [phoneNumber, setPhoneNumber] = useState(
    `${user.phoneNumber ? user.phoneNumber : ""}`
  );

  const navigate = useNavigate();
  const [email, setEmail] = useState(`${user.email ? user.email : ""}`);

  useEffect(() => {
    fetchCreateCountData();
    fetchUserData();
  }, []);

  const fetchCreateCountData = async () => {
    try {
      const q = query(
        collection(db, "users"),
        orderBy("EducatorId", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });

      data.map((da) => {
        const x = parseInt(da.EducatorId) + 1;
        if (x) setCount(x);
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(count);

  const fetchUserData = async()=>{
    const q = query(
      collection(db, "users"),where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data()});
    });
    console.log(data);
    if(data.length!=0){
        setCount(data[0].EducatorId);
        console.log(data[0].EducatorId);
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    
    try {
      await writeUserData(
        name,
        qualification,
        address,
        institutionname,
        educationid,
        phoneNumber,
        count,
      );
      navigate("/account");
    } catch (error) {
      console.log(error);
    }
  };



  


  return (
    <div className="profilepage">
      <input
        type="text"
        placeholder="username"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={user.displayName !== null}
      />
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={user.email !== null}
      />

      <input
        type="text"
        placeholder="qualification"
        value={qualification}
        onChange={(e) => setQualification(e.target.value)}
      />
      <textarea
        placeholder="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Institutionname"
        value={institutionname}
        onChange={(e) => setInstitutionname(e.target.value)}
      />
      <input
        type="text"
        placeholder="Educationid"
        value={educationid}
        onChange={(e) => setEducationid(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        disabled={user.phoneNumber !== null}
      />
      <button onClick={handleClick}>update</button>
      <Link to={"/account"}>Skip for now</Link>
    </div>
  );
};

export default ProfilePage;
