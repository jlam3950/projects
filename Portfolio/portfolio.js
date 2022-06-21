const hamburg = document.querySelector(".hamburger2");
const sideBar = document.querySelector(".active");

hamburg.addEventListener("click", () =>{
    sideBar.classList.toggle("active");
});

//need to remove actice classlist /w click anywhere