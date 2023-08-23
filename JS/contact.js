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
   bodymovin.loadAnimation({
      container: document.querySelector(".mark"),
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
   const mark = document.querySelector(".mark");

   overlay.classList.remove("open");
   popup.classList.remove("open");
   mark.textContent = "";
}
