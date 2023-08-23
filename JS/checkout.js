// let selection = document.querySelector(".selected");
// let bookedSeats = JSON.parse(sessionStorage.getItem("bookedSeats"));

// displayBookedSeats(selection, document.querySelector(".selected__price"));

// let form = document.getElementById("form");
// form.addEventListener("submit", (e) => {
//    e.preventDefault();

//    const formData = new FormData(form);
//    const name = formData.get("name");
//    const phone = formData.get("phone");
//    const selected = document.querySelector(".selected").textContent;
//    const bookingID = Math.floor(Math.random() * 9000) + 1000;
//    sessionStorage.setItem("bookingID", bookingID);

//    const text = `Booking:
// Name: ${name}
// Phone: ${phone}

// Selected:
// ${selected}
// Booking ID: #${bookingID}`;

//    sendTelegram(text);

//    form.reset();
// });

// function sendTelegram(text) {
//       const telegramBotApiToken = "5883112226:AAEEPlvFXlxFmevftpWLm0FxVB07YwOUrAo";
//       const chatId = "1518879748";
//       const telegramUrl = `https://api.telegram.org/bot${telegramBotApiToken}/sendMessage`;

//    // Prepare the data to send to Telegram
//    const data = new URLSearchParams();
//    data.append("chat_id", chatId);
//    data.append("text", text);

//    // Send message using fetch API
//    fetch(telegramUrl, {
//       method: "POST",
//       headers: {
//          "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: data,
//    })
//       .then((response) => {
//          if (response.ok) {
//             showPopup(1);
//          } else {
//             showPopup(2);
//          }
//       })
//       .catch((error) => {
//          showPopup(1);
//       });
// }

// function showPopup(isValid) {
//    let overlay = document.querySelector(".overlay");
//    let popup = document.querySelector(".popup");
//    overlay.classList.add("open");
//    popup.classList.add("open");

//    let path;
//    switch (isValid) {
//       case 1:
//          path = "../Assets/Animations/check.json";
//          popup.style.boxShadow = "0.8rem 0.8rem 0 limegreen";
//          popup.querySelector(".title__main").textContent = "Done!";
//          popup.querySelector(".title__message").textContent = "Booking Sent";
//          let info = document.querySelector(".info");
//          info.textContent = "";
//          bookedSeats.forEach((seat) => {
//             let bookedSeat = document.createElement("div");
//             bookedSeat.classList.add("popup__seat");
//             let theP = document.createElement("p");
//             theP.textContent = seat.room;
//             bookedSeat.appendChild(theP);
//             theP.textContent = seat.seatNumber;
//             bookedSeat.appendChild(theP);
//             info.appendChild(bookedSeat);
//          });

//          let ID = document.createElement("h3");
//          ID.classList.add("bookingID");
//          ID.textContent = `ID: #${sessionStorage.getItem("bookingID")}`;
//          info.appendChild(ID);
//          break;
//       default:
//          path = "../Assets/Animations/error.json";
//          popup.style.boxShadow = "0.8rem 0.8rem 0 coral";
//          popup.querySelector(".title__main").textContent = "Error!";
//          popup.querySelector(".title__message").textContent = "Message Not Sent";
//    }

//    bodymovin.loadAnimation({
//       container: document.querySelector(".mark"),
//       path: path,
//       render: "svg",
//       loop: false,
//       autoplay: true,
//       name: "Checking",
//    });

//    overlay.addEventListener("click", closePopup);
//    document.querySelector(".close--button").addEventListener("click", closePopup);
// }

// function closePopup() {
//    const overlay = document.querySelector(".overlay");
//    const popup = document.querySelector(".popup");
//    const mark = document.querySelector(".mark");

//    overlay.classList.remove("open");
//    popup.classList.remove("open");
//    mark.textContent = "";
// }

// function copyID() {
//    let tempInput = document.createElement("input");
//    let ID = document.querySelector(".id");
// }

// function displayBookedSeats(container, priceElement) {
//    let bookedSeats = JSON.parse(sessionStorage.getItem("bookedSeats"));
//    bookedSeats.forEach((seat) => {
//       let theP = document.createElement("p");
//       theP.classList.add("bookedSeat");
//       theP.textContent = `${seat.seatNumber} - ${seat.room}\n`;
//       container.appendChild(theP);
//    });

//    priceElement.textContent = `Total: ${sessionStorage.getItem("bookingPrice")}\n`;
// }

// ##############################################################
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
   titleMessage.textContent = isValid ? "Booking Sent" : "Message Not Sent";
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
