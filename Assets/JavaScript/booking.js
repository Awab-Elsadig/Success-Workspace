// Select all the seat elements
const seats = document.querySelectorAll(".seat");
console.log(seats);

// Variable to store the count of booked seats
let bookedCount = 0;

// Price per seat
const pricePerSeat = 30;

// Function to update the total price of booked seats
function updateBookedCount() {
  const totalBooked = document.querySelectorAll(".seat.booked").length;
  const totalPrice = totalBooked * pricePerSeat;
  let totalBookedPrice = document.querySelector(".total-booked-price");

  // Update the text content of the totalBookedPrice element
  totalBookedPrice.textContent = `Total Price: $${totalPrice}`;
}

function handleSeatClick() {
  // Check if the seat is already booked
  if (this.classList.contains("reserved")) {
    return;
  }
  if (this.classList.contains("booked")) {
    this.classList.remove("booked"); // Remove the 'booked' class
    bookedCount--; // Decrement the bookedCount
  } else {
    this.classList.add("booked"); // Add the 'booked' class
    bookedCount++; // Increment the bookedCount
  }

  // Update the total booked count
  updateBookedCount();
}

// Add a click event listener to each seat
seats.forEach((seat) => {
  seat.addEventListener("click", handleSeatClick);
});

// Initialize the total booked count
updateBookedCount();
