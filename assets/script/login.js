'use strict';

function saveUser(e) {
    e.preventDefault();
    const email = document.querySelector("input[type='email']").value;

    // Extract first name before @
    const username = email.split("@")[0];

    localStorage.setItem("loggedInUser", username);

    window.location.href = "../index.html";
}
