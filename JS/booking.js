let seatPrice = 30;

// Add event listener to each room
let rooms = document.querySelectorAll(".room");
rooms.forEach((room) => {
   room.addEventListener("click", () => {
      toggleRoom(room);
   });
});

// Add event listener to each seat
let seats = document.querySelectorAll(".seat");
seats.forEach((seat) => {
   // Check for Reserved
   if (seat.classList.contains("reserved")) seat.textContent = "محجوز";
   // Add Event Listener
   else {
      seat.addEventListener("click", (event) => {
         event.stopPropagation();
         toggleSeat(seat);
      });
   }
});

// Add event listener to invoice
let invoice = document.querySelector(".invoice");
let selection = document.querySelector(".selection");
invoice.addEventListener("click", () => {
   invoice.classList.toggle("expanded");
   if (invoice.classList.contains("expanded")) {
      selection.style.maxHeight = `${selection.scrollHeight}px`;
   } else {
      selection.style.maxHeight = 0;
   }
});

// Function to expand or collapse a room
function toggleRoom(room) {
   let currentRoom = room;
   rooms.forEach((otherRoom) => {
      if (otherRoom !== currentRoom) {
         otherRoom.classList.remove("expanded");
         otherRoom.querySelector(".seats").classList.add("hidden");
      }
   });

   // Toggle the expanded and hidden classes room and seatsElement
   currentRoom.classList.toggle("expanded");
   let seatsElement = currentRoom.querySelector(".seats");
   seatsElement.classList.toggle("hidden");

   // Expand the current room
   rooms.forEach((room) => {
      const seatsElement = room.querySelector(".seats");
      if (room.classList.contains("expanded")) {
         seatsElement.style.maxHeight = `${seatsElement.scrollHeight}px`;
      } else {
         seatsElement.style.maxHeight = 0;
      }
   });
}

// Function to change seat status to booked and update selction
function toggleSeat(seat) {
   if (!seat.classList.contains("reserved")) {
      seat.classList.toggle("booked");
      updateSelection();
   }
}

// Function to update the selected seats display
function updateSelection() {
   let selectedSeats = document.querySelector(".selectedSeats");
   let bookedSeats = document.querySelectorAll(".booked");
   selectedSeats.textContent = "";

   // Create Div with Room and Seat Number and Append to bookedSeats
   let sessionSeats = [];
   bookedSeats.forEach((seat) => {
      let currentSeat = {
         seatNumber: seat.textContent,
         room: seat.parentElement.parentElement.querySelector("h2").textContent,
      };
      sessionSeats.push(currentSeat);
      let theP = document.createElement("p");
      theP.textContent = `${currentSeat.room} - ${currentSeat.seatNumber}\n`;
      selectedSeats.append(theP);
   });
   sessionStorage.setItem("bookedSeats", JSON.stringify(sessionSeats));

   // Update Price and Show Checkout Button
   document.querySelector(".total__price span").textContent = `${bookedSeats.length * seatPrice} EGP`;
   if (bookedSeats.length > 0) {
      document.querySelector(".checkout__button").style.display = "flex";
   } else {
      document.querySelector(".checkout__button").style.display = "none";
   }
}
