document.getElementById("repair-form").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const car = document.getElementById("car").value;
  const repair = document.getElementById("repair").value;
  const user = firebase.auth().currentUser;

  if (user) {
    firebase.database().ref("repairs/" + user.uid).push({
      car: car,
      repair: repair,
      timestamp: new Date().toISOString()
    }).then(() => {
      alert("Naprawa zapisana");
    });
  } else {
    alert("Musisz być zalogowany.");
  }
});

import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const db = getFirestore();

async function findRepairByRegistration(rejestracja) {
  const repairsRef = collection(db, "repairs");
  const q = query(repairsRef, where("rejestracja", "==", rejestracja));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}

