// 1. SELECT
const input = document.getElementById("usernameInput");
const button = document.getElementById("searchBtn");
const container = document.getElementById("profileContainer");

// ENTER KEY (OUTSIDE)
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    button.click();
  }
});

// 2. EVENT
button.addEventListener("click", function () {

  const username = input.value.trim();

  if (username === "") {
    container.innerHTML = "<p style='color:red;'>Please enter a username</p>";
    return;
  }

  const url = "https://api.github.com/users/" + username;

  container.innerHTML = "<p style='color:gray;'>Searching...</p>";

  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error("User not found");
      }
      return res.json();
    })
    .then(data => {

      container.innerHTML = `
  <div class="profile-card">
    <img src="${data.avatar_url}" width="100" alt="User Avatar">
    <h2>${data.login.charAt(0).toUpperCase() + data.login.slice(1)}</h2>

    <div class="info-row">
      <div class="info-box">
        <p>Followers</p>
        <strong>${data.followers}</strong>
      </div>

      <div class="info-box">
        <p>Repos</p>
        <strong>${data.public_repos}</strong>
      </div>

      ${data.location ? `
      <div class="info-box">
        <p>Location</p>
        <strong>${data.location}</strong>
      </div>` : ""}
    </div>

    ${data.bio ? `<p class="bio">${data.bio}</p>` : ""}

    <button id="profileBtn">View GitHub Profile</button>
  </div>
`;
      // BUTTON AFTER HTML CREATED
      document.getElementById("profileBtn").addEventListener("click", function () {
        window.open(data.html_url, "_blank");
      });

    })
    .catch(error => {
      container.innerHTML = "<p style='color:red;'>User not found. Please try again.</p>";
    });

});
