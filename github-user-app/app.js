// 1. SELECT
const input = document.getElementById("usernameInput");
const button = document.getElementById("searchBtn");
const container = document.getElementById("profileContainer");

// 2. EVENT
button.addEventListener("click", function () {

  // 3. LOGIC
  const username = input.value;
  if (username === "") {
    container.innerHTML = "Please enter a username";
    return;
  }

  const url = "https://api.github.com/users/" + username;
    
  container.innerHTML = "Loading...";
 
  fetch(url)
  .then(res => {
    if (!res.ok) {
      throw new Error("User not found");
    }
    return res.json();
  })
  .then(data => {
    container.innerHTML = `
      <img src="${data.avatar_url}" width="100">
      <h2>${data.login}</h2>
      <p>Followers: ${data.followers}</p>
    `;
  })
  .catch(error => {
    container.innerHTML = "User not found";
  });

  });
