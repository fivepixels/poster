import { async } from "regenerator-runtime";
const STATUS_CODE = {
  OK_CODE: 200,
  CREATED_CODE: 201,
  UPDATED_CODE: 204,
  FOUND_CODE: 302,
  BAD_REQUEST_CODE: 400,
  NOT_FOUND_CODE: 404,
  NOT_ACCEPTABLE_CODE: 405,
  ALEADY_TAKEN_CODE: 409,
};

let pass = {
  posterTitle: false,
  posterExists: false,
  topicTitle: false,
  topicExists: false,
};

const KEYWORD = {
  GOOD_BTN: "good-button",
  NOT_READY: "good-button__not-ready",
  GOOD_INPUT: "good-input",
  BAD_INPUT: "bad-input",
};

const defaultTopicTitle = new URLSearchParams(
  window.location.href.split("?")[1]
).get("topic");

const posterTitleInput = document.querySelector("#posterTitle");
const topicTitleInput = document.querySelector("#topicTitle");
const submit = document.querySelector("#newPosterSubmitBtn");
const errorMessage = document.querySelector("#errorMessage");

topicTitleInput.value = defaultTopicTitle;

function submitBtn() {
  if (
    pass.posterTitle &&
    pass.posterExists &&
    pass.topicTitle &&
    pass.topicExists
  ) {
    submit.className = KEYWORD.GOOD_BTN;
    submit.disabled = false;
  } else {
    submit.className = KEYWORD.NOT_READY;
    submit.disabled = true;
  }
}

function handlePosterInput() {
  const posterTitleValue = posterTitleInput.value;

  if (posterTitleValue.indexOf(" ") !== -1) {
    errorMessage.innerText = `Poster Title : "${posterTitleValue}" is not available. If you want to set this poster title, you must set it "${posterTitleValue.replace(
      /\s/g,
      "-"
    )}".`;
    changeStateOfSubmitBtn(false);
    posterTitleInput.className = KEYWORD.BAD_INPUT;
  } else if (posterTitleValue === "") {
    errorMessage.innerText = "Poster Title is require.";
    posterTitleInput.className = KEYWORD.BAD_INPUT;
    changeStateOfSubmitBtn(false);
    cleanErrorMessage();
  } else {
    let no = false;
    for (let i = 0; i < posterTitleValue.length; i++) {
      const element = posterTitleValue[i];
      if (element === "/") {
        no = true;
      }
    }

    if (no) {
      errorMessage.innerText = "Do not include / in the poster name.";
      posterTitleInput.className = KEYWORD.BAD_INPUT;
    } else {
      pass.posterTitle = true;
      const posterExists = checkPosterExists(posterTitleValue);
      cleanErrorMessage();
    }
  }

  submitBtn();
}

async function handleTopicInput() {
  const topicExists = await checkTopicExists(topicTitleInput.value);
  submitBtn();
}

function cleanErrorMessage() {
  errorMessage.innerText = "";
}

function changeStateOfSubmitBtn(state) {
  if (state) {
    submit.className = KEYWORD.GOOD_BTN;
  } else if (!state) {
    submit.className = KEYWORD.NOT_READY;
  } else {
    console.error(
      `State ${state} is not available. you can put arg only "good" or "not-good"`
    );
  }
}

async function checkTopicExists(topicTitle) {
  if (!topicTitle) {
    return;
  }

  const { status } = await fetch(`/api/topics/${topicTitle}/exists`, {
    method: "POST",
  });

  if (status === STATUS_CODE.NOT_FOUND_CODE) {
    topicTitleInput.className = KEYWORD.BAD_INPUT;
    pass.topicExists = false;
    pass.topicTitle = false;
    return false;
  }

  if (status === STATUS_CODE.FOUND_CODE) {
    topicTitleInput.className = KEYWORD.GOOD_INPUT;
    pass.topicExists = true;
    pass.topicTitle = true;
    return true;
  }
}

async function checkPosterExists(posterTitle) {
  if (!posterTitle) {
    return;
  }

  const { status } = await fetch(`/api/posters/${posterTitle}/exists`, {
    method: "POST",
  });

  if (status === STATUS_CODE.ALEADY_TAKEN_CODE) {
    posterTitleInput.className = KEYWORD.BAD_INPUT;
    errorMessage.innerText = `Poster Title : ${posterTitle} is aleady taken in your posters`;
    pass.posterExists = false;
    pass.posterTitle = false;
    return false;
  }

  if (status === STATUS_CODE.OK_CODE) {
    posterTitleInput.className = KEYWORD.GOOD_INPUT;
    pass.posterExists = true;
    pass.posterTitle = true;
    return true;
  }
}

posterTitleInput.addEventListener("input", handlePosterInput);
topicTitleInput.addEventListener("input", handleTopicInput);