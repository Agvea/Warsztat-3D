document.getElementById("login-form").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      alert("Pomyślnie zalogowano");
      // możesz przekierować np. do history.html
    })
    .catch(error => {
      alert("Błąd logowania: " + error.message);
    });
});
