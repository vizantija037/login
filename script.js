const form = document.getElementById("formLogin");
const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", submitForm);

function submitForm(e) {
  e.preventDefault();
  let userFront = document.getElementById("username").value;
  let passFront = document.getElementById("password").value;
  loaderVisible();
  functionAsync();
  async function functionAsync() {
    try {
      await fetch("https://fakestoreapi.com/users")
        .then((resp) => resp.json())
        .then((data) => {
          for (let i = 0; i < data.length; i++) {
            if (
              data[i].username !== userFront &&
              data[i].password !== passFront
            ) {
              document.querySelector(".user-message").style.display = "flex";
            } else {
              NewTab();
              form.reset();
              document.querySelector(".user-message").style.display = "none";
              return;
            }

          }
        });
    } catch (err) {
      console.log(err);
    } finally {
      loaderInvisible();
    }
  }
}
//open new window
function NewTab() {
  window.open("https://vizantija037.github.io/JSON-reading/", "_blank");
}
//reset label - to inone
form.addEventListener("click", resetLabel);
function resetLabel(e) {
  if (e.target.type === "text") {
    document.querySelector(".user-message").style.display = "none";
  }
}
//loader
const loader = document.querySelector(".loader-holder");
function loaderVisible() {
  loader.style.display = "flex";
}
function loaderInvisible() {
  loader.style.display = "none";
}

fetch("https://fakestoreapi.com/users")
  .then((response) => response.json())
  .then((data) => {
    let output = "";
    data.forEach((element) => {
      output += `
            <div class="card">
            <h4>Username: ${element.username}</h4>
            <h4>Password: ${element.password}</h4>
            </div>
        `;
    });

    document.querySelector(".users").innerHTML = output;
  });

const showBtn = document.querySelector(".existing-users");
showBtn.addEventListener("click", showCards);

function showCards() {
  document.querySelector(".users").style.opacity = "1";
}
