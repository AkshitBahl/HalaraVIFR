import { useEffect, useState } from "react";
import "./VrItem.css";
import { addDoc, collection, doc, getDocs, limit, orderBy, query, setDoc, where } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
const VrItem = ({ data, index }) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [pname, setPname] = useState("");
  const [prelation, setPrelation] = useState("");
  const [pnumber, setPnumber] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [childData, setChildData] = useState([]);
  let [counts2,setCounts2] = useState(11);
 const [userId,setUserID] = useState();
  const [childNo,setChildNo] =useState(11);
  const [data1,setData1] = useState([]);
  index = index + 1;

  const toggleModal = () => {
    setModal(!modal);
  };
  

  useEffect(()=>{
    fetchUserData();
  },[])
  useEffect(()=>{
    fetchChildData();
  },[modal])
  const fetchUserData = async () => {

      try {
        const q =  query(
          collection(db, `users`), where("userId", "==", data.userid)
        );
        const querySnapshot = await getDocs(q);
        let data1 = [];
        querySnapshot.forEach((doc) => {
        data1.push({ ...doc.data(), id: doc.id });
        });
        setCounts2(data1[0].EducatorId);
      } catch (error) {
        console.log(error);
      }

  };
  const fetchChildData = async () => {

    try {
      const q =  query(
        collection(db, `users/${data.userid}/Child`),orderBy("childNo", "desc"),limit(1)
      );
      const querySnapshot = await getDocs(q);
      let data2 = [];
      querySnapshot.forEach((doc) => {
      data2.push({ ...doc.data(), id: doc.id });
      });
      setChildNo(parseInt(data2[0].childNo)+1);
    } catch (error) {
      console.log(error);
    }

};


  const handleClick = () => {
    try {
      setDoc(doc(db, `users/${data.userid}/Child`,counts2+"."+childNo), {
        childName: name,
        VrId: data.VrId,
        userid: data.userid,
        username: data.username,
        dob: dob,
        ParentName: pname,
        ParentNumber: pnumber,
        ParentsRelationWithChild: prelation,
        ChildAddress: address,
        childId:counts2+"."+childNo,
        childNo:childNo,
      });
      setModal(!modal);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
   
    fetchData();
  }, [handleClick]);

  const fetchData = async () => {
    if (childData.length >= 5) {
      console.log("Only 5 children can be added in one vr");
    } else {
      try {
        const q =  query(
          collection(db, `users/${data.userid}/Child`),
          where("VrId", "==", data.VrId)
        );
        const querySnapshot = await getDocs(q);
        let child = [];
        querySnapshot.forEach((doc) => {
        child.push({ ...doc.data(), id: doc.id });

        });
        setChildData(child);
        // console.log(vrdata);
      } catch (error) {
        console.log(error);
      }
    }
  };



  return (
    <div className="vritem">
      <div className="vr-title">
        {/* {data.username} */}
        {data.VrId}
      </div>
      <h3>Vr{index}</h3>
      {childData.length < 5 && <button onClick={toggleModal}>Add Child</button>}
      {modal && (
        <div className="modal-item">
          <div className="modal-list">
            <h1>Add Child</h1>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Parents Name"
              value={pname}
              onChange={(e) => setPname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Parents Number"
              value={pnumber}
              onChange={(e) => setPnumber(e.target.value)}
            />

            <input
              type="text"
              placeholder="Relation with Child"
              value={prelation}
              onChange={(e) => setPrelation(e.target.value)}
            />
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            <textarea
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          
          <button onClick={handleClick}>Create</button>
          <button onClick={() => setModal(!modal)}>Close</button>
          </div>
        </div>
      )}
      <div>
        {childData.map((ele, index) => {
          return (
            <li key={index}>
              <Link to={`/child/${ele.id}`}>{ele.childName}</Link>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default VrItem;
