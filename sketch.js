let resizeImg;
let resizeImgName;
let width = 128;
let height = 128;

function setup() {
  select("*").drop(droppedFile);
  document
    .querySelector(".imageDragContainer")
    .addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.id === "imageURL") return;
      else if (e.target.id === "loadImage") return loadImageFromURL();
      inputClicked();
    });
  window.addEventListener("paste", (e) => {
    e.preventDefault();
    let file = e.clipboardData.files[0];
    GetImageData(file);
  });
}

function draw() {
  width = Number(select("#width").value());
  height = Number(select("#height").value());
}

function saveImage() {
  resizeImg.resize(width, height);
  resizeImg.save(`${resizeImgName}${width}x${height}`);
}

function droppedFile(file) {
  console.log("Working", file);
  resizeImgName = file.name.replace(/(\.jpeg|\.png|\.jpg|\.jiff)/gi, "");
  resizeImg = loadImage(file.data);
  displayImage(file.data);
}

function inputClicked() {
  let inputEle = document.createElement("input");
  inputEle.type = "file";
  inputEle.accept = "image/*";
  inputEle.style["display"] = "none";
  document.body.appendChild(inputEle);
  inputEle.addEventListener("change", (e) => {
    e.preventDefault();
    let file = inputEle.files[0];
    GetImageData(file);
    inputEle.remove();
  });
  inputEle.click();
}

function loadImageFromURL() {
  let imageUrlEle = document.querySelector("#imageURL");
  if (imageUrlEle.value && imageUrlEle.value.includes("http")) {
    resizeImg = loadImage(imageUrlEle.value);
    resizeImgName = imageUrlEle.value;
    displayImage(imageUrlEle.value);
  }
}

function GetImageData(file) {
  let reader = new FileReader();
  reader.addEventListener(
    "load",
    function () {
      resizeImg = loadImage(reader.result);
      resizeImgName = file.name.replace(
        /(\.jpeg|\.png|\.jpg|\.jiff|\.gif|\.mp4|\.mpeg)/gi,
        ""
      );
      displayImage(reader.result);
    },
    false
  );
  reader.readAsDataURL(file);
}

function displayImage(src) {
  let image = document.querySelector("#preview");
  image.src = src;
}
