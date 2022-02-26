const createNewPosterBtn = document.querySelectorAll("#createNewPosterBtn");
const randomPosterBtn = document.querySelector("#watchRandomPosterBtn");
const randomTopicBtn = document.querySelector("#watchRandomTopicBtn");
const editPosterBtn = document.querySelector("#editBtn");
let editPosterTo = null;

const editProfileBtn = document.querySelector("#edit-profile-btn");

function redirectTo(url) {
  window.location.href = url;
}

if (createNewPosterBtn) {
  for (let i = 0; i < createNewPosterBtn.length; i++) {
    const element = createNewPosterBtn[i];
    element.addEventListener("click", () => {
      redirectTo("/new");
    });
  }
}

if (randomPosterBtn) {
  randomPosterBtn.addEventListener("click", () => {
    redirectTo("/random/poster");
  });
}

if (randomTopicBtn) {
  randomTopicBtn.addEventListener("click", () => {
    redirectTo("/random/topic");
  });
}

if (editPosterBtn) {
  editPosterTo = editPosterBtn.dataset.redirectTo || null;
  function handleEditPosterBtnClick() {
    redirectTo(editPosterTo);
  }
  editPosterBtn.addEventListener("click", handleEditPosterBtnClick);
}

if (editProfileBtn) {
  editProfileBtn.addEventListener("click", () => {
    redirectTo("/edit");
  });
}
