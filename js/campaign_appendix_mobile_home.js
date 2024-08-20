var swiper = new Swiper('.mySwiper', {
  slidesPerView: '1.2',
  centeredSlides: true,
  pagination: {
    el: ' .swiper-pagination',
    type: 'progressbar',
  },
});

const gnbMenuLi = document.querySelectorAll(".gnb_list > li");

gnbMenuLi.forEach((node, idx) => {

  node.addEventListener("mouseenter", (e) => {

    gnbMenuLi.forEach((li) => li.classList.remove("active"));
    e.target.classList.add("active");


  });

});

const userWrap = document.querySelector(".user_wrap");
const userImg = document.querySelector(".user_img_wrap");
const userList = document.querySelector(".user_list");
const userListLi = document.querySelectorAll(".user_list > li");
const slide1 = document.querySelector(".slide1 > .slide-inner > .slide-img > img");


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

    console.log(e.target.innerText);

    if (user.name === "사용자 A") {
      slide1.src = "../images/mobile/A.png"
    } else if (user.name === "사용자 B") {
      slide1.src = "../images/mobile/B.png"
    }

  });

});

const closeBtn = document.querySelector(".close_btn");
const aside = document.querySelector(".aside");
closeBtn.addEventListener("click", (e) => {

  aside.style.display = "none";

})