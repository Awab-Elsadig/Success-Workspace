<<<<<<< HEAD
let admins = new Set([
   {
      name: "Awab",
      id: 325464,
      message: "adminPage",
   },
   {
      name: "Yousif",
      id: 54123,
      message: "adminPage",
   },
   {
      name: "test",
      id: 111,
      message: "111",
   },
]);

// GET Form Data
let form = document.getElementById("telegramForm");
const formData = new FormData(form);
const name = formData.get("name");
const phone = formData.get("phone__number");
const message = formData.get("message");

// Check if the user is an admin
let isAdmin = false;
admins.forEach((ele) => {
   if (name === ele.name && +phone === ele.id && message === ele.message) {
      isAdmin = true;
      sessionStorage.setItem("admin", ele.name);
   }
});

// On Form Submit
form.addEventListener("submit", (event) => {
   event.preventDefault();
   if (isAdmin) {
      window.location.href = "../test.html";
   } else {
      console.log("Hello");
      sendTelegram();
   }
});

// Function to show popup
function showPopup(isValid) {
   let overlay = document.querySelector(".overlay");
   let popup = document.querySelector(".popup");
   overlay.classList.add("open");
   popup.classList.add("open");

   let path;
   switch (isValid) {
      case 1:
         path = "../Assets/Animations/check.json";
         popup.style.boxShadow = "0.8rem 0.8rem 0 limegreen";
         popup.querySelector(".title").textContent = "Done!";
         popup.querySelector(".info").textContent = "Message Sent";
         break;
      default:
         path = "../Assets/Animations/error.json";
         popup.style.boxShadow = "0.8rem 0.8rem 0 coral";
         popup.querySelector(".title").textContent = "Error!";
         popup.querySelector(".info").textContent = "Message Not Sent";
   }

=======
const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
   e.preventDefault();

   const formData = new FormData(form);
   const name = formData.get("name");
   const phone = formData.get("phone");
   const message = formData.get("message");

   const text = createTelegramMessage(name, phone, message);

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

function createTelegramMessage(name, phone, message) {
   return `Message:
Name: ${name}
Phone: ${phone}

Message:
${message}`;
}

function showPopup(isValid) {
   const overlay = document.querySelector(".overlay");
   const popup = document.querySelector(".popup");
   const titleMain = popup.querySelector(".title__main");
   const titleMessage = popup.querySelector(".title__message");

   overlay.classList.add("open");
   popup.classList.add("open");

   const path = isValid ? "../Assets/Animations/check.json" : "../Assets/Animations/error.json";
   const shadowColor = isValid ? "limegreen" : "coral";
   titleMain.textContent = isValid ? "Done!" : "Error!";
   titleMessage.textContent = isValid ? "Booking Sent" : "Message Not Sent";
   popup.style.boxShadow = `0.8rem 0.8rem 0 ${shadowColor}`;

   loadAnimation(path);
   overlay.addEventListener("click", closePopup);
   document.querySelector(".close--button").addEventListener("click", closePopup);
}

function loadAnimation(path) {
>>>>>>> 2380477 (All files)
   bodymovin.loadAnimation({
      container: document.querySelector(".mark"),
      path: path,
      render: "svg",
      loop: false,
      autoplay: true,
      name: "Checking",
   });
<<<<<<< HEAD

   overlay.addEventListener("click", closePopup);
}

// Function to close popup
=======
}

>>>>>>> 2380477 (All files)
function closePopup() {
   const overlay = document.querySelector(".overlay");
   const popup = document.querySelector(".popup");
   const mark = document.querySelector(".mark");

   overlay.classList.remove("open");
   popup.classList.remove("open");
   mark.textContent = "";
}
<<<<<<< HEAD

// Function to send to Telegram
function sendTelegram() {
   // Form the message content
   const text = `Message:
   Name: ${name}
   Phone Number: ${phone}
   
   Message:
   ${message}`;

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

   // Reset Form
   form.querySelectorAll(["input", "textarea"]).forEach((ele) => (ele.value = ""));
}
=======
>>>>>>> 2380477 (All files)
