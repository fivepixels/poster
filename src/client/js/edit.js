// const STATUS_CODE = {
//   OK_CODE: 200,
//   CREATED_CODE: 201,
//   UPDATED_CODE: 204,
//   FOUND_CODE: 302,
//   BAD_REQUEST_CODE: 400,
//   NOT_FOUND_CODE: 404,
//   NOT_ACCEPTABLE_CODE: 405,
//   ALEADY_TAKEN_CODE: 409
// };

const posterInfo = JSON.parse(
  document.querySelector("#edit").dataset.posterInfo
);

const editBox = document.querySelector(".edit-poster__edit");
const editBtn = document.querySelector("#editPosterBtn");

const previewBox = document.querySelector(".edit-poster__preview");
const previewBtn = document.querySelector("#previewBtn");

const submitBtn = document.querySelector("#saveChanges");
const cancelBtn = document.querySelector("#cancel");

const textarea = document.querySelector("#content");

// true - Edit mode / false - Preview mode
let mode = true;

const KEYWORDS = {
  NONE_DISPLAY: "none-display",
  SELECTED: "selected"
};

function redirectToWatchPoster() {
  window.location.href = `/${posterInfo.owner}/${posterInfo.title}`;
}

function changeModeTo(modes) {
  if (modes === "edit") {
    mode = true;
  } else if (modes === "preview") {
    mode = false;
  } else {
    console.error("Params : mdoes must be 'edit' or 'preview'.");
  }

  if (mode) {
    editBox.classList.remove(KEYWORDS.NONE_DISPLAY);
    previewBox.classList.add(KEYWORDS.NONE_DISPLAY);

    editBtn.classList.add(KEYWORDS.SELECTED);
    previewBtn.classList.remove(KEYWORDS.SELECTED);

    return;
  }

  if (!mode) {
    editBox.classList.add(KEYWORDS.NONE_DISPLAY);
    previewBox.classList.remove(KEYWORDS.NONE_DISPLAY);

    editBtn.classList.remove(KEYWORDS.SELECTED);
    previewBtn.classList.add(KEYWORDS.SELECTED);

    return;
  }
}

function handleClickEditBtn() {
  changeModeTo("edit");
}

function handleClickPreviewBtn() {
  changeModeTo("preview");
}

async function handleClickSubmitBtn() {
  const data = {
    editingUserId: posterInfo.editingUserId,
    text: textarea.value
  };

  await fetch(`/${posterInfo.owner}/${posterInfo.title}/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  redirectToWatchPoster();
}

function handleKeydown(event) {
  if (
    event.key === "s" &&
    (navigator.platform.match("Mac") ? event.metaKey : event.ctrlKey)
  ) {
    event.preventDefault();
    submitBtn.focus();
  }
}

editBtn.addEventListener("click", handleClickEditBtn);
previewBtn.addEventListener("click", handleClickPreviewBtn);

submitBtn.addEventListener("click", handleClickSubmitBtn);
cancelBtn.addEventListener("click", redirectToWatchPoster);

document.addEventListener("keydown", handleKeydown);

document.addEventListener("keydown", handleKeydown);
