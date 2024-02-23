function uploadFile(name) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://prod-92.westus.logic.azure.com:443/workflows/b8aed472476d4e30a762027d45f29a3f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=RvJN_krp58oEEFEz6KX-ye_0Yu-9v3hGlbN9JMQuMC4");
  
  xhr.upload.addEventListener("progress", ({ loaded, total }) => {
    // Progress handling code remains the same
  });

  xhr.onload = function() {
    if (xhr.status === 200) {
      // Success handling code, if required
      console.log("File uploaded successfully");
    } else {
      // Error handling code, if required
      console.error("Error uploading file");
    }
  };

  let data = new FormData();
  data.append('file', fileInput.files[0]); // Append the uploaded file to FormData
  xhr.send(data);
}
