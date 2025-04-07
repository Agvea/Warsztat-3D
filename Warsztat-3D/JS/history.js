import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Twoja konfiguracja Firebase:
const firebaseConfig = {
  // ...wklej swoje dane
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔍 Wyszukiwanie napraw
async function znajdzNaprawe(rejestracja) {
  const naprawyRef = collection(db, "repairs");
  const q = query(naprawyRef, where("rejestracja", "==", rejestracja));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("Brak wyników");
    document.getElementById("repair-list").innerHTML = "<li>Brak napraw dla tej rejestracji</li>";
    return;
  }

  let resultList = "";
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const date = data.data?.toDate().toLocaleDateString("pl-PL") || "brak daty";
    resultList += `<li>${date}: ${data.opis} (tel. ${data.telefon})</li>`;
  });

  document.getElementById("repair-list").innerHTML = resultList;
}

// 🧾 Obsługa formularza
document.getElementById("searchForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const plateInput = document.getElementById("plate").value.trim().toUpperCase();

  if (plateInput) {
    znajdzNaprawe(plateInput);
  }
});

