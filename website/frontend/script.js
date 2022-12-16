document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('name').addEventListener('input', function () {
    this.style.borderColor = '';
  });
  document.getElementById('topic').addEventListener('input', function () {
    this.style.borderColor = '';
  });
  document.getElementById('details').addEventListener('input', function () {
    this.style.borderColor = '';
  });
  document.getElementById('date').addEventListener('input', function () {
    this.style.borderColor = '';
  });
  document.getElementById('periods').addEventListener('input', function () {
    this.style.borderColor = '';
  });
});

function sendLKRequest() {
  const apiKey = '{{postmanApikey}}';
  const fach = document.getElementById('name').value;
  const thema = document.getElementById('topic').value;
  const details = document.getElementById('details').value;
  const datum = document.getElementById('date').value;
  const block = document.getElementById('periods').value;

  // Check if all fields have a value
  if (!fach || !thema || !details || !datum || !block) {
    // If any field is empty, highlight it and return
    const fields = [fach, thema, details, datum, block];
    const fieldIds = ['name', 'topic', 'details', 'date', 'periods'];
    for (let i = 0; i < fields.length; i++) {
      if (!fields[i]) {
        document.getElementById(fieldIds[i]).style.borderColor = 'red';
      }
    }
    return;
  }

  // Format the date value as "yyyy-mm-dd"
  const formattedDate = new Date(datum).toISOString().slice(0, 10);

  const url = `https://api.minesort.de:8080/fap13/postlekinfos?apikey=${apiKey}&fach=${fach}&datum=${formattedDate}&thema=${thema}&block=${block}&details=${details}`;

  fetch(url, {
    method: 'GET',
  })
    .then((response) => {
      if (response.includes('done')) {
        // Reset the input fields
        document.getElementById('name').value = '';
        document.getElementById('topic').value = '';
        document.getElementById('details').value = '';
        document.getElementById('date').value = '';
        document.getElementById('periods').value = '';

        // Show a success alert
        alert('LK request sent successfully!');
      } else {
        // Handle the error
      }
    })
    .catch((error) => {
      // Show an error alert
      alert('There was an error sending the LK request: ' + error);
    });
}
