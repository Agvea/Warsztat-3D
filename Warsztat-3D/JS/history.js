// Wyszukiwanie napraw przez klienta
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
