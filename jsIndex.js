const form = document.querySelector("form"),
  fileInput = document.querySelector(".file-input"),
  progressArea = document.querySelector(".progress-area"),
  uploadedArea = document.querySelector(".uploaded-area");

form.addEventListener("click", () => {
  fileInput.click();
});

fileInput.onchange = ({ target }) => {
  let file = target.files[0];
  if (file) {
    let fileName = file.name;
    if (fileName.length >= 12) {
      let splitName = fileName.split(".");
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }
    uploadFile(file, fileName);
  }
};

function uploadFile(file, name) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://prod-92.westus.logic.azure.com:443/workflows/b8aed472476d4e30a762027d45f29a3f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RvJN_krp58oEEFEz6KX-ye_0Yu-9v3hGlbN9JMQuMC4");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Handle successful upload if needed
      console.log("File uploaded successfully");
    }
  };

  let formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);

  xhr.send(JSON.stringify({ file: formData }));
}

function confirmUpload() {
  if (
    confirm("Are you sure you want to submit the information for extraction?")
  ) {
    // uploadFile();
    window.location.href = "loadin.html"; // Redirect to Validation.html
  } else {
    // User clicked Cancel, do nothing
  }
}
