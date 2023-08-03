import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { UserAuth } from "../../context/AuthContext";

const LiveStream = ({ childid }) => {
  const [streamUrl, setStreamUrl] = useState("");
  const [url, setUrl] = useState("");
  const { mainChild, SetMainChild } = UserAuth();

  const fetchData = async () => {
    const q = query(collection(db, "Child"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.id === childid) {
        SetMainChild(doc.data());
      }
    });
  };
  
  const startStream = async () => {
    setUrl(streamUrl);
    try {
      await setDoc(doc(db, "MainChild","main" ), {
        childid,
        ChildAddress: mainChild.ChildAddress,
        ParentName: mainChild.ParentName,
        ParentNumber: mainChild.ParentNumber,
        ParentsRelationWithChild: mainChild.ParentsRelationWithChild,
        childName: mainChild.childName,
        dob: mainChild.dob,
      });
    } catch (error) {
      console.log(error);
    }
    console.log(mainChild);
  };

  const stopStream = async () => {
    setUrl("");
    await setDoc(doc(db, "MainChild", "main"), {
      childid: null,
      ChildAddress: null,
      ParentName: null,
      ParentNumber: null,
      ParentsRelationWithChild: null,
      childName: null,
      dob: null,
    });
  };

  useEffect(() => {
    fetchData();
  }, [startStream]);
  return (
    <div className="fixed inset-0 bg-[#D3C672]/[0.53] z-50 grid place-items-center px-3.5 py-1 border-none">
    <div className="flex flex-col gap-5 h-4/6 w-4/12  rounded-xl bg-[#fffadd] shadow-2xl ">
      {/* <input
        type="text"
        value={streamUrl}
        onChange={(e) => setStreamUrl(e.target.value)}
      />
      <button onClick={startStream}>Start</button>
      <button onClick={stopStream}>Stop</button>
      <div>
        <iframe src={url} title="Embedded Content" width="1200" height="700" />
      </div> */}
    </div>
    </div>
  );
};

export default LiveStream;
