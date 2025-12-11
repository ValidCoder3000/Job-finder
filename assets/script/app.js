'use strict';

// Using this to make the random users
const URL = "https://randomuser.me/api/?nat=CA&results=10&seed=same";

const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/JSON; charset=UTF-8'
    },
    mode: 'cors'  
}

async function getUsers(endpoint) {
    try {
        const result = await fetch(endpoint, options);
        if(!result.ok) {
            throw new Error(`${result.status}: ${result.statusText}`)
        }

        const data = await result.json();
        const users = data.results;

        const loadUsers = document.querySelector(".content-inside");
        loadUsers.innerHTML = ""; 

        users.forEach(user => {
            const userDiv = document.createElement("div");
            userDiv.classList.add("content-column");

            userDiv.innerHTML = `
            <img src="${user.picture.medium}" alt="Profile Picture">
            <div class="user-info">
                <h3>${user.name.first} ${user.name.last}</h3>
                <p>Email: ${user.email}</p>
                <p>Location: ${user.location.city}, ${user.location.country}</p>
            <div>
            `;

            loadUsers.appendChild(userDiv);
        });

    } catch(error) {
        console.log(error.message);
    }
}
window.addEventListener("DOMContentLoaded", () => {
    getUsers(URL);
});
