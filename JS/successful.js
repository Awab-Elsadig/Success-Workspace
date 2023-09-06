const mark = document.querySelector(".mark");
const path = "../Assets/Animations/check.json";

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

window.onload = setTimeout(() => {
   loadAnimation(path)
}, 1000);;
