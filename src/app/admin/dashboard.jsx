import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [about, setAbout] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, "portfolio", "about");
      const snap = await getDoc(ref);
      setAbout(snap.data().text);
    };
    fetchData();
  }, []);

  const save = async () => {
    await updateDoc(doc(db, "portfolio", "about"), { text: about });
    alert("Updated");
  };

  return (
    <div>
      <textarea value={about} onChange={e=>setAbout(e.target.value)} />
      <button onClick={save}>Save</button>
    </div>
  );
}
