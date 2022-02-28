const fullScreenBtn = document.querySelector("#posterFullScreen");
const fullScreenBtnIcon = fullScreenBtn.querySelector("i");
const posterBox = document.querySelector(".watch-poster__main__content");
const sideBar = document.querySelector(".watch-poster__side-bar");
const poster = document.querySelector("#poster");
const posterInfo = JSON.parse(poster.dataset.posterInfo);
const content = posterInfo.content;
const markdownBody = document.querySelector(".markdown-body");

/**
 * true = full screen mode
 * false = not full screen mode
 */
let mode = false;
let touched = false;

function handleClickFullScreenBtn(event) {
  if (event) {
    touched = true;
  }

  if (mode) {
    posterBox.classList.remove("wide");
    posterBox.classList.add("short");

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

function handleWindowResize(event) {
  if (touched) {
    return;
  }

  const windowWidth = window.innerWidth;

  if (windowWidth <= 1125) {
    if (!mode) {
      handleClickFullScreenBtn();
    }
  } else {
    if (mode) {
      handleClickFullScreenBtn();
    }
  }
}

function showMarkdown() {
  markdownBody.innerHTML = content;
}

showMarkdown();

fullScreenBtn.addEventListener("click", handleClickFullScreenBtn);
window.addEventListener("resize", handleWindowResize);
