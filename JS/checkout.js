// Function to get the booked seats data from sessionStorage
function getBookedSeatsData() {
   const bookedSeatsData = JSON.parse(sessionStorage.getItem("bookedSeats")) || [];
   return bookedSeatsData;
}

// Function to display booked seats on the checkout page
function displayBookedSeats(bookedSeatsData, bookedSeatsContainer) {
   bookedSeatsContainer.innerHTML = "";
   const seatPrice = 30;

   bookedSeatsData.forEach((bookedSeat) => {
      const seatElement = document.createElement("p");
      seatElement.textContent = `${bookedSeat.room} - ${bookedSeat.seatNumber}`;
      seatElement.classList.add("bookedSeat");
      bookedSeatsContainer.append(seatElement);
   });
   const priceElement = document.createElement("h3");
   priceElement.textContent = `Total: ${bookedSeatsData.length * seatPrice} EGP`;
   priceElement.classList.add("total__price")
   bookedSeatsContainer.append(priceElement);
}

// Function to initialize the checkout page
function initCheckoutPage() {
   const bookedSeatsData = getBookedSeatsData();
   const bookedSeatsContainer = document.querySelector(".selected");
   displayBookedSeats(bookedSeatsData, bookedSeatsContainer);
}

// Call the initCheckoutPage function when the page is loaded
window.addEventListener("load", initCheckoutPage());
