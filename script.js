function scanFile() {
  const fileInput = document.getElementById("codeFile");
  const resultBox = document.getElementById("result");
  resultBox.innerHTML = "";

  if (!fileInput.files.length) {
    resultBox.innerHTML = "<p>Please select a file to scan.</p>";
    return;
  }

  const suspiciousPatterns = [
    /discord(?:app)?\.com\/api\/webhooks/i,
    /fetch\("https:\/\/discord(?:app)?\.com/i,
    /axios\.post\(["']https:\/\/discord(?:app)?\.com/i,
    /require\(["']request["']\)/i,
    /token/i
  ];

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const contents = e.target.result;
    const lines = contents.split("\n");
    let issuesFound = [];

    lines.forEach((line, index) => {
      suspiciousPatterns.forEach((pattern) => {
        if (pattern.test(line)) {
          issuesFound.push(`Line ${index + 1}: ${line}`);
        }
      });
    });

    if (issuesFound.length > 0) {
      resultBox.innerHTML = `<h3>Suspicious Lines Found:</h3><pre>${issuesFound.join("\n")}</pre>`;
    } else {
      resultBox.innerHTML = "<p>No suspicious lines found. ✅</p>";
    }
  };

  reader.readAsText(file);
}
