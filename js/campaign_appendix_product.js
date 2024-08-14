const productBannerPersonal = document.querySelector(".product_banner_personal > a > img");


const userWrap = document.querySelector(".user_wrap");
const userImg = document.querySelector(".user_img_wrap");
const userList = document.querySelector(".user_list");
const userListLi = document.querySelectorAll(".user_list > li");


const user = { name: "사용자 A" };

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
      productBannerPersonal.src = "../images/appendix/product_b.png";
    } else if (user.name === "사용자 B") {
      productBannerPersonal.src = "../images/appendix/product_banner.png";
    }

  });

});