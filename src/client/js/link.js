const createNewPosterBtn = document.querySelectorAll("#createNewPosterBtn");

const handleNewClick = () => {
  window.location.href = "/new";
};

if (createNewPosterBtn) {
  for (let i = 0; i < createNewPosterBtn.length; i++) {
    const element = createNewPosterBtn[i];
    element.addEventListener("click", handleNewClick);
  }
}
