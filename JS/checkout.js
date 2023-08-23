const telegramBotApiToken = "5883112226:AAEEPlvFXlxFmevftpWLm0FxVB07YwOUrAo";
const chatId = "1518879748";
const telegramUrl = `https://api.telegram.org/bot${telegramBotApiToken}/sendMessage`;

const selection = document.querySelector(".selected");
const bookedSeats = JSON.parse(sessionStorage.getItem("bookedSeats"));
const form = document.getElementById("form");

displayBookedSeats(selection, document.querySelector(".selected__price"));
displayInfoPopup();

form.addEventListener("submit", async (e) => {
   e.preventDefault();

   const formData = new FormData(form);
   const name = formData.get("name");
   const phone = formData.get("phone");

   const bookingID = generateBookingID();
   sessionStorage.setItem("bookingID", bookingID);

   const text = createTelegramMessage(name, phone);

   try {
      await sendTelegram(text);
      showPopup(true);
   } catch (error) {
      showPopup(false);
   }

   form.reset();
});

async function sendTelegram(text) {
   const data = new URLSearchParams();
   data.append("chat_id", chatId);
   data.append("text", text);

   const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
         "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
   });

   if (!response.ok) {
      throw new Error("Telegram message not sent");
   }
}

function generateBookingID() {
   return Math.floor(Math.random() * 9000) + 1000;
}

function createTelegramMessage(name, phone) {
   const selected = selection.textContent;
   return `Booking:
Name: ${name}
Phone: ${phone}

Selected:
${selected}
Booking ID: #${sessionStorage.getItem("bookingID")}`;
}

function showPopup(isValid) {
   const overlay = document.querySelector(".overlay");
   const popup = document.querySelector(".popup");
   const titleMain = popup.querySelector(".title__main");
   const titleMessage = popup.querySelector(".title__message");
   const seats = document.querySelector(".popup__seats");
   const popupID = document.querySelector(".popup__ID");

   overlay.classList.add("open");
   popup.classList.add("open");

   const path = isValid ? "../Assets/Animations/check.json" : "../Assets/Animations/error.json";
   const shadowColor = isValid ? "limegreen" : "coral";
   titleMain.textContent = isValid ? "Done!" : "Error!";
   titleMessage.textContent = isValid ? "Booking Sent" : "Booking Not Sent";
   popup.style.boxShadow = `0.8rem 0.8rem 0 ${shadowColor}`;

   seats.textContent = "";

   if (isValid) {
      displayPopupSeats(seats, document.querySelector(".popup__price"));
      popupID.textContent = `ID: #${sessionStorage.getItem("bookingID")}`;
   } else {
      document.querySelector(".popup__price").style.display = "none";
      document.querySelector(".popup__ID").style.display = "none";
      document.querySelector(".copy--button").style.display = "none";
      document.querySelector(".close--button").style.display = "none";
   }

   loadAnimation(path);
   overlay.addEventListener("click", closePopup);
   popup.querySelector(".close--button").addEventListener("click", closePopup);
}

function loadAnimation(path) {
   const mark = document.querySelector(".mark");
   mark.style.display = "flex";
   bodymovin.loadAnimation({
      container: mark,
      path: path,
      render: "svg",
      loop: false,
      autoplay: true,
      name: "Checking",
   });
}

function closePopup() {
   const overlay = document.querySelector(".overlay");
   const popup = document.querySelector(".popup");
   const infoPopup = document.querySelector(".info--popup");
   const mark = document.querySelector(".mark");

   overlay.classList.remove("open");
   popup.classList.remove("open");
   infoPopup.classList.remove("open");
   mark.textContent = "";
   console.log("HI");
}

function displayBookedSeats(container, priceElement) {
   bookedSeats.forEach((seat) => {
      const seatInfo = document.createElement("p");
      seatInfo.classList.add("bookedSeat");
      seatInfo.textContent = `${seat.seatNumber} - ${seat.room}\n`;
      container.appendChild(seatInfo);
   });

   priceElement.textContent = `Total: ${sessionStorage.getItem("bookingPrice")}\n`;
}

function displayPopupSeats(container, priceElement) {
   bookedSeats.forEach((seat) => {
      const bookedSeat = document.createElement("div");
      bookedSeat.classList.add("bookedSeat");

      const room = document.createElement("p");
      room.classList.add("popup__seat");
      room.textContent = seat.room;
      bookedSeat.appendChild(room);

      const Seat = document.createElement("p");
      Seat.classList.add("popup__seat");
      Seat.textContent = seat.seatNumber;
      bookedSeat.appendChild(Seat);

      container.append(bookedSeat);
   });

   priceElement.textContent = `Total: ${sessionStorage.getItem("bookingPrice")}\n`;
}

function displayInfoPopup() {
   const overlay = document.querySelector(".overlay");
   const popup = document.querySelector(".info--popup");
   const titleMain = popup.querySelector(".title__main");
   const titleMessage = popup.querySelector(".title__message");
   const mark = document.querySelector(".mark");

   overlay.classList.add("open");
   popup.classList.add("open");
   mark.style.display = "none";

   titleMain.textContent = "تعليمات";
   titleMessage.textContent = "الرجاء قراءة التعليمات جيداً";

   popup.querySelector(".close--button").addEventListener("click", closePopup);
}
