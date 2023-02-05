const fileInput = document.querySelector("input");
const downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", function (e) {
  e.preventDefault();
  downloadBtn.innerText = "Downloading file...";
  fetchFile(fileInput.value);
});

function fetchFile(url) {
  // fetch the file and return response as blob
  fetch(url)
    .then((res) => res.blob())
    .then((file) => {
      // url.createobjecturl creates an url of passed object
      let tempUrl = URL.createObjectURL(file);
      console.log(tempUrl);
      let aTag = document.createElement("a");
      // passing tempUrl as href value of <a> tag
      aTag.href = tempUrl;
      // passing filename as download value of <a> tag
      aTag.download = "filename";
      // passing file last name end extension as download value of <a> tag
      //   aTag.download = url.replace(/^.*[\\\/]/, "");
      document.body.appendChild(aTag);
      aTag.click(); // click <a> tag to start download
      aTag.remove(); // remove <a> tag once download completed
      URL.revokeObjectURL(tempUrl); // remove the tempurl from the document
      downloadBtn.innerText = "Download File";
      fileInput.value = "";
    })
    .catch(() => {
      const alert = document.querySelector(".alert");
      alert.innerText = "Download Failed";
      setInterval(() => {
        downloadBtn.innerText = "Download File";
        alert.innerText = "";
        aTag.remove();
      }, 3000);
    });
}
