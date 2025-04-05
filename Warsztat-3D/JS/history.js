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
// js/searchRepair.js
import { db } from "./firebase-config.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const form = document.getElementById("searchForm");
const resultsDiv = document.getElementById("results");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const rejestracja = form.plate.value.trim().toUpperCase();
  const telefon = form.phone.value.trim();

  // Tworzymy zapytanie po polu "rejestracja"
  let q = query(collection(db, "repairs"), where("rejestracja", "==", rejestracja));
  const snapshot = await getDocs(q);

  let found = false;
  resultsDiv.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();
    
    // Jeśli telefon nie został podany albo pasuje do tego w bazie, pokaż wynik
    if (!telefon || data.telefon == telefon) {
      found = true;
      const date = data.data?.toDate().toLocaleDateString("pl-PL") ?? "Brak daty";
      resultsDiv.innerHTML += `
        <div>
          <h3>Data naprawy: ${date}</h3>
          <p>Opis: ${data.opis}</p>
        </div>
      `;
    }
  });

  if (!found) {
    resultsDiv.innerHTML = "<p>Brak wyników dla podanych danych.</p>";
  }
});
