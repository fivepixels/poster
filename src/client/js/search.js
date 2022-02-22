const searchInMyPoster = document.querySelector("#searchInMyPoster");
const searchForm = document.querySelector("#searchForm");
const search = document.querySelector("#search");

const postersBox = document.querySelector("#postersBox");
const topicsBox = document.querySelector("#topicsBox");

const postersBtn = document.querySelector("#postersBtn");
const topicsBtn = document.querySelector("#topicsBtn");

// "posters" === watch poster mode / "topics" === watch topics mode
let mode = "posters";
const KEYWORD = {
  SELECTED: "selected",
  NONE_DISPLAY: "none-display",
};

function handleSubmitSearch(event) {
  event.preventDefault();
  window.location.href = `/search?q=${search.value}`;
}

function handleClickPostersBtn() {
  controlModeTo("posters");
}

function handleClickTopicsBtn() {
  controlModeTo("topics");
}

function controlModeTo(modes) {
  if (modes === "posters" || modes === "topics") {
    mode = modes;
  } else {
    console.error('\'modes\' is must be "posters" or "topics"');
  }

  if (mode === "posters") {
    postersBtn.classList.add(KEYWORD.SELECTED);
    topicsBtn.classList.remove(KEYWORD.SELECTED);

    postersBox.classList.remove(KEYWORD.NONE_DISPLAY);
    topicsBox.classList.add(KEYWORD.NONE_DISPLAY);
  } else if (mode === "topics") {
    postersBtn.classList.remove(KEYWORD.SELECTED);
    topicsBtn.classList.add(KEYWORD.SELECTED);

    postersBox.classList.add(KEYWORD.NONE_DISPLAY);
    topicsBox.classList.remove(KEYWORD.NONE_DISPLAY);
  }
}

searchForm.addEventListener("submit", handleSubmitSearch);
postersBtn.addEventListener("click", handleClickPostersBtn);
topicsBtn.addEventListener("click", handleClickTopicsBtn);
