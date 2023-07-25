let selection = document.querySelector(".selected");

let bookedSeatsData = JSON.parse(sessionStorage.getItem("bookedSeats"));
bookedSeatsData.forEach((seat) => {
   let theP = document.createElement("p");
   theP.className = "seat";
   theP.textContent = `${seat.room} - ${seat.seatNumber}`;
   selection.append(theP);
});
selection.append(document.createElement("br"));
let theH2 = document.createElement("h2");
theH2.className = "total__price";
theH2.textContent = `Total: ${bookedSeatsData.length * 30   }EGP`;

selection.append(theH2);
