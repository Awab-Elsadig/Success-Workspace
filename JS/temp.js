function getBookedSeatsData() {
   const bookedSeatsData = JSON.parse(sessionStorage.getItem("bookedSeats")) || [];
   return bookedSeatsData;
}

function displayBookedSeats(bookedSeatsData, bookedSeatsContainer) {
   bookedSeatsContainer.innerHTML = "";

   // Add each seat information
   bookedSeatsData.forEach((bookedSeat) => {
      const seatElement = document.createElement("p");
      seatElement.classList.add("bookedSeat");
      seatElement.textContent = `${bookedSeat.room} - ${bookedSeat.seatNumber} \n`;
      bookedSeatsContainer.append(seatElement);
   });

   // Add price element
   const priceElement = document.createElement("h3");
   priceElement.classList.add("price");
   priceElement.textContent = `\nTotal: ${sessionStorage.getItem("bookingPrice")}`;
   bookedSeatsContainer.append(priceElement);
}

// Initialize the checkout page
window.onload = () => {
   const bookedSeatsData = getBookedSeatsData();
   const bookedSeatsContainer = document.querySelector(".selected");
   displayBookedSeats(bookedSeatsData, bookedSeatsContainer);
};

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

   // Button to Close Popup
   document.querySelector(".close-button").addEventListener("click", closePopup);

   sendTelegram(text);
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
            showPopup(1);
         } else {
            showPopup(2);
         }
      })
      .catch((error) => {
         showPopup(3);
      });
}

function showPopup(isValid) {
   let overlay = document.querySelector(".overlay");
   let popup;
   let path;
   let mark;
   overlay.classList.add("open");

   switch (isValid) {
      case 1:
         mark = document.querySelector(".check-mark");
         popup = document.querySelector(".popup.good");
         path = "../Assets/Animations/check.json";
         popup.style.boxShadow = "0.8rem 0.8rem 0 limegreen";
         popup.classList.add("open");
         popup.querySelector(".title").textContent = "Done!";
         popup.querySelector(".info").textContent = "Message Sent";
         break;

      default:
         mark = document.querySelector(".error-mark");
         popup = document.querySelector(".popup.bad");
         path = "../Assets/Animations/error.json";
         popup.style.boxShadow = "0.8rem 0.8rem 0 coral";
         popup.classList.add("open");
         popup.querySelector(".title").textContent = "Error!";
         popup.querySelector(".info").textContent = "Message Not Sent";
   }

   bodymovin.loadAnimation({
      container: mark,
      path: path,
      render: "svg",
      loop: false,
      autoplay: true,
      name: "Checking",
   });

   overlay.addEventListener("click", closePopup);
}

function closePopup() {
   const overlay = document.querySelector(".overlay");
   const popups = document.querySelectorAll(".popup");
   const marks = document.querySelectorAll(".mark");

   overlay.classList.remove("open");
   popups.forEach((ele) => {
      ele.classList.remove("open");
   });
   marks.forEach((ele) => {
      ele.textContent = "";
   });
}

function copyID() {
   let tempInput = document.createElement("input");
   let ID = document.querySelector(".bookingID");
}
