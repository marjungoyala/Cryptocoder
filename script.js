function encryptFile() {
  const fileInput = document.getElementById('file');
  const shift = parseInt(document.getElementById('shift').value);

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const content = e.target.result;
    const encryptedContent = encrypt(content, shift);
    downloadFile(encryptedContent, 'encrypted.txt');
  };

  reader.readAsText(file);
}

function decryptFile() {
  const fileInput = document.getElementById('file');
  const shift = parseInt(document.getElementById('shift').value);

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const content = e.target.result;
    const decryptedContent = decrypt(content, shift);
    downloadFile(decryptedContent, 'decrypted.txt');
  };

  reader.readAsText(file);
}

function encrypt(text, shift) {
  let encryptedText = '';

  for (let i = 0; i < text.length; i++) {
    let char = text[i];

    if (char.match(/[a-z]/i)) {
      const code = text.charCodeAt(i);

      if (code >= 65 && code <= 90) {
        char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
    }

    encryptedText += char;
  }

  return encryptedText;
}

function decrypt(text, shift) {
  return encrypt(text, 26 - shift);
}

function downloadFile(content, filename) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
