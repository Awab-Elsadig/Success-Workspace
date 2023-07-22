const rooms = document.querySelectorAll(".room");

rooms.forEach((room) => {
   const seats = room.querySelector(".seats");

   room.addEventListener("click", () => {
      seats.classList.toggle("hidden");
      if (!seats.classList.contains("hidden")) {
         seats.style.maxHeight = `${seats.scrollHeight}px`;
      } else {
         seats.style.maxHeight = "0";
      }
   });

   // Prevent click event propagation from seats to room
   const roomSeats = room.querySelectorAll(".seat");
   roomSeats.forEach((seat) => {
      seat.addEventListener("click", (event) => {
         event.stopPropagation();
         seat.classList.toggle("booked");
      });
   });
});
