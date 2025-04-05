// Wyszukiwanie napraw przez klienta
// history.js
import { db } from "./firebase-config.js";
import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

async function znajdzNaprawe(rejestracja) {
  const naprawyRef = collection(db, "repairs");
  const q = query(naprawyRef, where("rejestracja", "==", rejestracja));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("Brak wyników");
    return;
  }

  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}


  if (!found) {
    resultsDiv.innerHTML = "<p>Brak wyników dla podanych danych.</p>";
  }
);
