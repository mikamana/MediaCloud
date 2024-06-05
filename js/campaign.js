const menuBtn = document.querySelector(".arrow");
const sideBar = document.querySelector(".sidemenu");
const menuBtnOpen = document.querySelector(".arrow_menu_open_wrap");

menuBtn.addEventListener("click", (e) => {
  sideBar.classList.remove("active");
  setTimeout(() => {
    sideBar.style.visibility = "hidden";
    sideBar.style.opacity = "0";
  }, 1);
  menuBtnOpen.style.display = "block";
});

menuBtnOpen.addEventListener("click", (e) => {
  sideBar.classList.add("active");
  setTimeout(() => {
    sideBar.style.visibility = "visible";
    sideBar.style.opacity = "1";
  }, 1);
  menuBtnOpen.style.display = "none";
});
