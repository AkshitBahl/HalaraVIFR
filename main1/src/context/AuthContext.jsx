import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendEmailVerification,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, doc, setDoc, getDoc, orderBy, limit, query, getDocs } from "firebase/firestore";
import { ref, set } from "firebase/database";
const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [mainChild, SetMainChild] = useState({});
  const [counts,setCounts] = useState(11);

  const createUser = (email, password, username) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      async () => {
        await updateProfile(auth.currentUser, {
          displayName: username,
        });
        await sendEmailVerification(auth.currentUser);
      }
    );
  };

  // useEffect(()=>{
  //   fetchCreateCountData();
  // })

  // let count;
  // const fetchCreateCountData = async () => {
  //   try {
  //     const q = query(collection(db, "users"), orderBy("userId","desc"),limit(1));
  //     const querySnapshot = await getDocs(q);
  //     let data = [];
  //     querySnapshot.forEach((doc) => {
  //       data.push({ ...doc.data(), id: doc.id });
  //     });
  //     data.map((da)=>{
  //       count=parseInt(da.userId)+1;
  //       if(count)setCounts(count);     
  //     })
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  
  // console.log(counts);
  
  const writeUserData = (
    Name,
    qualification,
    address,
    Institutionname,
    educationid,
    phoneNumber,
    count
  ) => {
    setDoc(doc(db, "users",user.uid), {
      Name: Name,
      userId: user.uid,
      email: user.email,
      qualification: qualification,
      address: address,
      phoneNumber: phoneNumber,
      educationid: educationid,
      Institutionname: Institutionname,
      EducatorId:count,
    });
  };


  const logout = () => {
    return signOut(auth);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  const setUpRecaptcha = (number) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  };

  const writeVrData = (vrid) => {
    console.log(db);
    addDoc(collection(db, "Vr"), {
      VrId: vrid,
      userid: user.uid,
      username: user.displayName,
    });
  };

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        logout,
        signIn,
        googleSignIn,
        writeUserData,
        writeVrData,
        setUpRecaptcha,
        mainChild,
        SetMainChild,
        
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const UserAuth = () => {
  return useContext(UserContext);
};
export { UserAuth };
