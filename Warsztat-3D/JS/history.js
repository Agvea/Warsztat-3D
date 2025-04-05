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

// Wyszukiwanie napraw przez klienta
import { db } from "./firebase-config.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const form = document.getElementById("searchForm");
const resultsDiv = document.getElementById("results");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const plate = form.plate.value.trim().toUpperCase();
  const phone = form.phone.value.trim();

  let q = query(collection(db, "repairs"), where("plate", "==", plate));
  const snapshot = await getDocs(q);

  let found = false;
  resultsDiv.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();
    if (!phone || data.phone === phone) {
      found = true;
      resultsDiv.innerHTML += `
        <div>
          <h3>Data naprawy: ${data.date}</h3>
          <p>${data.description}</p>
        </div>
      `;
    }
  });

  if (!found) {
    resultsDiv.innerHTML = "<p>Brak wyników dla podanych danych.</p>";
  }
});

