const mark = document.querySelector(".mark");
const path = "../Assets/Animations/check.json";

const NAME = document.querySelector(".name");
const PHONE = document.querySelector(".phone");
const bookingID = document.querySelector(".bookingID");

const seats = document.querySelector(".done__seats");
const price = document.querySelector(".done__price");

const bookedSeats = JSON.parse(sessionStorage.getItem("bookedSeats"));
const seatPrice = sessionStorage.getItem("seatPrice");

function loadAnimation(path) {
   const mark = document.querySelector(".mark");
   mark.style.display = "flex";
   bodymovin.loadAnimation({
      container: mark,
      path: path,
      render: "svg",
      loop: false,
      autoplay: true,
      name: "Checking",
   });
}

function displayInfo() {
   NAME.textContent = sessionStorage.getItem("name");
   PHONE.textContent = sessionStorage.getItem("phone");
   bookingID.textContent = sessionStorage.getItem("bookingID");
}

function displaySeats() {
   bookedSeats.forEach((seat) => {
      let P = document.createElement("p");
      P.classList.add("done__seat");
      P.classList.add("done__info");
      console.log("HELLO");
      console.log(seats);

      P.textContent = `${seat.room} - ${seat.seatNumber}`;
      seats.append(P);
   });
}

function displayPrice() {
   price.textContent = `${bookedSeats.length * seatPrice} EGP`;
}

displayInfo();
displaySeats();
displayPrice();
setTimeout(() => {
   loadAnimation(path);
}, 0);
