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
  let powerAutomateEndpoint = "https://prod-92.westus.logic.azure.com:443/workflows/b8aed472476d4e30a762027d45f29a3f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RvJN_krp58oEEFEz6KX-ye_0Yu-9v3hGlbN9JMQuMC4"; // Replace with your Power Automate endpoint
  
  let formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);

  fetch(powerAutomateEndpoint, {
    method: "POST",
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
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
