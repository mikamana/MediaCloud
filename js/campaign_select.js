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

// 캠페인 기간 토글
const calender = document.querySelector(".calender_box");
const calenderMenu = document.querySelector(".date_box");
const calenderDataResult = document.querySelector(".date_box > span");

calenderMenu.addEventListener("click", (e) => {

  const dp = calender.style.display;

  if (dp === "") {
    calender.style.display = "block";
  } else if (calender.style.display === "block") {
    calender.style.display = "";
  }

})


/* 
  캘린더 버튼을 클릭 할 경우 발생하는 일

  1. 버튼을 누르면 select > option 태그의 value가 이전,다음달로 변한다.
  2. 이전,다음 달의 날짜 데이터를 가져와서 캘린더 body에 뿌려준다.

  필요한 데이터
  1. 현재 선택 되어있는 달의 데이터 
    * 버튼을 클릭 할 경우 현재 선택되어있는 달(이름,날짜)의 데이터를 기준으로 작동한다. 
  2. 현재 선택 되어있는 년도의 데이터
    * 오늘 날짜 이후의 데이터만 선택 가능하도록 설정 해둔 상태이다.
    * 12월이 선택되어있는 상태에서 다음 버튼을 클릭하면 년도가 변한다.(년도 업데이트)

  기능 구현

*/

// 캘린더 초기화
let currentDate = new Date();

const monthTitle = document.querySelector(".month-select");
const month = new Date().getMonth();
const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthResult = monthArr[month];
monthTitle.innerHTML = monthArr[month];
let currentMonth = month;
let nextMonth;

const yearTitle = document.querySelector(".year-select");
const year = new Date().getFullYear().toString();
const yearArr = ["2024", "2025", "2026", "2027"];
yearTitle.innerHTML = yearArr[yearArr.indexOf(year)];
let currentYear = 0;
let nextYear;

const dayContainer = document.querySelector(".day_list");
let startDate = null;
let endDate = null;
let selectedWeeks = []; // 선택된 주를 저장할 배열

const calLeftBtn = document.querySelector(".cal_left_btn");
const calRightBtn = document.querySelector(".cal_right_btn");

if (month >= monthArr.indexOf(monthResult)) {

  calLeftBtn.disabled = true;

} else {

  calLeftBtn.disabled = false;

}

// 날짜 클릭 핸들러 함수
function handleDayClick(event) {
  const clickedDate = new Date(event.target.dataset.date); // 클릭한 날짜 추출
  if (!startDate || (startDate && endDate)) {
    // 시작 날짜를 선택하지 않았거나, 이미 시작 및 종료 날짜가 선택된 경우
    startDate = clickedDate; // 시작 날짜 설정
    endDate = null; // 종료 날짜 초기화
    selectedWeeks = []; // 선택된 주 초기화
    highlightDates(); // 날짜 하이라이트
  } else {
    // 시작 날짜가 이미 선택된 경우
    if (clickedDate < startDate) {
      // 종료 날짜가 시작 날짜보다 작으면 선택되지 않음
      return;
    }
    endDate = clickedDate; // 종료 날짜 설정
    if ((endDate - startDate) / (1000 * 60 * 60 * 24) > 6) {
      // 종료 날짜가 시작 날짜로부터 7일 이상인 경우
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6); // 종료 날짜를 시작 날짜로부터 7일로 설정
    }

    // 선택된 주 배열에 추가
    const selectedWeek = [];
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      selectedWeek.push(new Date(d));
    }

    // 선택된 주 문자열로 변환하여 저장
    const weekString = selectedWeek.map(date => date.toISOString()).join(',');

    // 텍스트 박스에 선택된 날짜 범위 추가
    const startDateString = startDate.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const endDateString = endDate.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    calenderDataResult.innerHTML = `${startDateString} ~ ${endDateString}`;

    // 새로운 주를 배열에 추가
    selectedWeeks.push(weekString);
    highlightDates(); // 날짜 하이라이트

  }


  // 선택된 주 하이라이트

  highlightWeeks();
}

const highlightDates = () => {

  const days = dayContainer.children;

  for (let day of days) {
    day.classList.remove('start-date', 'end-date'); // 기존 하이라이트 클래스 제거
  }

  if (startDate) {
    const startDayElement = Array.from(days).find(day => new Date(day.dataset.date).getTime() === startDate.getTime());
    if (startDayElement) {
      startDayElement.classList.add('start-date'); // 시작 날짜 하이라이트
    }
  }

  if (endDate) {
    const endDayElement = Array.from(days).find(day => new Date(day.dataset.date).getTime() === endDate.getTime());
    if (endDayElement) {
      endDayElement.classList.add('end-date'); // 종료 날짜 하이라이트
    }
  }

}

// 선택된 주 하이라이트 함수
function highlightWeeks() {
  const days = dayContainer.children; // 모든 날짜 요소들 가져오기
  for (let day of days) {
    day.classList.remove('selected-week'); // 모든 날짜 요소에서 하이라이트 클래스 제거
  }

  // 선택된 주에 대해 하이라이트
  selectedWeeks.forEach(weekString => {
    const weekDates = weekString.split(',').map(dateString => new Date(dateString));

    weekDates.forEach(date => {
      for (let i = 0; i < days.length; i++) {
        const dayDate = new Date(days[i].dataset.date);
        if (dayDate.getTime() === date.getTime()) {
          days[i].classList.add('selected-week'); // 선택된 주에 속하는 날짜에 하이라이트 클래스 추가
        }
      }
    });
  });
}

const fnRenderCalender = (date) => {
  const yearInner = date.getFullYear(); // 연도 추출
  const monthInner = date.getMonth(); // 월 추출
  const firstDay = new Date(yearInner, monthInner, 1); // 현재 달의 첫 번째 날
  const lastDay = new Date(yearInner, monthInner + 1, 0); // 현재 달의 마지막 날

  dayContainer.innerHTML = ''; // 이전에 표시된 날짜들을 초기화

  // 이전 달의 마지막 며칠 표시
  const prevMonthLastDay = new Date(yearInner, monthInner, 0); // 이전 달의 마지막 날
  const prevMonthDaysToShow = firstDay.getDay(); // 이전 달에서 현재 달 첫 주에 표시할 일 수
  for (let i = prevMonthLastDay.getDate() - prevMonthDaysToShow + 1; i <= prevMonthLastDay.getDate(); i++) {
    const day = document.createElement('div'); // 새로운 div 요소 생성
    day.classList.add('prev-month'); // 이전 달 클래스 추가
    day.innerText = i; // 날짜 숫자 표시
    const date = new Date(yearInner, monthInner - 1, i); // 해당 날짜 객체 생성
    const dateString = date.toISOString().split('T')[0]; // 날짜 문자열 형식으로 변환
    day.dataset.date = date.toISOString(); // 날짜를 data-date 속성에 저장
    day.addEventListener("click", handleDayClick);
    dayContainer.appendChild(day); // daysContainer에 추가
  }

  // 현재 달의 일자 표시
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const day = document.createElement("div");
    day.innerText = i;
    const date = new Date(yearInner, monthInner, i); // 해당 날짜 객체 생성
    const dateString = date.toISOString().split('T')[0]; // 날짜 문자열 형식으로 변환
    day.dataset.date = date.toISOString(); // 날짜를 data-date 속성에 저장
    day.addEventListener("click", handleDayClick);
    dayContainer.appendChild(day); // daysContainer에 추가
  }

  // 다음 달의 첫 며칠 표시
  const nextMonthDaysToShow = 6 - lastDay.getDay(); // 다음 달에서 현재 달 마지막 주에 표시할 일 수
  for (let i = 1; i <= nextMonthDaysToShow; i++) {
    const day = document.createElement('div'); // 새로운 div 요소 생성
    day.classList.add('next-month'); // 다음 달 클래스 추가
    day.innerText = i; // 날짜 숫자 표시
    const date = new Date(yearInner, monthInner + 1, i); // 해당 날짜 객체 생성
    const dateString = date.toISOString().split('T')[0]; // 날짜 문자열 형식으로 변환
    day.dataset.date = date.toISOString(); // 날짜를 data-date 속성에 저장
    day.addEventListener("click", handleDayClick);
    dayContainer.appendChild(day); // daysContainer에 추가
  }



}

fnRenderCalender(currentDate);

const fnCalenderBtn = (month, year) => {

  monthTitle.innerHTML = monthArr[month];

  if (year !== undefined) {
    yearTitle.innerHTML = yearArr[year];
  }

  if (year === 3 && month === 11) {
    calRightBtn.disabled = true;
  } else {
    calRightBtn.disabled = false;
  }

}


//왼쪽 버튼
calLeftBtn.addEventListener("click", (e) => {

  if (currentMonth === 0) {
    currentMonth = 12;
    currentYear--;
  }

  currentMonth--;

  if (currentYear === 0 && currentMonth <= month) {
    calLeftBtn.disabled = true;
  }

  if (currentYear === 0) {
    fnCalenderBtn(currentMonth);
  } else if (currentYear !== 0) {
    fnCalenderBtn(currentMonth, currentYear);
  }

  currentDate.setMonth(currentMonth);
  fnRenderCalender(currentDate);

});


// 오른쪽 버튼
calRightBtn.addEventListener("click", (e) => {

  currentMonth++;
  if (currentMonth > month) {
    calLeftBtn.disabled = false;
  }

  if (currentMonth <= 11) {
    fnCalenderBtn(currentMonth, currentYear);
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
    fnCalenderBtn(currentMonth, currentYear);
  }

  currentDate.setMonth(currentMonth);
  fnRenderCalender(currentDate);

});

/* 
  날짜를 클릭 할 경우 발생하는 일

  1. 객체에 데이터 추가 
    * 선택한 날짜 데이터를 만들어놓은 객체에 추가시켜 년도와 월 정보를 추가시켜야한다.
  2. 시작 날짜, 종료 날짜에 맞춰 날짜 배경 변경
    * 첫번째로 선택한 날짜의 배경은 파랑색으로 변한다.
      * 두번째 선택 날짜는 첫번째 선택 날짜보다 적은 날짜를 선택 할 수 없다.
    * 두번째로 선택한 날짜의 배경은 빨강색으로 변한다.
  3. 오늘 날짜를 기준으로 캘린더가 초기화된다.
    * 오늘 날짜가 6월 달이면 6월의 데이터가 나타나는데, 6월 1일은 토요일이라 토요일부터 나와야한다.

*/

/* 

*/










































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

// 배너
const bannerList = document.querySelectorAll(".banner_list > li");
// 배너 체크박스
const bannerCheck = document.querySelectorAll(".checkbox");

const fnBannerCheck = (index) => {

  bannerList.forEach((node) => {

    node.style.border = "1px solid #e4e4e4";

  });

  bannerCheck.forEach((node) => {

    node.checked = false

  });

  bannerCheck[index].checked = true;
  bannerList[index].style.border = "1px solid #000";

  adObject.banner = bannerCheck[index].value;

};

bannerList.forEach((node, idx) => {

  node.addEventListener("click", (e) => {

    fnBannerCheck(idx);

  });

});

bannerCheck.forEach((node, idx) => {

  node.addEventListener("click", (e) => {

    // adObject.banner = e.target.value
    fnBannerCheck(idx);

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


const setPositionByIndex = () => {
  console.log("33");
  const slideWidth = slideList.clientWidth;
  currentTranslate = -currentIndex * (slideWidth + 48);
  prevTranslate = currentTranslate;
  setSliderPosition();
};

const setSliderPosition = () => {
  slideList.style.transform = `translateX(${currentTranslate}px)`;
};

// 왼쪽 버튼 클릭 시 슬라이드 이동
slideLeftBtn.addEventListener("click", () => {
  console.log("#3");
  currentIndex = currentIndex === 0 ? slideCarousel.length - 1 : currentIndex - 1; // 현재 인덱스가 0이면 마지막 인덱스로, 아니면 인덱스 감소
  setPositionByIndex(); // 인덱스에 따른 슬라이더 위치 설정
  fnCarousel(currentIndex); // 캐러셀 업데이트
});

// 오른쪽 버튼 클릭 시 슬라이드 이동
slideRightBtn.addEventListener("click", () => {
  currentIndex = currentIndex === slideCarousel.length - 1 ? 0 : currentIndex + 1; // 현재 인덱스가 마지막이면 0으로, 아니면 인덱스 증가
  setPositionByIndex(); // 인덱스에 따른 슬라이더 위치 설정
  fnCarousel(currentIndex); // 캐러셀 업데이트
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