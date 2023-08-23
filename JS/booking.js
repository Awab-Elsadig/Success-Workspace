let SEAT_PRICE = 30;
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
<<<<<<< HEAD
   let selection = document.querySelector(".selection");
=======
   let selection = document.querySelector(".invoice__selected");
>>>>>>> 2380477 (All files)

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
<<<<<<< HEAD
      document.querySelector(".selection").style.maxHeight = 0;
=======
      document.querySelector(".invoice__selected").style.maxHeight = 0;
>>>>>>> 2380477 (All files)
   }
}

// Function to update the selected seats display
function updateSelection() {
<<<<<<< HEAD
   let selectedSeats = document.querySelector(".selectedSeats");
=======
   let selectedSeats = document.querySelector(".selected__seats");
>>>>>>> 2380477 (All files)
   let bookedSeats = document.querySelectorAll(".booked");
   selectedSeats.textContent = "";

   // Create Div with Room and Seat Number and Append to bookedSeats
   let sessionSeats = [];
   bookedSeats.forEach((seat) => {
      let currentSeat = {
<<<<<<< HEAD
         seatNumber: `Seat ${seat.getAttribute("data-set-id")}`,
         room: `Room ${seat.getAttribute("inRoom")}`,
      };
      sessionSeats.push(currentSeat); // Add to Session Storage
=======
         seatNumber: `Seat ${seat.getAttribute("seatNum")}`,
         room: `Room ${seat.getAttribute("inRoom")}`,
      };
      sessionSeats.push(currentSeat);
>>>>>>> 2380477 (All files)
      let theP = document.createElement("p");
      theP.textContent = `${currentSeat.room} - ${currentSeat.seatNumber}`;
      selectedSeats.append(theP);
   });
   sessionStorage.setItem("bookedSeats", JSON.stringify(sessionSeats));
   sessionStorage.setItem("bookingPrice", `${bookedSeats.length * SEAT_PRICE} EGP`);

   // Update Price and Show Checkout Button
<<<<<<< HEAD
   document.querySelector(".total__price span").textContent = `${bookedSeats.length * SEAT_PRICE} EGP`;
   if (bookedSeats.length > 0) {
      document.querySelector(".checkout__button").style.display = "flex";
   } else {
      document.querySelector(".checkout__button").style.display = "none";
=======
   console.log(document.querySelector(".invoice"));
   document.querySelector(".invoice__price span").textContent = `${bookedSeats.length * SEAT_PRICE} EGP`;
   if (bookedSeats.length > 0) {
      document.querySelector(".checkout-button").style.display = "block";
   } else {
      document.querySelector(".checkout-button").style.display = "none";
>>>>>>> 2380477 (All files)
   }
}

// Initialize the page
window.onload = () => {
   initRooms();
   initSeats();
   initInvoice();
<<<<<<< HEAD
};
=======
};
>>>>>>> 2380477 (All files)
