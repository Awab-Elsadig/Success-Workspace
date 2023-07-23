// let rooms = document.querySelectorAll(".room");

// // Loop on each room
// rooms.forEach((room) => {
//    room.addEventListener("click", () => {
//       // Expand the toggled room and remover toggle from any other room
//       rooms.forEach((otherRoom) => {
//          if (otherRoom !== room) {
//             otherRoom.classList.remove("expanded");
//             otherRoom.querySelector(".seats").classList.add("hidden");
//          }
//       });

//       let seatsElement = room.querySelector(".seats");
//       room.classList.toggle("expanded");
//       seatsElement.classList.toggle("hidden");

//       rooms.forEach((room) => {
//          let seatsElement = room.querySelector(".seats");
//          if (room.classList.contains("expanded")) {
//             seatsElement.style.maxHeight = `${seatsElement.scrollHeight}px`;
//          } else {
//             seatsElement.style.maxHeight = 0;
//          }
//       });

//       // Change Seat to booked
//       let seats = seatsElement.querySelectorAll(".seat");
//       seats.forEach((seat) => {
//          seat.addEventListener("click", (event) => {
//             event.stopPropagation();
//             if (!(seat.classList.contains === "reserved")) {
//                seat.classList.toggle("booked");
//                updateSelection();
//                updatePrice();
//             }
//          });
//       });

//       function updateSelection() {
//          let selection = document.querySelector(".selected");
//          let bookedSeatsOld = document.querySelectorAll(".booked");
//          let bookedSeats = new Set();
//          bookedSeatsOld.forEach((seat) => {
//             let theSeatP = document.createElement("p");
//             theSeatP.textContent = `${seat.parentElement.parentElement.querySelector("h2").textContent} - ${seat.textContent}`;
//             bookedSeats.add(theSeatP);
//          });
//          selection.textContent = "";
//          bookedSeats.forEach((seat) => selection.append(seat));
//          // bookedSeats.forEach((seat) => selection.append(seat.textContent));
//          document.querySelector(".total__price span").textContent = `${bookedSeats.size * 30} EGP`;
//       }
//    });
// });

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

// Function to change seat status to booked
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
      let theSeatP = document.createElement("p");
      theSeatP.textContent = `${seat.parentElement.parentElement.querySelector("h2").textContent} - ${seat.textContent}`;
      bookedSeats.add(theSeatP);
   });

   selection.textContent = "";
   bookedSeats.forEach((seat) => selection.append(seat));

   document.querySelector(".total__price span").textContent = `${bookedSeats.size * 30} EGP`;
   bookedSeats.size > 0 ? document.querySelector(".checkout__button").style.display = "flex" : document.querySelector(".checkout__button").style.display = "none";
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
