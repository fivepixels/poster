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
  SELECTED: "selected",
};

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
  // TODO : Fetch

  const data = {
    editingUserUsername: posterInfo.editingUser,
    text: textarea.innerHTML,
  };

  await fetch(`/${posterInfo.owner}/${posterInfo.title}/edit`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function handleClickCancelBtn() {
  window.location.href = `/${posterInfo.owner}/${posterInfo.title}`;
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
cancelBtn.addEventListener("click", handleClickCancelBtn);

document.addEventListener("keydown", handleKeydown);

document.addEventListener("keydown", handleKeydown);
