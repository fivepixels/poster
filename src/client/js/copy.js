const copy = document.querySelectorAll("#copycopy");

function handleCopy(event) {
  const copiedText = event.path[1].dataset.copyThis;
  const span = event.path[0];
  navigator.clipboard.writeText("localhost:4000" + String(copiedText));
  span.innerText = "The url is copied!";
}

for (let i = 0; i < copy.length; i++) {
  const element = copy[i];
  element.addEventListener("click", handleCopy);
}
