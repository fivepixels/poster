const createNewPosterBtn = document.querySelectorAll("#createNewPosterBtn");
const randomPosterBtn = document.querySelector("#watchRandomPosterBtn");
const randomTopicBtn = document.querySelector("#watchRandomTopicBtn");
const editPosterBtn = document.querySelector("#editBtn");
const editPosterTo = editPosterBtn.dataset.redirectTo;

function redirectTo(url) {
  window.location.href = url;
}

function handleClickRandomPosterBtn() {
  redirectTo("/random/poster");
}

function handleClickRandomTopicBtn() {
  redirectTo("/random/topic");
}

function handleClickEditPosterBtn() {
  redirectTo(editPosterTo);
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

if (randomPosterBtn) {
  randomPosterBtn.addEventListener("click", handleClickRandomPosterBtn);
}

if (randomTopicBtn) {
  randomTopicBtn.addEventListener("click", handleClickRandomTopicBtn);
}

if (editPosterBtn) {
  editPosterBtn.addEventListener("click", handleClickEditPosterBtn);
}
