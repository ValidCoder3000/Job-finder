'use strict'

if (!localStorage.getItem("userProfile")) {
    const defaultUser = {
        email: "johndoe@email.com",
        password: "john123doe"
    };
    localStorage.setItem("userProfile", JSON.stringify(defaultUser));
}

document.getElementById("login").addEventListener("click", function() {
    const loginEmail = document.getElementById("email").value;
    const loginPassword = document.getElementById("password").value;

    const storedUser = JSON.parse(localStorage.getItem("userProfile"));

    if (storedUser &&
        storedUser.email === loginEmail &&
        storedUser.password === loginPassword) {
        window.location.href = "../../index.html";
    } else {
        alert("Invalid email or password");
    }


});
