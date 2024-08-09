var swiper = new Swiper(".mySwiper", {
  slidesPerView: 2.94,
  initialSlide: 0,
  freeMode: false,
  loop: true, // 슬라이드 루프(무한 회전) 활성화
  autoplay: {
    delay: 3000, // 3초마다 자동 재생
    disableOnInteraction: false // 사용자 상호 작용 후에도 자동 재생 유지
  },
  // centeredSlides: true,
  spaceBetween: 40,
  slidesOffsetBefore: -40,
  slidesOffsetAfter: 1000,
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

const visualBannerPersonal = document.querySelector(".slide_personal > a > img");
visualBannerPersonal.src = "../images/appendix/banner_personal_2.png";

const bannerPersonal = document.querySelector(".event_banner_wrap > a > img");
bannerPersonal.src = "../images/appendix/B.png";
