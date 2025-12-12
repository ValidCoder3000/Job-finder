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

let changeDetails = document.getElementById("change_profile_details");

document.getElementById("change_profile_details").addEventListener("click", function() {
    const changeDetails = document.getElementById("change_profile_details");

    if (changeDetails.value === "Change Profile Details") {
        changeDetails.value = "Confirm";
        document.querySelectorAll(".edit_button").forEach(btn => {
            btn.classList.remove("hidden");
        });
    } else if (changeDetails.value === "Confirm") {
        changeDetails.value = "Change Profile Details";
        document.getElementById("name_div").classList.remove("hidden");
        document.getElementById("profession_div").classList.remove("hidden");
        document.getElementById("bio_div").classList.remove("hidden");
        document.querySelectorAll(".edit_button").forEach(btn => {
            btn.classList.add("hidden");

            document.querySelectorAll(".change_info_div").forEach(div => {
                div.classList.add("hidden");
            })
        });
    }
});

document.getElementById("name_edit").addEventListener("click", function() {
    document.getElementById("name_div").classList.add("hidden");
    document.getElementById("change_name").classList.remove("hidden")
})
document.getElementById("profession_edit").addEventListener("click", function() {
    document.getElementById("profession_div").classList.add("hidden");
    document.getElementById("change_profession").classList.remove("hidden")
})

document.getElementById("bio_edit").addEventListener("click", function() {
    document.getElementById("bio_div").classList.add("hidden");
    document.getElementById("change_bio").classList.remove("hidden")
})

document.getElementById("name_confirm").addEventListener("click", function() {
    if (document.getElementById("name_change").value !== "") {
        document.getElementById("profile_name").innerHTML = document.getElementById("name_change").value
    }
    document.getElementById("name_div").classList.remove("hidden");
    document.getElementById("change_name").classList.add("hidden")
})

document.getElementById("profession_confirm").addEventListener("click", function() {
    if (document.getElementById("profession_change").value !== "") {
        document.getElementById("profile_profession").innerHTML = document.getElementById("profession_change").value
    }
    document.getElementById("profession_div").classList.remove("hidden");
    document.getElementById("change_profession").classList.add("hidden")
})

document.getElementById("bio_confirm").addEventListener("click", function() {
    if (document.getElementById("bio_change").value !== "") {
        document.getElementById("profile_bio").innerHTML = document.getElementById("bio_change").value
    }
    document.getElementById("bio_div").classList.remove("hidden");
    document.getElementById("change_bio").classList.add("hidden")
})

window.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");
  const profilePic = document.getElementById("profile_picture");
  const changePicBtn = document.getElementById("change_profile_picture");

  changePicBtn.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
      const imgURL = (window.URL || window.webkitURL).createObjectURL(file);
      profilePic.src = imgURL;
    }
  });
});


document.getElementById