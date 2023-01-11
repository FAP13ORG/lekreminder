const fieldIds = ['name', 'topic', 'details', 'date', 'periods'];

document.addEventListener('DOMContentLoaded', function () {
  for (const field of fieldIds) {
    document.getElementById(field).addEventListener('input', function () {
      this.style.borderColor = '';
    });
  }
});

function sendLKRequest() {
  // Get values and replace space with +
  const fach = document.getElementById('name').value.replace(/\s+/g, '+');
  const thema = document.getElementById('topic').value.replace(/\s+/g, '+');
  const details = document.getElementById('details').value.replace(/\s+/g, '+');
  const datum = document.getElementById('date').value.replace(/\s+/g, '+');
  const block = document.getElementById('periods').value.replace(/\s+/g, '+');  

  // Check if all fields have a value
  const fields = [fach, thema, details, datum, block];
  if (!fields.every(Boolean)) {
    // If any field is empty, highlight it and return
    for (let i = 0; i < fields.length; i++) {
      if (!fields[i]) {
        document.getElementById(fieldIds[i]).style.borderColor = 'red';
      }
    }
    return;
  }

  // Reset the input fields
  for (const field of fieldIds) {
    document.getElementById(field).value = '';
  }

  // Format the date value as "yyyy-mm-dd"
  const formattedDate = new Date(datum).toISOString().slice(0, 10);

  // Backend URL
  //TODO: change to json transfer
  const url = `https://api.minesort.de:8080/fap13/postlekinfos?fach=${fach}&datum=${formattedDate}&thema=${thema}&block=
  ${block}&details=${details}`.replace(g, '+');
  
  fetch(url, {
    method: 'GET',
    mode: 'no-cors',
  })
    .then((response) => {
      if (response == 'done') {
        // Reset the input fields
        for (const field of fieldIds) {
          document.getElementById(field).value = '';
        }
        // Show a success alert
        alert('LK request sent successfully!');
      } else {
        // Handle the error
      }
    })
    .catch((error) => {
      // Show an error alert
      alert('There was an error sending the LK request: \n' + error);
    });
}
