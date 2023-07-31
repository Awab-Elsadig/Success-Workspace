let theAs = document.querySelectorAll(".test");

// Set default values to sessionStorage if unvailable on window load
window.onload = () => {
   // If no values available
   if (sessionStorage.getItem("valuesAvailable") === null) {
      theAs.forEach((a) => {
         sessionStorage.setItem(`Test ${a.getAttribute("set-id")}`, false);
      });
      sessionStorage.setItem("valuesAvailable", true);
   } else {
      // If there is values
      theAs.forEach((a) => {
         JSON.parse(sessionStorage.getItem(`Test ${a.getAttribute("set-id")}`)) ? a.classList.add("clicked") : a.classList.remove("clicked");
      });
   }
};

// Function to add the clicked class
theAs.forEach((a) => {
   a.onclick = () => {
      a.classList.toggle("clicked");
      JSON.parse(sessionStorage.getItem(`Test ${a.getAttribute("set-id")}`)) ? sessionStorage.setItem(`Test ${a.getAttribute("set-id")}`, false) : sessionStorage.setItem(`Test ${a.getAttribute("set-id")}`, true);
      console.log(sessionStorage.getItem(`Test ${a.getAttribute("set-id")}`));
   };
});