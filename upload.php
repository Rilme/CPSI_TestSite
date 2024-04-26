<?php
  // Retrieve the name of the uploaded file from the $_FILES array
  $file_name =  $_FILES['file']['name'];
  // Retrieve the temporary file name of the uploaded file from the $_FILES array
  $tmp_name = $_FILES['file']['tmp_name'];
  // Generate a unique name for the uploaded file by appending the current timestamp to its original name
  $file_up_name = time().$file_name;
  // Move the uploaded file from its temporary location to a permanent location with the new unique name
  move_uploaded_file($tmp_name, "files/".$file_up_name);
?>
