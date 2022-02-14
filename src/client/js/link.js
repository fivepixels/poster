const createNewPosterBtn = document.querySelectorAll("#createNewPosterBtn");
const randomPosterBtn = document.querySelector("#watchRandomPosterBtn");
const randomTopicBtn = document.querySelector("#watchRandomTopicBtn");

function redirectTo(url) {
  window.location.href = url;
}

function handleClickRandomPosterBtn(event) {
  redirectTo("/random/poster");
}

function handleClickRandomTopicBtn(event) {
  redirectTo("/random/topic");
}

const handleNewClick = () => {
  redirectTo("/new");
};

if (createNewPosterBtn) {
  for (let i = 0; i < createNewPosterBtn.length; i++) {
    const element = createNewPosterBtn[i];
    element.addEventListener("click", handleNewClick);
  }
}

randomPosterBtn.addEventListener("click", handleClickRandomPosterBtn);
randomTopicBtn.addEventListener("click", handleClickRandomTopicBtn);
