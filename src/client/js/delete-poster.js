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

const posterInfo = JSON.parse(
  document.querySelector("#poster").dataset.posterInfo
);
const deleteBtn = document.querySelector("#deleteBtn");

let nowPass = 0;
let pass = 10;

function writeDeleteBtn(content) {
  deleteBtn.innerText = content;
}

async function handleClickDeleteBtn() {
  if (nowPass < pass) {
    nowPass += 1;
    writeDeleteBtn(nowPass);
    return;
  }

  const { status } = await fetch(
    `/${posterInfo.owner}/${posterInfo.title}/delete`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  if (status === STATUS_CODE.UPDATED_CODE) {
    window.location.href = "/";
  }
}

deleteBtn.addEventListener("click", handleClickDeleteBtn);
