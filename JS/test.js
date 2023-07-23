window.onload = () => {
   document.querySelectorAll(".test").forEach((a) => {
      console.log(`This is for test number ${a.getAttribute("set-id")}: ${sessionStorage.getItem(a.getAttribute("set-id"))}`);
      const isClicked = sessionStorage.getItem(a.getAttribute("set-id"));
      if (isClicked === "true") {
         a.classList.add("clicked");
      } else {
         a.classList.remove("clicked");
      }
   });

   
};

document.querySelectorAll(".test").forEach((a) => {
   a.addEventListener("click", () => {
      a.classList.toggle("clicked");
      const isClicked = a.classList.contains("clicked");
      sessionStorage.setItem(a.getAttribute("set-id"), isClicked);
   });
});
