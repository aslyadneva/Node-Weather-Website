console.log("Client side JS loadeded!");

const weatherForm = document.querySelector("form");
const searchField = document.querySelector("input");
const locationView = document.querySelector("#location");
const foreCast = document.querySelector("#forecast");
const errorView = document.querySelector("#error");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchField.value;

  locationView.textContent = "";
  errorView.textContent = "";
  searchField.value = "";
  foreCast.textContent = "Loading...";
  fetch(`http://localhost:3000/weather?address=${location}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        foreCast.textContent = "";
        errorView.textContent = data.error;
      } else {
        console.log(data);
        foreCast.textContent = data.forecast;
        locationView.textContent = data.location;
      }
    });
});
