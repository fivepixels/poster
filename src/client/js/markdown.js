const fullScreenBtn = document.querySelector("#posterFullScreen");
const fullScreenBtnIcon = fullScreenBtn.querySelector("i");
const posterBox = document.querySelector(".watch-poster__main__content");
const sideBar = document.querySelector(".watch-poster__side-bar");

/**
 * true = full screen mode
 * false = not full screen mode
 */
let mode = false;

function handleClickFullScreenBtn() {
  if (mode) {
    posterBox.classList.remove("wide");
    posterBox.classList.add("short");

    console.log("HIHIHHI");

    setTimeout(() => {
      sideBar.classList.add("none-display");
      sideBar.classList.remove("none-display");

      sideBar.classList.remove("hide");
      sideBar.classList.add("show");

      fullScreenBtnIcon.className = "fas fa-expand";
    }, 500);

    mode = false;

    return;
  }

  if (!mode) {
    sideBar.classList.remove("show");
    sideBar.classList.add("hide");

    setTimeout(() => {
      sideBar.classList.remove("none-display");
      sideBar.classList.add("none-display");

      posterBox.classList.remove("short");
      posterBox.classList.add("wide");

      fullScreenBtnIcon.className = "fas fa-compress";
    }, 400);

    mode = true;

    return;
  }
}

fullScreenBtn.addEventListener("click", handleClickFullScreenBtn);
