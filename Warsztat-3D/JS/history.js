import { db } from './firebase-config.js';
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

document.getElementById('searchForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const plate = document.getElementById('plate').value.trim().toUpperCase();
  const phone = document.getElementById('phone').value.trim();

  if (!plate) return;

  const repairsRef = collection(db, "repairs");
  const q = query(repairsRef, where("rejestracja", "==", plate));

  try {
    const querySnapshot = await getDocs(q);
    const resultsEl = document.getElementById("repair-list");
    resultsEl.innerHTML = "";

    if (querySnapshot.empty) {
      resultsEl.innerHTML = "<li>Brak napraw dla podanej rejestracji.</li>";
      return;
    }

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const matchesPhone = phone ? data.telefon.toString() === phone : true;

      if (matchesPhone) {
        resultsEl.innerHTML += `<li>${data.opis} (${data.telefon})</li>`;
      }
    });
  } catch (error) {
    console.error("Błąd podczas pobierania danych:", error);
  }
});

