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
   const priceElement = document.querySelector("price");
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

// Sent the data to Telegram
const theForm = document.getElementById("telegramForm");
theForm.addEventListener("submit", (event) => {
   event.preventDefault();

   const formData = new FormData(theForm);
   const name = formData.get("name");
   const phone = formData.get("phone");
   const selected = document.querySelector(".selected").textContent;
   const bookingID = Math.floor(Math.random() * 1e4);

   const text = `Booking:
Name: ${name}
Phone: ${phone}

Selected:
${selected}
Booking ID: #${bookingID}`;

   document.querySelector(".close-button").addEventListener("click", () => closePopup());

   // sendTelegram(text);
   showPopup(text, true);

   theForm.reset();
});

function sendTelegram(text) {
   const telegramBotApiToken = "5883112226:AAEEPlvFXlxFmevftpWLm0FxVB07YwOUrAo";
   const chatId = "1518879748";
   const telegramUrl = `https://api.telegram.org/bot${telegramBotApiToken}/sendMessage`;

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
}

function showPopup(text, isValid) {
   const overlay = document.querySelector(".overlay");
   let popup;
   if (isValid) {
      popup = document.querySelector(".popup.good");
      popup.querySelector(".info").textContent = text;
   } else {
      popup = document.querySelector(".popup.bad");
   }
   overlay.classList.add("open");
   popup.classList.add("open");

   bodymovin.loadAnimation({
      container: isValid ? document.querySelector(".check-mark") : document.querySelector(".error-mark"),
      path: isValid ? "../Assets/Animations/check.json" : "../Assets/Animations/error.json",
      render: "svg",
      loop: false,
      autoplay: true,
      name: "Checking",
   });
}

function closePopup() {
   const overlay = document.querySelector(".overlay");
   const popup = document.querySelector(".popup");
   const mark = document.querySelector(".mark");

   overlay.classList.remove("open");
   popup.classList.remove("open");
   mark.textContent = "";
}
