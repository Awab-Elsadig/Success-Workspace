document.getElementById("telegramForm").addEventListener("submit", function (event) {
   event.preventDefault();

   // Get form data
   const formData = new FormData(event.target);
   const name = formData.get("name");
   const phone = formData.get("phone__number");

   // Telegram API Token (Replace 'YOUR_TELEGRAM_BOT_API_TOKEN' with your actual bot API token)
   const telegramBotApiToken = "5883112226:AAEEPlvFXlxFmevftpWLm0FxVB07YwOUrAo";
   const chatId = "1518879748"; // Replace with the chat ID where you want to send the message

   // Construct the Telegram API URL
   const telegramUrl = `https://api.telegram.org/bot${telegramBotApiToken}/sendMessage`;

   // Form the message content
   const text = `Monthly Membership:
Name: ${name}
Phone Number: ${phone}`;

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
