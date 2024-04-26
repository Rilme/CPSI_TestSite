// Selecting the form element
const form = document.querySelector("form"),
  // Selecting the file input element
  fileInput = document.querySelector(".file-input"),
  // Selecting the progress area element
  progressArea = document.querySelector(".progress-area"),
  // Selecting the uploaded area element
  uploadedArea = document.querySelector(".uploaded-area");

// Adding an event listener to the form to trigger a click on the file input
form.addEventListener("click", () => {
  fileInput.click();
});

// Handling the onchange event of the file input
fileInput.onchange = ({ target }) => {
  // Getting the selected file
  let file = target.files[0];
  if (file) {
    let fileName = file.name;
    // Check if the file extension is valid
    if (!/\.(jpg|jpeg|png|gif|pdf)$/i.test(fileName)) {
      alert("Please select a valid file (JPG, JPEG, PNG, GIF, or PDF).");
      fileInput.value = ""; // Clear the file input
      return;
    }

    // Truncate the file name if it's longer than 12 characters
    if (fileName.length >= 12) {
      let splitName = fileName.split(".");
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }
    // Call the uploadFile function with the truncated file name
    uploadFile(fileName);
  }
};

// Function to upload the file
function uploadFile(name) {
  // Creating a new XMLHttpRequest object
  let xhr = new XMLHttpRequest();
  // Configuring the XMLHttpRequest object with the URL
  xhr.open("PUT", "https://prod-173.westus.logic.azure.com:443/workflows/19a7802636e7475fb92406b50488ca70/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Y23Xo-p_makAwXqKg9nJduQmOaMXl5McFk2LZ4ujXVk");
  // Adding an event listener to track the progress of the upload
  xhr.upload.addEventListener("progress", ({ loaded, total }) => {
    // Calculating the percentage of the file uploaded
    let fileLoaded = Math.floor((loaded / total) * 100);
    let fileTotal = Math.floor(total / 1000);
    let fileSize;
    // Converting file size to KB or MB based on the total size
    fileTotal < 1024
      ? (fileSize = fileTotal + " KB")
      : (fileSize = (loaded / (1024 * 1024)).toFixed(2) + " MB");
    // HTML markup to display upload progress
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
    // Displaying the progress HTML
    uploadedArea.classList.add("onprogress");
    progressArea.innerHTML = progressHTML;
    // Checking if the upload is complete
    if (loaded == total) {
      progressArea.innerHTML = "";
      // HTML markup to display uploaded file information
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
      // Removing the 'onprogress' class and displaying the uploaded HTML
      uploadedArea.classList.remove("onprogress");
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
    }
  });
  // Creating a new FormData object and sending it via XMLHttpRequest
  let data = new FormData(form);
  xhr.send(data);
}

// Function to confirm upload
function confirmUpload() {
  // Getting the selected file
  let file = fileInput.files[0];
  if (!file) {
    alert("Please select a file to upload.");
    return; // Exit the function early if no file is selected
  }

  // Asking for confirmation from the user
  if (confirm("Are you sure you want to submit the information for extraction?")) {
    // Redirecting to another page if confirmed
    window.location.href = "loadin.html";
    // window.location.href = "loadin.html"; // Redirect to Validation.html
  } else {
    // User clicked Cancel, do nothing
  }
}
