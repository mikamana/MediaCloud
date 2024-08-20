var swiper = new Swiper(".mySwiper", {
  slidesPerView: 2.94,
  initialSlide: 0,
  freeMode: false,
  centeredSlides: true,
  loop: true, // 슬라이드 루프(무한 회전) 활성화/
  autoplay: {
    delay: 7000, // 3초마다 자동 재생
    disableOnInteraction: false // 사용자 상호 작용 후에도 자동 재생 유지
  },
  spaceBetween: 40,
  slidesOffsetBefore: 330,
  // slidesOffsetAfter: 20,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
    renderFraction: function (currentClass, totalClass) { // type이 fraction일 때 사용
      return `<span class="${currentClass}"></span> / <span class="${totalClass}"></span>`;
    }
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const pauseButton = document.querySelector(".pause");
pauseButton.addEventListener("click", (event) => {

  swiper.autoplay.pause();

  if (swiper.autoplay.paused) {
    pauseButton.style.backgroundImage = 'url("../images/appendix/pause.png")'
  } else {
    pauseButton.style.backgroundImage = 'url("../images/appendix/pause_active.png")'
  }

});

// 사이트의 회원을 선택하면 회원에 맞게 배너가 변경되도록 작업
// 가변적으로 보여

const visualBannerPersonal = document.querySelector(".slide_personal > a > img");
// visualBannerPersonal.src = "../images/appendix/banner_personal_2.png";

const bannerPersonal = document.querySelector(".event_banner_wrap > a > img");
// bannerPersonal.src = "../images/appendix/B.png";



const userWrap = document.querySelector(".user_wrap");
const userImg = document.querySelector(".user_img_wrap");
const userList = document.querySelector(".user_list");
const userListLi = document.querySelectorAll(".user_list > li");
const slide1 = document.querySelector(".slide1 > a > img");
const slide2 = document.querySelector(".event_banner_wrap > a > img");


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
      slide1.src = "../images/appendix/banner1.png"
      slide2.src = "../images/appendix/A.png"
    } else if (user.name === "사용자 B") {
      slide1.src = "../images/appendix/banner5.png"
      slide2.src = "../images/appendix/B.png"
    }

  });

});

const closeBtn = document.querySelector(".close_btn_wrap");
const aside = document.querySelector(".aside");

closeBtn.addEventListener("click", (e) => {

  aside.style.display = "none";

});


