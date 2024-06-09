const querySelector = (selector) => document.querySelector(selector); // 선택자에 해당하는 DOM 요소를 반환하는 함수
const querySelectorAll = (selector) => document.querySelectorAll(selector); // 선택자에 해당하는 모든 DOM 요소를 반환하는 함수



const toggleVisibility = (element, isVisible) => { // 요소의 가시성과 투명도를 설정하는 함수
    element.style.visibility = isVisible ? 'visible' : 'hidden';
    element.style.opacity = isVisible ? '1' : '0';
};

const setDisplay = (element, display) => { // 요소의 display 속성을 설정하는 함수
    element.style.display = display;
};

const addClass = (element, className) => { // 요소에 클래스 추가하는 함수
    element.classList.add(className);
};

const removeClass = (element, className) => { // 요소에서 클래스 제거하는 함수
    element.classList.remove(className);
};

const toggleClass = (element, className, condition) => { // 조건에 따라 요소의 클래스를 토글하는 함수
    element.classList.toggle(className, condition);
};

const setBorder = (element, border) => { // 요소의 테두리를 설정하는 함수
    element.style.border = border;
};

const addEventListener = (element, event, handler) => { // 요소에 이벤트 리스너를 추가하는 함수
    element.addEventListener(event, handler);
};

const formatDate = (date) => date.toLocaleDateString('ko-KR', { // 날짜를 한국식 포맷으로 변환하는 함수
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
});

/* 메뉴 기능 */
const menuBtn = querySelector(".arrow"); // 메뉴 버튼 선택
const sideBar = querySelector(".sidemenu"); // 사이드바 선택
const menuBtnOpen = querySelector(".arrow_menu_open_wrap"); // 메뉴 열기 버튼 선택
const titleInfo = querySelector(".title_info"); // 제목 정보 선택

const toggleSidebar = (isOpen) => { // 사이드바를 토글하는 함수
    toggleClass(sideBar, "active", isOpen); // 사이드바에 active 클래스 토글
    toggleVisibility(sideBar, isOpen); // 사이드바 가시성 토글
    setDisplay(menuBtnOpen, isOpen ? "none" : "block"); // 메뉴 열기 버튼 표시 토글
};

addEventListener(menuBtn, "click", () => toggleSidebar(false)); // 메뉴 버튼 클릭 시 사이드바 닫기
addEventListener(menuBtnOpen, "click", () => toggleSidebar(true)); // 메뉴 열기 버튼 클릭 시 사이드바 열기


/* 광고 목표 */
const adList = querySelectorAll(".select_list > li > button"); // 광고 목표 리스트 선택
let adObject = {}; // 광고 객체 초기화

const updateAdObjectType = (e) => { // 광고 객체의 타입을 업데이트하는 함수
    adObject.type = e.target.innerText; // 클릭된 버튼의 텍스트를 광고 객체에 저장
    adList.forEach((node) => setBorder(node, "none")); // 모든 버튼의 테두리를 제거
    setBorder(e.target, "1px solid #000"); // 클릭된 버튼에 테두리 추가
};

adList.forEach((node) => addEventListener(node, "click", updateAdObjectType)); // 모든 광고 목표 버튼에 클릭 이벤트 추가

/* 캘린더 */
const calender = querySelector(".calender_box"); // 캘린더 박스 선택
const calenderMenu = querySelector(".date_box"); // 날짜 박스 선택
const calenderDataResult = querySelector(".date_box > span"); // 날짜 결과 박스 선택

const toggleCalendarDisplay = () => { // 캘린더 표시를 토글하는 함수
    calender.style.display = calender.style.display === "block" ? "" : "block"; // 캘린더의 display 속성을 토글
};

addEventListener(calenderMenu, "click", toggleCalendarDisplay); // 날짜 박스 클릭 시 캘린더 표시 토글

let currentDate = new Date(); // 현재 날짜 저장
const monthTitle = querySelector(".month-select"); // 월 선택자 선택
const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; // 월 배열
monthTitle.innerHTML = monthArr[currentDate.getMonth()]; // 현재 월을 월 선택자에 설정
let currentMonth = currentDate.getMonth(); // 현재 월 저장

const yearTitle = querySelector(".year-select"); // 연 선택자 선택
const yearArr = ["2024", "2025", "2026", "2027"]; // 연 배열
yearTitle.innerHTML = yearArr[yearArr.indexOf(currentDate.getFullYear().toString())]; // 현재 연을 연 선택자에 설정
let currentYear = 0; // 현재 연 저장

const dayContainer = querySelector(".day_list"); // 날짜 리스트 선택
let startDate = null; // 시작 날짜 초기화
let endDate = null; // 종료 날짜 초기화
let selectedWeeks = []; // 선택된 주 배열 초기화

const calLeftBtn = querySelector(".cal_left_btn"); // 왼쪽 버튼 선택
const calRightBtn = querySelector(".cal_right_btn"); // 오른쪽 버튼 선택

const disableButton = (button, isDisabled) => { // 버튼 비활성화 함수
    button.disabled = isDisabled;
};

const updateCalendarButtons = () => { // 캘린더 버튼 상태 업데이트 함수
    disableButton(calLeftBtn, currentMonth <= new Date().getMonth() && currentYear === 0); // 왼쪽 버튼 상태 업데이트
    disableButton(calRightBtn, currentYear === 3 && currentMonth === 11); // 오른쪽 버튼 상태 업데이트
};

const handleDayClick = (event) => { // 날짜 클릭 핸들러 함수
    const clickedDate = new Date(event.target.dataset.date); // 클릭된 날짜 추출
    if (!startDate || (startDate && endDate)) { // 시작 날짜가 없거나 종료 날짜가 있는 경우
        startDate = clickedDate; // 시작 날짜 설정
        endDate = null; // 종료 날짜 초기화
        selectedWeeks = []; // 선택된 주 초기화
        highlightDates(); // 날짜 하이라이트

        const startDateString = formatDate(startDate); // 시작 날짜 문자열 변환
        calenderDataResult.innerHTML = `${startDateString} ~ ${"종료 날짜를 선택해 주세요."}`; // 날짜 결과 박스에 설정

    } else {
        if (clickedDate < startDate) return; // 클릭된 날짜가 시작 날짜보다 이전인 경우 무시
        endDate = clickedDate; // 종료 날짜 설정
        if ((endDate - startDate) / (1000 * 60 * 60 * 24) > 6) { // 종료 날짜가 시작 날짜로부터 7일 이상인 경우
            endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6); // 종료 날짜를 시작 날짜로부터 7일로 설정
        }

        const selectedWeek = []; // 선택된 주 배열 초기화
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) { // 시작 날짜부터 종료 날짜까지 반복
            selectedWeek.push(new Date(d)); // 선택된 주에 날짜 추가
        }

        const weekString = selectedWeek.map(date => date.toISOString()).join(','); // 선택된 주를 문자열로 변환
        selectedWeeks.push(weekString); // 선택된 주 배열에 추가
        highlightDates(); // 날짜 하이라이트


        const startDateString = formatDate(startDate); // 시작 날짜 문자열 변환
        const endDateString = formatDate(endDate); // 종료 날짜 문자열 변환
        calenderDataResult.innerHTML = `${startDateString} ~ ${endDateString}`; // 날짜 결과 박스에 설정

        setTimeout(() => {
            querySelector(".calender_box").style.display = "none";
        }, 100);
    }

    highlightWeeks(); // 선택된 주 하이라이트
};

const highlightDates = () => { // 날짜 하이라이트 함수
    const days = dayContainer.children; // 날짜 리스트의 자식 요소들 가져오기
    Array.from(days).forEach(day => { // 모든 날짜 요소에 대해
        removeClass(day, 'start-date'); // 시작 날짜 클래스 제거
        removeClass(day, 'end-date'); // 종료 날짜 클래스 제거
    });

    if (startDate) { // 시작 날짜가 있는 경우
        const startDayElement = Array.from(days).find(day => new Date(day.dataset.date).getTime() === startDate.getTime()); // 시작 날짜 요소 찾기
        if (startDayElement) addClass(startDayElement, 'start-date'); // 시작 날짜 클래스 추가
    }

    if (endDate) { // 종료 날짜가 있는 경우
        const endDayElement = Array.from(days).find(day => new Date(day.dataset.date).getTime() === endDate.getTime()); // 종료 날짜 요소 찾기
        if (endDayElement) addClass(endDayElement, 'end-date'); // 종료 날짜 클래스 추가
    }
};

const highlightWeeks = () => { // 선택된 주 하이라이트 함수
    const days = dayContainer.children; // 모든 날짜 요소들 가져오기
    Array.from(days).forEach(day => removeClass(day, 'selected-week')); // 모든 날짜 요소에서 선택된 주 클래스 제거

    selectedWeeks.forEach(weekString => { // 선택된 주에 대해
        const weekDates = weekString.split(',').map(dateString => new Date(dateString)); // 주 날짜들을 배열로 변환
        weekDates.forEach(date => { // 주의 각 날짜에 대해
            const dayElement = Array.from(days).find(day => new Date(day.dataset.date).getTime() === date.getTime()); // 해당 날짜 요소 찾기
            if (dayElement) addClass(dayElement, 'selected-week'); // 선택된 주 클래스 추가
        });
    });
};

const renderCalendar = (date) => { // 캘린더 렌더링 함수
    const yearInner = date.getFullYear(); // 연도 추출
    const monthInner = date.getMonth(); // 월 추출
    const firstDay = new Date(yearInner, monthInner, 1); // 현재 달의 첫 번째 날
    const lastDay = new Date(yearInner, monthInner + 1, 0); // 현재 달의 마지막 날

    dayContainer.innerHTML = ''; // 날짜 리스트 초기화

    const prevMonthLastDay = new Date(yearInner, monthInner, 0); // 이전 달의 마지막 날
    const prevMonthDaysToShow = firstDay.getDay(); // 이전 달에서 현재 달 첫 주에 표시할 일 수
    for (let i = prevMonthLastDay.getDate() - prevMonthDaysToShow + 1; i <= prevMonthLastDay.getDate(); i++) { // 이전 달의 일자 표시
        const day = document.createElement('div'); // 새로운 div 요소 생성
        addClass(day, 'prev-month'); // 이전 달 클래스 추가
        day.innerText = i; // 날짜 숫자 표시
        day.dataset.date = new Date(yearInner, monthInner - 1, i).toISOString(); // 날짜를 data-date 속성에 저장
        addEventListener(day, "click", handleDayClick); // 날짜 클릭 이벤트 추가
        dayContainer.appendChild(day); // 날짜 리스트에 추가
    }

    for (let i = 1; i <= lastDay.getDate(); i++) { // 현재 달의 일자 표시
        const day = document.createElement("div");
        day.innerText = i;
        day.dataset.date = new Date(yearInner, monthInner, i).toISOString(); // 날짜를 data-date 속성에 저장
        addEventListener(day, "click", handleDayClick); // 날짜 클릭 이벤트 추가
        dayContainer.appendChild(day); // 날짜 리스트에 추가
    }

    const nextMonthDaysToShow = 6 - lastDay.getDay(); // 다음 달에서 현재 달 마지막 주에 표시할 일 수
    for (let i = 1; i <= nextMonthDaysToShow; i++) { // 다음 달의 첫 며칠 표시
        const day = document.createElement('div'); // 새로운 div 요소 생성
        addClass(day, 'next-month'); // 다음 달 클래스 추가
        day.innerText = i; // 날짜 숫자 표시
        day.dataset.date = new Date(yearInner, monthInner + 1, i).toISOString(); // 날짜를 data-date 속성에 저장
        addEventListener(day, "click", handleDayClick); // 날짜 클릭 이벤트 추가
        dayContainer.appendChild(day); // 날짜 리스트에 추가
    }
};

renderCalendar(currentDate); // 캘린더 초기화

const updateCalendar = (month, year) => { // 캘린더 업데이트 함수
    monthTitle.innerHTML = monthArr[month]; // 월 선택자 업데이트
    if (year !== undefined) yearTitle.innerHTML = yearArr[year]; // 연 선택자 업데이트
    updateCalendarButtons(); // 캘린더 버튼 상태 업데이트
};

addEventListener(calLeftBtn, "click", () => { // 왼쪽 버튼 클릭 이벤트
    if (currentMonth === 0) {
        currentMonth = 12;
        currentYear--;
    }
    currentMonth--;
    updateCalendar(currentMonth, currentYear === 0 ? undefined : currentYear); // 캘린더 업데이트
    currentDate.setMonth(currentMonth); // 현재 월 업데이트
    renderCalendar(currentDate); // 캘린더 렌더링
});

addEventListener(calRightBtn, "click", () => { // 오른쪽 버튼 클릭 이벤트
    currentMonth++;
    if (currentMonth > new Date().getMonth()) {
        disableButton(calLeftBtn, false); // 왼쪽 버튼 활성화
    }
    if (currentMonth <= 11) {
        updateCalendar(currentMonth, currentYear); // 캘린더 업데이트
    } else {
        currentMonth = 0;
        currentYear++;
        updateCalendar(currentMonth, currentYear); // 캘린더 업데이트
    }
    currentDate.setMonth(currentMonth); // 현재 월 업데이트
    renderCalendar(currentDate); // 캘린더 렌더링
});

const deviceList = querySelectorAll(".device_list > li > button"); // 디바이스 리스트 선택
const updateAdObjectDevice = (e) => { // 광고 객체의 디바이스 업데이트 함수
    adObject.device = e.target.innerText; // 클릭된 버튼의 텍스트를 광고 객체에 저장
    deviceList.forEach((node) => setBorder(node, "none")); // 모든 버튼의 테두리를 제거
    setBorder(e.target, "1px solid #000"); // 클릭된 버튼에 테두리 추가
};

deviceList.forEach((node) => addEventListener(node, "click", updateAdObjectDevice)); // 모든 디바이스 버튼에 클릭 이벤트 추가

const bannerList = querySelectorAll(".banner_list > li"); // 배너 리스트 선택
const bannerCheck = querySelectorAll(".checkbox"); // 배너 체크박스 선택

const updateBannerSelection = (index) => { // 배너 선택 업데이트 함수
    bannerList.forEach((node) => setBorder(node, "1px solid #e4e4e4")); // 모든 배너 테두리 초기화
    bannerCheck.forEach((node) => node.checked = false); // 모든 체크박스 초기화
    bannerCheck[index].checked = true; // 선택된 배너 체크박스 선택
    setBorder(bannerList[index], "1px solid #000"); // 선택된 배너 테두리 설정
    adObject.banner = bannerCheck[index].value; // 광고 객체에 배너 값 저장
};

bannerList.forEach((node, idx) => addEventListener(node, "click", () => updateBannerSelection(idx))); // 모든 배너에 클릭 이벤트 추가
bannerCheck.forEach((node, idx) => addEventListener(node, "click", () => updateBannerSelection(idx))); // 모든 체크박스에 클릭 이벤트 추가

const purchaseBtn = querySelector(".purchase_button"); // 구매 버튼 선택
addEventListener(purchaseBtn, "click", () => { // 구매 버튼 클릭 이벤트
    const campaignName = querySelector(".campaign_name_input"); // 캠페인 이름 입력란 선택
    adObject.name = campaignName.value; // 광고 객체에 캠페인 이름 저장
    console.log(adObject); // 광고 객체 콘솔에 출력
});

const slideList = querySelector(".banner_list"); // 슬라이드 리스트 선택
const slideLeftBtn = querySelector(".left_btn"); // 슬라이드 왼쪽 버튼 선택
const slideRightBtn = querySelector(".right_btn"); // 슬라이드 오른쪽 버튼 선택
const slideCarousel = querySelectorAll(".carousel_list > li"); // 슬라이드 캐러셀 리스트 선택

let currentIndex = 0; // 현재 인덱스 초기화
let startX = 0; // 드래그 시작 X 좌표 초기화
let isDragging = false; // 드래그 상태 초기화
let currentTranslate = 0; // 현재 변환값 초기화
let prevTranslate = 0; // 이전 변환값 초기화
let animationID; // 애니메이션 ID 초기화

const setSliderPosition = () => { // 슬라이더 위치 설정 함수
    slideList.style.transform = `translateX(${currentTranslate}px)`;
};

const setPositionByIndex = () => { // 인덱스에 따른 슬라이더 위치 설정 함수
    const slideWidth = slideList.clientWidth; // 슬라이드 너비 가져오기
    currentTranslate = -currentIndex * (slideWidth + 48); // 현재 변환값 계산
    prevTranslate = currentTranslate; // 이전 변환값 업데이트
    setSliderPosition(); // 슬라이더 위치 설정
};

const fnCarousel = (index) => { // 캐러셀 업데이트 함수
    slideCarousel.forEach((val) => removeClass(val, "active")); // 모든 캐러셀 항목의 active 클래스 제거
    addClass(slideCarousel[index], "active"); // 현재 인덱스의 캐러셀 항목에 active 클래스 추가

    const leftBtnImg = querySelector(".left_btn img"); // 왼쪽 버튼 이미지 선택
    const rightBtnImg = querySelector(".right_btn img"); // 오른쪽 버튼 이미지 선택

    if (index === 0) { // 첫 번째 캐러셀 항목인 경우
        leftBtnImg.src = "../images/campaign/left.png"; // 왼쪽 버튼 이미지 설정
        rightBtnImg.src = "../images/campaign/right.png"; // 오른쪽 버튼 이미지 설정
        leftBtnImg.style.rotate = "0deg"; // 왼쪽 버튼 이미지 회전 초기화
        rightBtnImg.style.rotate = "0deg"; // 오른쪽 버튼 이미지 회전 초기화
    } else if (index === 1) { // 두 번째 캐러셀 항목인 경우
        leftBtnImg.src = "../images/campaign/right.png"; // 왼쪽 버튼 이미지 설정
        rightBtnImg.src = "../images/campaign/left.png"; // 오른쪽 버튼 이미지 설정
        leftBtnImg.style.rotate = "180deg"; // 왼쪽 버튼 이미지 회전 설정
        rightBtnImg.style.rotate = "180deg"; // 오른쪽 버튼 이미지 회전 설정
    }
};

const startDragging = (position) => { // 드래그 시작 함수
    startX = position; // 시작 X 좌표 설정
    isDragging = true; // 드래그 상태 설정
    addClass(slideList, "grabbing"); // 슬라이드 리스트에 grabbing 클래스 추가
    animationID = requestAnimationFrame(animation); // 애니메이션 시작
};

const stopDragging = () => { // 드래그 중지 함수
    if (!isDragging) return; // 드래그 상태가 아닌 경우 함수 종료
    isDragging = false; // 드래그 상태 해제
    cancelAnimationFrame(animationID); // 애니메이션 중지
    removeClass(slideList, "grabbing"); // 슬라이드 리스트에서 grabbing 클래스 제거

    const movedBy = currentTranslate - prevTranslate; // 이동한 거리 계산
    if (movedBy < -50 && currentIndex < slideCarousel.length - 1) currentIndex += 1; // 이동 거리가 -50 이하이고 현재 인덱스가 마지막이 아닌 경우 인덱스 증가
    if (movedBy > 50 && currentIndex > 0) currentIndex -= 1; // 이동 거리가 50 이상이고 현재 인덱스가 0보다 큰 경우 인덱스 감소

    setPositionByIndex(); // 인덱스에 따른 슬라이더 위치 설정
    fnCarousel(currentIndex); // 캐러셀 업데이트
};

const moveSlider = (position) => { // 슬라이더 이동 함수
    if (!isDragging) return; // 드래그 상태가 아닌 경우 함수 종료

    const moveAmount = position - startX; // 이동한 거리 계산
    if ((currentIndex === 0 && moveAmount > 0) || (currentIndex === slideCarousel.length - 1 && moveAmount < 0)) return; // 첫 번째 항목에서 왼쪽으로 이동하거나 마지막 항목에서 오른쪽으로 이동하는 경우 함수 종료

    currentTranslate = prevTranslate + moveAmount; // 현재 변환값 계산
    setSliderPosition(); // 슬라이더 위치 설정
};

const animation = () => { // 애니메이션 함수
    setSliderPosition(); // 슬라이더 위치 설정
    if (isDragging) requestAnimationFrame(animation); // 드래그 상태인 경우 애니메이션 계속
};

addEventListener(slideList, "mousedown", (e) => startDragging(e.pageX)); // 슬라이드 리스트에 마우스다운 이벤트 추가
addEventListener(slideList, "mouseup", stopDragging); // 슬라이드 리스트에 마우스업 이벤트 추가
addEventListener(slideList, "mouseleave", stopDragging); // 슬라이드 리스트에 마우스리브 이벤트 추가
addEventListener(slideList, "mousemove", (e) => moveSlider(e.pageX)); // 슬라이드 리스트에 마우스무브 이벤트 추가

addEventListener(slideList, "touchstart", (e) => startDragging(e.touches[0].clientX)); // 슬라이드 리스트에 터치스타트 이벤트 추가
addEventListener(slideList, "touchend", stopDragging); // 슬라이드 리스트에 터치엔드 이벤트 추가
addEventListener(slideList, "touchmove", (e) => moveSlider(e.touches[0].clientX)); // 슬라이드 리스트에 터치무브 이벤트 추가