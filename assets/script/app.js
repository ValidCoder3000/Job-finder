'use strict';

const URL = "https://randomuser.me/api/?nat=CA&results=10&seed=same";

const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors'
};

window.addEventListener("DOMContentLoaded", () => {
    loadRightColumnUsers();
    loadLeftColumnProfile();
    generateRandomNumbers();
});


async function loadRightColumnUsers() {
    try {
        const result = await fetch(URL, options);
        const data = await result.json();
        const users = data.results;

        const container = document.querySelector(".content-inside");
        container.innerHTML = "";

        users.forEach(user => {
            const div = document.createElement("div");
            div.classList.add("content-column");

            div.innerHTML = `
                <div class="user-header">
                    <img src="${user.picture.medium}">
                    <h3>${user.name.first} ${user.name.last}</h3>
                </div>
                <div class="user-info">
                    <p id="user-info-details">${user.email}</p>
                    <p id="user-info-details">Location: ${user.location.city}, ${user.location.country}</p>
                </div>
            `;
            container.appendChild(div);
        });

    } catch (err) {
        console.log(err);
    }
}


async function loadLeftColumnProfile() {
    const logged = localStorage.getItem("loggedInUser");

    try {
        const result = await fetch("https://randomuser.me/api/?nat=CA", options);
        const data = await result.json();
        const user = data.results[0];

        profileBox.innerHTML = `
            <img src="${user.picture.large}" width="120" style="border-radius:50%">
            <h3>${user.name.first} ${user.name.last}</h3>
            <p>${user.location.city}, ${user.location.country}</p>
            <a href="#">${user.email}</a>
        `;

    } catch (err) {
        console.log(err);
    }
}


function generateRandomNumbers() {
    const connections = Math.floor(Math.random() * 900) + 100; 
    const views = Math.floor(Math.random() * 500) + 50;        

    document.querySelector("#random-number1 h3").textContent = connections;
    document.querySelector("#random-number2 h3").textContent = views;
}


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