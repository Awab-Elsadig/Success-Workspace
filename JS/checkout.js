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
      seatElement.textContent = `${bookedSeat.room} - ${bookedSeat.seatNumber} \n`;
      seatElement.classList.add("bookedSeat");
      bookedSeatsContainer.append(seatElement);
   });
   const priceElement = document.createElement("h3");
   priceElement.textContent = `\nTotal: ${bookedSeatsData.length * seatPrice} EGP \n`;
   priceElement.classList.add("total__price");
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

// Sending the message to Telegram
// Get form data
const formData = new FormData(document.getElementById("telegramForm"));
const name = formData.get("name");
const phone = formData.get("phone");
const selected = document.querySelector(".selected").textContent;
const bookingID = Math.floor(Math.random() * 1e4);

document.getElementById("telegramForm").addEventListener("submit", function (event) {
   event.preventDefault();

   const telegramBotApiToken = "5883112226:AAEEPlvFXlxFmevftpWLm0FxVB07YwOUrAo";
   const chatId = "1518879748";

   // Construct the Telegram API URL
   const telegramUrl = `https://api.telegram.org/bot${telegramBotApiToken}/sendMessage`;

   // Form the message content
   const text = `Booking:
Name: ${name}
Phone: ${phone}

Selected:
${selected}

Booking ID: #${bookingID}`;

   // Prepare the data to send to Telegram
   const data = new URLSearchParams();
   data.append("chat_id", chatId);
   data.append("text", text);

   // Send message using fetch API
   fetch(telegramUrl, {
      method: "POST",
      headers: {
         "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
   })
      .then((response) => {
         if (response.ok) {
            alert("Message sent successfully!");
         } else {
            alert("Failed to send message. Please try again later.");
         }
      })
      .catch((error) => {
         alert("An error occurred while sending the message. Please try again later.");
      });
});

function showPopup() {
   // Form the message content
   const text = `Name: ${name}
Phone: ${phone}

Selected:
${selected}
ID: #${bookingID}`;
}