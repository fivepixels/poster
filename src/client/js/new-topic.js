import { async } from "regenerator-runtime";

const topicTitle = document.querySelector("#posterTitle");
const description = document.querySelector("#description");
const manyPositionsBtn = document.querySelector("#manyPositions");
const agreeAndDisagreeBtn = document.querySelector("#agreeAndDisagree");
const submitBtn = document.querySelector("#newPosterSubmitBtn");
const errorMessage = document.querySelector("#errorMessage");

errorMessage.innerText = "";
submitBtn.disabled = true;

const STATUS_CODE = {
  OK_CODE: 200,
  CREATED_CODE: 201,
  UPDATED_CODE: 204,
  FOUND_CODE: 302,
  BAD_REQUEST_CODE: 400,
  NOT_FOUND_CODE: 404,
  NOT_ACCEPTABLE_CODE: 405,
  ALREADY_TAKEN_CODE: 409,
};

const KEYWORD = {
  GOOD_BTN: "good-button",
  NOT_READY: "good-button__not-ready",
  GOOD_INPUT: "good-input",
  BAD_INPUT: "bad-input",
};

let pass = {
  topic: false,
  positions: "",
};

function submit() {
  if (pass.topic && pass.positions) {
    submitBtn.className = KEYWORD.GOOD_BTN;
    submitBtn.disabled = false;
  } else {
    submitBtn.className = KEYWORD.NOT_READY;
    submitBtn.disabled = true;
  }
}

async function handleTopicInput(event) {
  const {
    target: { value },
  } = event;

  const { status } = await fetch(`/api/topics/${value}/exists`, {
    method: "POST",
  });

  if (!value) {
    errorMessage.innerText = "";
    pass.topic = false;
    topicTitle.className = KEYWORD.BAD_INPUT;
  } else if (status === STATUS_CODE.NOT_FOUND_CODE) {
    errorMessage.innerText = "";
    pass.topic = true;
    topicTitle.className = KEYWORD.GOOD_INPUT;
  } else if (status === STATUS_CODE.FOUND_CODE) {
    errorMessage.innerText = `Topic Title : ${value} is aleady taken.`;
    pass.topic = false;
    topicTitle.className = KEYWORD.BAD_INPUT;
  }

  submit();
}

function handleMPClick() {
  manyPositionsBtn.className = KEYWORD.GOOD_BTN;
  agreeAndDisagreeBtn.className = KEYWORD.NOT_READY;

  pass.positions = "Many Positions";

  submit();
}

function handleAADClick() {
  agreeAndDisagreeBtn.className = KEYWORD.GOOD_BTN;
  manyPositionsBtn.className = KEYWORD.NOT_READY;

  pass.positions = "Agree / Disagree";

  submit();
}

async function handleSubmit(event) {
  event.preventDefault();

  let data = {
    title: topicTitle.value,
    description: description.value,
    type: pass.positions,
  };

  const response = await fetch("/topics/new", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === STATUS_CODE.CREATED_CODE) {
    window.location.href = `/topics/${data.title}`;
  }

  if (response.status === STATUS_CODE.BAD_REQUEST_CODE) {
    errorMessage.innerText = "Error : Please try again";
  }
}

topicTitle.addEventListener("input", handleTopicInput);
manyPositionsBtn.addEventListener("click", handleMPClick);
agreeAndDisagreeBtn.addEventListener("click", handleAADClick);
submitBtn.addEventListener("click", handleSubmit);
