let SEAT_PRICE = 30;
sessionStorage.setItem("seatPrice", SEAT_PRICE);
let rooms = document.querySelectorAll(".room");
let seats = document.querySelectorAll(".seat");

// Functoin to check each room click
function initRooms() {
   rooms.forEach((room) => {
      room.addEventListener("click", () => {
         toggleRoom(room);
      });
   });
}

// Function to chech each seat click if not reserved
function initSeats() {
   seats.forEach((seat) => {
      // Check for Reserved
      if (seat.classList.contains("reserved")) {
         seat.textContent = "محجوز";
      }
      seat.addEventListener("click", (event) => {
         event.stopPropagation();
         if (!seat.classList.contains("reserved")) {
            toggleSeat(seat);
         }
      });
   });
}
// RETURN ^^^^^^^^^^^^^^^^^^^^^^^
function initInvoice() {
   let invoice = document.querySelector(".invoice");
   let selection = document.querySelector(".invoice__selected");

   invoice.addEventListener("click", () => {
      invoice.classList.toggle("expanded");
      if (invoice.classList.contains("expanded")) {
         selection.style.maxHeight = `${selection.scrollHeight}px`;
      } else {
         selection.style.maxHeight = 0;
      }
   });
}

// Function to toggle room
function toggleRoom(room) {
   let seats = room.querySelector(".seats");
   room.classList.toggle("expanded");
   if (room.classList.contains("expanded")) {
      seats.style.maxHeight = `${seats.scrollHeight}px`;
   } else {
      seats.style.maxHeight = 0;
   }
}

// Function to change seat status to booked and update selction
function toggleSeat(seat) {
   if (!seat.classList.contains("reserved")) {
      seat.classList.toggle("booked");
      updateSelection();

      let bookedSeats = JSON.parse(sessionStorage.getItem("bookedSeats"));
      if (bookedSeats.length === 4) {
         seat.classList.toggle("booked");
         updateSelection();

         setTimeout(() => {
            document.querySelector(".maxed-out").style.opacity = 1;
            document.querySelector(".maxed-out").style.animation = "left-right linear 0.4s 0.3s";
         }, 200);
         setTimeout(() => {
            document.querySelector(".maxed-out").style.opacity = 0;
            document.querySelector(".maxed-out").style.animation = "none";
         }, 2500);
      }

      document.querySelector(".invoice__selected").style.maxHeight = 0;
   }
}

// Function to update the selected seats display
function updateSelection() {
   let selectedSeats = document.querySelector(".selected__seats");
   let bookedSeats = document.querySelectorAll(".booked");
   selectedSeats.textContent = "";

   // Create Div with Room and Seat Number and Append to bookedSeats
   let sessionSeats = [];
   bookedSeats.forEach((seat) => {
      let currentSeat = {
         seatNumber: `Seat ${seat.getAttribute("seatNum")}`,
         room: `Room ${seat.getAttribute("inRoom")}`,
      };
      sessionSeats.push(currentSeat);
      let theP = document.createElement("p");
      theP.textContent = `${currentSeat.room} - ${currentSeat.seatNumber}`;
      selectedSeats.append(theP);
   });
   sessionStorage.setItem("bookedSeats", JSON.stringify(sessionSeats));
   sessionStorage.setItem("bookingPrice", `${bookedSeats.length * SEAT_PRICE} EGP`);

   // Update Price and Show Checkout Button
   document.querySelector(".invoice__price span").textContent = `${bookedSeats.length * SEAT_PRICE} EGP`;
   if (bookedSeats.length > 0) {
      document.querySelector(".checkout-button").style.display = "block";
   } else {
      document.querySelector(".checkout-button").style.display = "none";
   }
}

// Initialize the page
window.onload = () => {
   initRooms();
   initSeats();
   initInvoice();
};
