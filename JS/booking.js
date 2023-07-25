let seatPrice = 30;

// Function to expand or collapse a room
function toggleRoom(room) {
   rooms.forEach((otherRoom) => {
      if (otherRoom !== room) {
         otherRoom.classList.remove("expanded");
         otherRoom.querySelector(".seats").classList.add("hidden");
      }
   });

   let seatsElement = room.querySelector(".seats");
   room.classList.toggle("expanded");
   seatsElement.classList.toggle("hidden");

   rooms.forEach((room) => {
      let seatsElement = room.querySelector(".seats");
      if (room.classList.contains("expanded")) {
         seatsElement.style.maxHeight = `${seatsElement.scrollHeight + 4}px`;
      } else {
         seatsElement.style.maxHeight = 0;
      }
   });
}

// Function to change seat status to booked and update selction
function toggleSeatBooking(seat) {
   if (!seat.classList.contains("reserved")) {
      seat.classList.toggle("booked");
      updateSelection();
   }
}

// Function to update the selected seats display
function updateSelection() {
   let selection = document.querySelector(".selected");
   let bookedSeats = document.querySelectorAll(".booked");
   selection.textContent = "";

   // Create Div with Room and Seat Number and Append to bookedSeats
   bookedSeats.forEach((seat) => {
      let currentSeat = {
         seatNumber: seat.textContent,
         room: seat.parentElement.parentElement.querySelector("h2").textContent,
      };
      // let seatDiv = document.createElement("div");
      // seatDiv.className = "seatInSelected";
      // let seatRoom = document.createElement("div");
      // seatRoom.className = "seatRoom";
      // seatRoom.textContent = `${seat.parentElement.parentElement.querySelector("h2").textContent} - `;
      // let seatNumber = document.createElement("div");
      // seatNumber.className = "seatNumber";
      // seatNumber.textContent = seat.textContent;
      // let seatID = seat.getAttribute("data-set-id");

      // seatDiv.append(seatRoom, seatNumber);
      selection.append(`${currentSeat.room} - ${currentSeat.seatNumber}\n`);
   });

   // Update Price and Show Checkout Button
   document.querySelector(".total__price span").textContent = `${bookedSeats.length * seatPrice} EGP`;
   if (bookedSeats.length > 0) {
      document.querySelector(".checkout__button").style.display = "flex";
   } else {
      document.querySelector(".checkout__button").style.display = "none";
   }

   // Update the bookedSeats in the sessionStorage
   let sessionSeats = [];
   bookedSeats.forEach((seat) => {
      let currentSeat = {
         seatNumber: seat.textContent,
         room: seat.parentElement.parentElement.querySelector("h2").textContent,
      };
      sessionSeats.push(currentSeat);
   });
   sessionStorage.setItem("bookedSeats", JSON.stringify(sessionSeats));
}

// Add event listener to each room
let rooms = document.querySelectorAll(".room");
rooms.forEach((room) => {
   room.addEventListener("click", () => toggleRoom(room));
});

// Add event listener to each seat
let seats = document.querySelectorAll(".seat");
seats.forEach((seat) => {
   seat.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleSeatBooking(seat);
   });
});
