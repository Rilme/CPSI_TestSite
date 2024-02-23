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
    uploadFile(file, fileName); // Pass file and fileName to uploadFile function
  }
};

function uploadFile(file, name) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "upload.php");
  xhr.upload.addEventListener("progress", ({ loaded, total }) => {
    let fileLoaded = Math.floor((loaded / total) * 100);
    let fileTotal = Math.floor(total / 1000);
    let fileSize;
    fileTotal < 1024
      ? (fileSize = fileTotal + " KB")
      : (fileSize = (loaded / (1024 * 1024)).toFixed(2) + " MB");
    let progressHTML = `<li class="row">
                          <i class="fas fa-file-alt"></i>
                          <div class="content">
                            <div class="details">
                              <span class="name">${name} • Uploading</span>
                              <span class="percent">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>
                        </li>`;
    uploadedArea.classList.add("onprogress");
    progressArea.innerHTML = progressHTML;
    if (loaded == total) {
      progressArea.innerHTML = "";
      let uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fas fa-file-alt"></i>
                              <div class="details">
                                <span class="name">${name} • Uploaded</span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>
                            <i class="fas fa-check"></i>
                          </li>`;
      uploadedArea.classList.remove("onprogress");
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
    }
  });

  // Prepare the data to be sent to Power Automate
  let formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);

  // Make an HTTP POST request to send data to Power Automate
  let powerAutomateEndpoint = "https://prod-92.westus.logic.azure.com:443/workflows/b8aed472476d4e30a762027d45f29a3f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RvJN_krp58oEEFEz6KX-ye_0Yu-9v3hGlbN9JMQuMC4"; // Replace with your Power Automate endpoint
  xhr.open("fetch", powerAutomateEndpoint);
  xhr.send(formData);
}

function confirmUpload() {
  if (
    confirm("Are you sure you want to submit the information for extraction?")
  ) {
    fileInput.click(); // Trigger file input change event
    // window.location.href = "loadin.html"; // Redirect to another page
  } else {
    // User clicked Cancel, do nothing
  }
}
