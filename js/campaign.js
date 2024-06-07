dayjs().format();

const menuBtn = document.querySelector(".arrow");
const sideBar = document.querySelector(".sidemenu");
const menuBtnOpen = document.querySelector(".arrow_menu_open_wrap");
const titleInfo = document.querySelector(".title_info");

const toggleSidebar = (isOpen) => {
  sideBar.classList.toggle("active", isOpen);
  sideBar.style.visibility = isOpen ? "visible" : "hidden";
  sideBar.style.opacity = isOpen ? "1" : "0";
  menuBtnOpen.style.display = isOpen ? "none" : "block";
};

menuBtn.addEventListener("click", () => toggleSidebar(false));
menuBtnOpen.addEventListener("click", () => toggleSidebar(true));

/* 객체 데이터 하나로 묶기 */
// 광고 목표 리스트
const adList = document.querySelectorAll(".select_list > li > button");
let adObject = {};

adList.forEach((node) => {
  node.addEventListener("click", (e) => {
    adObject.type = e.target.innerText;
    adList.forEach((nd) => {
      nd.style.border = "none";
    });
    e.target.style.border = "1px solid #000";
  });
});

// 캠페인 이름

// 캠페인 기간

// 디바이스
const deviceList = document.querySelectorAll(".device_list > li > button");
deviceList.forEach((node) => {
  node.addEventListener("click", (e) => {
    adObject.device = e.target.innerText;
    deviceList.forEach((nd) => {
      nd.style.border = "none";
    });
    e.target.style.border = "1px solid #000";
  });
});

/* deviceList.forEach((node) => {
  node.addEventListener("click", (e) => {
    deviceList.forEach((nd) => {
      nd.style.border = "none";
    });
    e.target.style.border = "1px solid #000";
  });
}); */

// 배너
const bannerList = document.querySelectorAll(".banner_list > li");

bannerList.forEach((node) => {
  node.addEventListener("click", (e) => {
    bannerList.forEach((nd) => {
      nd.style.border = "1px solid #e4e4e4";
    });
    e.currentTarget.style.border = "1px solid #000";
  });
});

// 상품 구매하기 클릭
const purchaseBtn = document.querySelector(".purchase_button");

purchaseBtn.addEventListener("click", (e) => {
  const campaignName = document.querySelector(".campaign_name_input");
  adObject.name = campaignName.value;
  console.log(adObject);
});

/*********************************  객체 데이터 하나로 묶기 *********************************/

// 슬라이드 기능
const slideList = document.querySelector(".banner_list");
const slideLeftBtn = document.querySelector(".left_btn");
const slideRightBtn = document.querySelector(".right_btn");
const slideCarousel = document.querySelectorAll(".carousel_list > li");

let currentIndex = 0;
let startX = 0;
let isDragging = false;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;

const fnCarousel = (index) => {
  slideCarousel.forEach((val) => val.classList.remove("active"));
  slideCarousel[index].classList.add("active");

  const leftBtnImg = document.querySelector(".left_btn img");
  const rightBtnImg = document.querySelector(".right_btn img");

  if (index === 0) {
    leftBtnImg.src = "../images/campaign/left.png";
    rightBtnImg.src = "../images/campaign/right.png";
    leftBtnImg.style.rotate = "0deg";
    rightBtnImg.style.rotate = "0deg";
  } else if (index === 1) {
    leftBtnImg.src = "../images/campaign/right.png";
    rightBtnImg.src = "../images/campaign/left.png";
    leftBtnImg.style.rotate = "180deg";
    rightBtnImg.style.rotate = "180deg";
  }
};

const setSliderPosition = () => {
  slideList.style.transform = `translateX(${currentTranslate}px)`;
};

const setPositionByIndex = () => {
  const slideWidth = slideList.clientWidth;
  currentTranslate = -currentIndex * (slideWidth + 48);
  prevTranslate = currentTranslate;
  setSliderPosition();
};

slideLeftBtn.addEventListener("click", () => {
  currentIndex =
    currentIndex === 0 ? slideCarousel.length - 1 : currentIndex - 1;
  setPositionByIndex();
  fnCarousel(currentIndex);
});

slideRightBtn.addEventListener("click", () => {
  currentIndex =
    currentIndex === slideCarousel.length - 1 ? 0 : currentIndex + 1;
  setPositionByIndex();
  fnCarousel(currentIndex);
});

const startDragging = (position) => {
  startX = position;
  isDragging = true;
  slideList.classList.add("grabbing");
  animationID = requestAnimationFrame(animation);
};

const stopDragging = () => {
  if (!isDragging) return;
  isDragging = false;
  cancelAnimationFrame(animationID);
  slideList.classList.remove("grabbing");

  const movedBy = currentTranslate - prevTranslate;
  if (movedBy < -50 && currentIndex < slideCarousel.length - 1)
    currentIndex += 1;
  if (movedBy > 50 && currentIndex > 0) currentIndex -= 1;

  setPositionByIndex();
  fnCarousel(currentIndex);
};

const moveSlider = (position) => {
  if (!isDragging) return;

  const moveAmount = position - startX;

  // Prevent dragging beyond first and last slides
  if (
    (currentIndex === 0 && moveAmount > 0) ||
    (currentIndex === slideCarousel.length - 1 && moveAmount < 0)
  )
    return;

  currentTranslate = prevTranslate + moveAmount;
  setSliderPosition();
};

slideList.addEventListener("mousedown", (e) => startDragging(e.pageX));
slideList.addEventListener("mouseup", stopDragging);
slideList.addEventListener("mouseleave", stopDragging);
slideList.addEventListener("mousemove", (e) => moveSlider(e.pageX));

slideList.addEventListener("touchstart", (e) =>
  startDragging(e.touches[0].clientX)
);
slideList.addEventListener("touchend", stopDragging);
slideList.addEventListener("touchmove", (e) =>
  moveSlider(e.touches[0].clientX)
);

const animation = () => {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
};

/* const menuBtn = document.querySelector(".arrow");
const sideBar = document.querySelector(".sidemenu");
const menuBtnOpen = document.querySelector(".arrow_menu_open_wrap");
const titleInfo = document.querySelector(".title_info");

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


const slideList = document.querySelector(".banner_list");
const slideLeftBtn = document.querySelector(".left_btn");
const slideRightBtn = document.querySelector(".right_btn");
const slideCarousel = document.querySelectorAll(".carousel_list > li");

let currentIndex = 0;
let startX = 0;
let isDragging = false;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;

const fnCarousel = (index) => {
  slideCarousel.forEach((val) => val.classList.remove("active"));
  slideCarousel[index].classList.add("active");
  let leftBtnImg = document.querySelector(".left_btn img");
  let rightBtnImg = document.querySelector(".right_btn img");

  if (index === 0) {
    leftBtnImg.src = "../images/campaign/left.png";
    leftBtnImg.style.rotate = "0deg";
    rightBtnImg.src = "../images/campaign/right.png";
    rightBtnImg.style.rotate = "0deg";
  } else if (index === 1) {
    leftBtnImg.src = "../images/campaign/right.png";
    leftBtnImg.style.rotate = "180deg";
    rightBtnImg.src = "../images/campaign/left.png";
    rightBtnImg.style.rotate = "180deg";
  }
};

const fnSlide = (index) => {
  const slideWidth = slideList.clientWidth;
  currentTranslate = -index * slideWidth;
  prevTranslate = currentTranslate;

  setSliderPosition();
};

slideCarousel.forEach((val, idx) => {
  val.addEventListener("click", () => {
    currentIndex = idx;
    fnCarousel(currentIndex);
    fnSlide(currentIndex);
  });
});

const setPositionByIndex = () => {
  const slideWidth = slideList.clientWidth;
  currentTranslate = -currentIndex * (slideWidth + 48);
  prevTranslate = currentTranslate;
  setSliderPosition();
};

const setSliderPosition = () => {
  slideList.style.transform = `translateX(${currentTranslate}px)`;
};

slideLeftBtn.addEventListener("click", () => {
  currentIndex =
    currentIndex === 0 ? slideCarousel.length - 1 : currentIndex - 1;
  setPositionByIndex();
  fnCarousel(currentIndex);
});

slideRightBtn.addEventListener("click", () => {
  currentIndex =
    currentIndex === slideCarousel.length - 1 ? 0 : currentIndex + 1;
  setPositionByIndex();
  fnCarousel(currentIndex);
});

slideList.addEventListener("mousedown", (e) => {
  startX = e.pageX;
  isDragging = true;
  slideList.classList.add("grabbing");
  animationID = requestAnimationFrame(animation);
});

slideList.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;
  cancelAnimationFrame(animationID);
  slideList.classList.remove("grabbing");
  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -50 && currentIndex < slideCarousel.length - 1)
    currentIndex += 1;
  if (movedBy > 50 && currentIndex > 0) currentIndex -= 1;

  if (currentIndex >= slideCarousel.length) {
    currentIndex = 0;
  }
  if (currentIndex < 0) {
    currentIndex = slideCarousel.length - 1;
  }

  setPositionByIndex();
  fnCarousel(currentIndex);
});

slideList.addEventListener("mouseleave", () => {
  if (isDragging) {
    isDragging = false;
    cancelAnimationFrame(animationID);
    slideList.classList.remove("grabbing");
    setPositionByIndex();
  }
});

slideList.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const currentPosition = e.pageX;
    const moveAmount = currentPosition - startX;

    // currentIndex가 0일 때 왼쪽으로 드래그 방지
    if (currentIndex === 0 && moveAmount > 0) return;

    // currentIndex가 마지막일 때 오른쪽으로 드래그 방지
    if (currentIndex === slideCarousel.length - 1 && moveAmount < 0) return;

    currentTranslate = prevTranslate + moveAmount;
    setSliderPosition();
  }
});

slideList.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
  slideList.classList.add("grabbing");
  animationID = requestAnimationFrame(animation);
});

slideList.addEventListener("touchend", () => {
  if (!isDragging) return;
  isDragging = false;
  cancelAnimationFrame(animationID);
  slideList.classList.remove("grabbing");
  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -50 && currentIndex < slideCarousel.length - 1)
    currentIndex += 1;
  if (movedBy > 50 && currentIndex > 0) currentIndex -= 1;

  if (currentIndex >= slideCarousel.length) {
    currentIndex = 0;
  }
  if (currentIndex < 0) {
    currentIndex = slideCarousel.length - 1;
  }

  setPositionByIndex();
  fnCarousel(currentIndex);
});

slideList.addEventListener("touchmove", (e) => {
  if (isDragging) {
    const currentPosition = e.touches[0].clientX;
    const moveAmount = currentPosition - startX;

    // currentIndex가 0일 때 왼쪽으로 드래그 방지
    if (currentIndex === 0 && moveAmount > 0) return;

    // currentIndex가 마지막일 때 오른쪽으로 드래그 방지
    if (currentIndex === slideCarousel.length - 1 && moveAmount < 0) return;

    currentTranslate = prevTranslate + moveAmount;
    setSliderPosition();
  }
});

const animation = () => {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
};
 */

/*
슬라이드 드래그 기능 X
const slideList = document.querySelector(".banner_list");
const slideLeftBtn = document.querySelector(".left_btn");
const slideRightBtn = document.querySelector(".right_btn");
const slideCarousel = document.querySelectorAll(".carousel_list > li");

let currentIndex = 0;

const fnCarousel = (index) => {
  slideCarousel.forEach((val) => val.classList.remove("active"));
  slideCarousel[index].classList.add("active");
};

slideCarousel.forEach((val, idx) => {
  val.addEventListener("click", () => {
    currentIndex = idx;
    fnCarousel(currentIndex);
    fnSlide(currentIndex);
  });
});

const fnSlide = (index) => {
  let leftBtnImg = document.querySelector(".left_btn img");
  let rightBtnImg = document.querySelector(".right_btn img");

  if (index === 0) {
    slideList.style.left = "0px";
    leftBtnImg.src = "../images/campaign/left.png";
    leftBtnImg.style.rotate = "0deg";
    rightBtnImg.src = "../images/campaign/right.png";
    rightBtnImg.style.rotate = "0deg";
  } else if (index === 1) {
    slideList.style.left = "calc(-100% + -48px)";
    leftBtnImg.src = "../images/campaign/right.png";
    leftBtnImg.style.rotate = "180deg";
    rightBtnImg.src = "../images/campaign/left.png";
    rightBtnImg.style.rotate = "180deg";
  }
};

slideLeftBtn.addEventListener("click", (e) => {
  currentIndex === 0 ? (currentIndex = 1) : (currentIndex = 0);
  fnCarousel(currentIndex);
  fnSlide(currentIndex);
  // let leftBtnImg = document.querySelector(".left_btn img");
  if (currentIndex === 0) {
    leftBtnImg.src = "../images/campaign/left.png";
    leftBtnImg.style.rotate = "0deg";
  } else if (currentIndex === 1) {
    leftBtnImg.src = "../images/campaign/right.png";
    leftBtnImg.style.rotate = "180deg";
  }
});

slideRightBtn.addEventListener("click", (e) => {
  currentIndex === 0 ? (currentIndex = 1) : (currentIndex = 0);
  fnCarousel(currentIndex);
  fnSlide(currentIndex);
}); */

/*
  // 작업 해야함
  titleInfo.addEventListener("mouseenter", (e) => {
  console.log("enter");
});

titleInfo.addEventListener("mouseleave", (e) => {
  console.log("leave");
}); 
*/
