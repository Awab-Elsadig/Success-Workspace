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

document.getElementById("telegramForm").addEventListener("submit", (event) => {
   event.preventDefault();

   // Get form data
   const formData = new FormData(event.target);
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

   if (isAdmin) {
      console.log("HELLO FROM IF");
      window.location.href = "../test.html";
   } else {
      const telegramBotApiToken = "5883112226:AAEEPlvFXlxFmevftpWLm0FxVB07YwOUrAo";
      const chatId = "1518879748";
      const telegramUrl = `https://api.telegram.org/bot${telegramBotApiToken}/sendMessage`;

      // Form the message content
      const text = `Message:
Name: ${name}
Phone Number: ${phone}

Message:
${message}`;

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

   // Clear form inputs
   document.querySelector("form .name__input").value = "";
   document.querySelector("form .phone__input").value = "";
   document.querySelector("form .message__input").value = "";
});

function showPopup(isValid) {
   let overlay = document.querySelector(".overlay");
   let popup = document.querySelector(".popup");
   overlay.classList.add("open");
   popup.classList.add("open");

   let path;
   switch (isValid) {
      case 1:
         path = "../Assets/Animations/check.json";
         break;
      default:
         path = "../Assets/Animations/error.json";
   }

   bodymovin.loadAnimation({
      container: document.querySelector(".mark"),
      path: path,
      render: "svg",
      loop: false,
      autoplay: true,
      name: "Checking",
   });

   overlay.onclick = closePopup();
}

function closePopup() {
   const overlay = document.querySelector(".overlay");
   const popup = document.querySelector(".popup");
   const mark = document.querySelector(".mark");

   overlay.classList.remove("open");
   popup.classList.remove("open");
   mark.textContent = "";
}
