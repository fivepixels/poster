import { async } from "regenerator-runtime";

const STATUS_CODE = {
  OK_CODE: 200,
  CREATED_CODE: 201,
  UPDATED_CODE: 204,
  NOT_FOUND_CODE: 302,
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

const defaultTopicTitle = new URLSearchParams(
  window.location.href.split("?")[1]
).get("topic");

const posterTitleInput = document.querySelector("#posterTitle");
const topicTitleInput = document.querySelector("#topicTitle");
const submit = document.querySelector("#newPosterSubmitBtn");
const errorMessage = document.querySelector("#errorMessage");

topicTitleInput.value = defaultTopicTitle;

async function handleSubmitBtnClick() {
  const posterTitleValue = posterTitleInput.value;
  const topicTitleValue = topicTitleInput.value;

  await checkPosterExists(posterTitleInput.value);
  await checkTopicExists(topicTitleInput.value);
}

function handlePosterInput() {
  const posterTitleValue = posterTitleInput.value;

  if (posterTitleValue.indexOf(" ") !== -1) {
    errorMessage.innerText = `Poster Title : "${posterTitleValue}" is not available. If you want to set this poster title, you must set it "${posterTitleValue.replace(
      /\s/g,
      "-"
    )}".`;
    changeStateOfSubmitBtn(false);
  } else if (posterTitleValue === "") {
    errorMessage.innerText = "Poster Title is require.";
    changeStateOfSubmitBtn(false);
    cleanErrorMessage();
  } else {
    cleanErrorMessage();
  }
}

async function handleTopicInput() {
  const topicExists = await checkTopicExists(topicTitleInput.value);
  console.log(topicExists);
}

function cleanErrorMessage() {
  errorMessage.innerText = "";
}

function changeStateOfSubmitBtn(state) {
  if (state) {
    submit.className = "good-button";
  } else if (!state) {
    submit.className = "good-button__not-ready";
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
    return false;
  }

  if (status === STATUS_CODE.FOUND_CODE) {
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
    return false;
  }

  if (status === STATUS_CODE.OK_CODE) {
    return true;
  }
}

posterTitleInput.addEventListener("input", handlePosterInput);
topicTitleInput.addEventListener("input", handleTopicInput);
submit.addEventListener("click", handleSubmitBtnClick);
