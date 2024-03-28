const errorMessage = document.querySelector("#errorMessage");
const explainLabel = document.querySelector("#newPosterExp");
const chooseTopicLabel = document.querySelector("#chooseTopic");

const posterTitleInput = document.querySelector("#posterTitle");
const posterDescriptionInput = document.querySelector("#description");
const topicTitleInput = document.querySelector("#topicTitle");

const positionsInput = document.querySelector("#positions");
const positions = document.querySelector("#positionBox");

const agreeDisagreeBtns = document.querySelector("#agreeDisagreeBtns");
const agreeBtn = document.querySelector("#agree");
const disagreeBtn = document.querySelector("#disagree");

const submit = document.querySelector("#newPosterSubmitBtn");

const STATUS_CODE = {
  OK_CODE: 200,
  CREATED_CODE: 201,
  UPDATED_CODE: 204,
  FOUND_CODE: 302,
  BAD_REQUEST_CODE: 400,
  NOT_FOUND_CODE: 404,
  NOT_ACCEPTABLE_CODE: 405,
  ALREADY_TAKEN_CODE: 409
};

let pass = {
  posterTitle: false,
  posterExists: false,
  posterAlreadyTakenInTopic: false,
  topicExists: false,
  type: "",
  position: ""
};

const KEYWORD = {
  GOOD_BTN: "good-button",
  NOT_READY: "good-button__not-ready",
  GOOD_INPUT: "good-input",
  BAD_INPUT: "bad-input",
  NONE_DISPLAY: "none-display",
  POST: "POST"
};

const defaultTopicTitle = new URLSearchParams(
  window.location.href.split("?")[1]
).get("topic");

let topicType = "";
topicTitleInput.value = defaultTopicTitle;

function handlePosterInput() {
  const posterTitleValue = posterTitleInput.value;

  pass.posterTitle.className = KEYWORD.GOOD_INPUT;

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
      checkPosterExists(posterTitleValue);
      cleanErrorMessage();
    }
  }

  submitBtn();
}

async function handleTopicInput() {
  topicTitleInput.className = KEYWORD.BAD_INPUT;
  const value = topicTitleInput.value;

  if (value) {
    checkTopicExists(value);
    checkAlreadyTakenInTopic(value, posterTitleInput.value);
    getTopicType(value);
  } else {
    positions.className = KEYWORD.NONE_DISPLAY;
    agreeDisagreeBtns.className = KEYWORD.NONE_DISPLAY;
    explainLabel.innerText = "Choose a Topic";
    cleanErrorMessage();
  }

  submitBtn();
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

  submitBtn();
}

function handlePositionInput() {
  pass.position = positionsInput.value;

  submitBtn();
}

function handleADBClick() {
  disagreeBtn.className = KEYWORD.NOT_READY;
  agreeBtn.className = KEYWORD.GOOD_BTN;
  pass.position = "Agree";

  submitBtn();
}

function handleDABClick() {
  disagreeBtn.className = KEYWORD.GOOD_BTN;
  agreeBtn.className = KEYWORD.NOT_READY;
  pass.position = "Disagree";

  submitBtn();
}

function cleanErrorMessage() {
  errorMessage.innerText = "";

  submitBtn();
}

async function getTopicType(topicTitle) {
  if (!topicTitle) {
    positions.className = KEYWORD.NONE_DISPLAY;
    agreeDisagreeBtns.className = KEYWORD.NONE_DISPLAY;
    explainLabel.innerText = "";
  } else {
    await fetch(`/api/topics/${topicTitle}/topic-type`, {
      method: KEYWORD.POST
    })
      .then(res => res.json())
      .then(data => (topicType = data.type));

    if (!topicType) {
      positions.className = KEYWORD.NONE_DISPLAY;
      agreeDisagreeBtns.className = KEYWORD.NONE_DISPLAY;
      chooseTopicLabel.className = KEYWORD.NONE_DISPLAY;
    } else {
      chooseTopicLabel.className = KEYWORD.NONE_DISPLAY;
      explainLabel.innerText = `This type is ${topicType} type. Choose your positions.`;

      if (topicType === "Agree / Disagree") {
        positions.className = KEYWORD.NONE_DISPLAY;
        agreeDisagreeBtns.className = "";
        pass.type = "Agree / Disagree";
      }

      if (topicType === "Many Positions") {
        positions.className = "";
        agreeDisagreeBtns.className = KEYWORD.NONE_DISPLAY;
        pass.type = "Many Positions";
      }
    }
  }
}

async function checkTopicExists(topicTitle) {
  if (!topicTitle) {
    return;
  }

  const { status } = await fetch(`/api/topics/${topicTitle}/exists`, {
    method: KEYWORD.POST
  });

  if (status === STATUS_CODE.NOT_FOUND_CODE) {
    topicTitleInput.className = KEYWORD.BAD_INPUT;
    positions.className = KEYWORD.NONE_DISPLAY;
    agreeDisagreeBtns.className = KEYWORD.NONE_DISPLAY;
    errorMessage.innerText = `Topic : ${topicTitle} is not found.`;
    pass.topicExists = false;
    return false;
  }

  if (status === STATUS_CODE.FOUND_CODE) {
    topicTitleInput.className = KEYWORD.GOOD_INPUT;
    pass.topicExists = true;
    cleanErrorMessage();
    return true;
  }

  submitBtn();
}

async function checkPosterExists(posterTitle) {
  if (!posterTitle) {
    return;
  }

  const { status } = await fetch(`/api/posters/${posterTitle}/exists`, {
    method: KEYWORD.POST
  });

  if (status === STATUS_CODE.ALREADY_TAKEN_CODE) {
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

  submitBtn();
}

async function checkAlreadyTakenInTopic(topicTitle, posterTitle) {
  if (!topicTitle || !posterTitle) {
    return;
  }

  const { status } = await fetch(
    `/api/topics/${topicTitle}/${posterTitle}/already-taken`,
    {
      method: KEYWORD.POST
    }
  );

  if (status === STATUS_CODE.ALREADY_TAKEN_CODE) {
    topicTitleInput.className = KEYWORD.BAD_INPUT;
    errorMessage.innerText = `Poster Title : ${posterTitle} is already taken in posters of the topic.`;
    pass.posterAlreadyTakenInTopic = false;
  }

  if (status === STATUS_CODE.OK_CODE) {
    topicTitleInput.className = KEYWORD.GOOD_INPUT;
    pass.posterAlreadyTakenInTopic = true;
  }

  if (status === STATUS_CODE.NOT_FOUND_CODE) {
    topicTitleInput.className = KEYWORD.BAD_INPUT;
    errorMessage.innerText = `Topic Title : ${topicTitle} is not found.`;
    pass.topicExists = false;
  }

  submitBtn();
}

function submitBtn() {
  if (
    pass.posterTitle &&
    pass.posterExists &&
    pass.topicExists &&
    pass.posterAlreadyTakenInTopic &&
    pass.type !== "" &&
    pass.position !== ""
  ) {
    submit.className = KEYWORD.GOOD_BTN;
    submit.disabled = false;
  } else {
    submit.className = KEYWORD.NOT_READY;
    submit.disabled = true;
  }
}

async function handelSubmit(event) {
  event.preventDefault();

  const data = {
    topic: topicTitleInput.value,
    title: posterTitleInput.value,
    description: posterDescriptionInput.value,
    position: pass.position
  };

  const { status } = await fetch("/new", {
    method: KEYWORD.POST,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (status === STATUS_CODE.CREATED_CODE) {
    const username = submit.dataset.username;
    window.location.href = `${username}/${data.title}`;
  }
}

submitBtn();
handlePosterInput();
handleTopicInput();

posterTitleInput.addEventListener("input", handlePosterInput);
topicTitleInput.addEventListener("input", handleTopicInput);
positionsInput.addEventListener("input", handlePositionInput);
agreeBtn.addEventListener("click", handleADBClick);
disagreeBtn.addEventListener("click", handleDABClick);
submit.addEventListener("click", handelSubmit);
