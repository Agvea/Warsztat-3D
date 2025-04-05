// Wyszukiwanie napraw przez klienta
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
    resultList += `<li>Naprawa: ${doc.data().opis}, Telefon: ${doc.data().telefon}</li>`;
  });

  document.getElementById("repair-list").innerHTML = resultList;
}

