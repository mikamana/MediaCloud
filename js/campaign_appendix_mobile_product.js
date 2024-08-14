

var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const userWrap = document.querySelector(".user_wrap");
const userImg = document.querySelector(".user_img_wrap");
const userList = document.querySelector(".user_list");
const userListLi = document.querySelectorAll(".user_list > li");
const banner = document.querySelector(".event_banner > a > img");


const user = { name: "" };

userImg.addEventListener("mouseenter", (e) => {

  userList.style.display = "block";

});

userList.addEventListener("mouseleave", (e) => {

  userList.style.display = "none";

});



userListLi.forEach((node, index) => {

  node.addEventListener("click", (e) => {

    userListLi.forEach((nd) => {

      nd.classList.remove("active");

    });

    e.target.classList.add("active");

    user.name = e.target.innerText;

    if (user.name === "사용자 A") {
      banner.src = "../images/mobile/A.png"
    } else if (user.name === "사용자 B") {
      banner.src = "../images/mobile/B.png"
    }

  });

});