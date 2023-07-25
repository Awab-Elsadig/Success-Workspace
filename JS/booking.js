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
         seatsElement.style.maxHeight = `${seatsElement.scrollHeight}px`;
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
   let bookedSeatsOld = document.querySelectorAll(".booked");
   let bookedSeats = new Set();

   bookedSeatsOld.forEach((seat) => {
      let seatDiv = document.createElement("div");
      seatDiv.className = "seatInSelected";
      let seatRoom = document.createElement("div");
      seatRoom.className = "seatRoom";
      seatRoom.textContent = `${seat.parentElement.parentElement.querySelector("h2").textContent} - `;
      let seatNumber = document.createElement("div");
      seatNumber.className = "seatNumber";
      seatNumber.textContent = seat.textContent;
      seatDiv.append(seatRoom, seatNumber);
      bookedSeats.add(seatDiv);
   });

   selection.textContent = "";
   bookedSeats.forEach((seat) => {
      selection.append(seat);
   });

   bookedSeats.forEach((seat) => {
      sessionStorage.setItem(seat, JSON.stringify(seat));
   });

   document.querySelector(".total__price span").textContent = `${bookedSeats.size * 30} EGP`;
   bookedSeats.size > 0 ? (document.querySelector(".checkout__button").style.display = "flex") : (document.querySelector(".checkout__button").style.display = "none");
}

// Add event listener to each room
let rooms = document.querySelectorAll(".room");
rooms.forEach((room) => {
   room.addEventListener("click", () => toggleRoom(room));
});

let seats = document.querySelectorAll(".seat");
seats.forEach((seat) => {
   seat.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleSeatBooking(seat);
   });
});
