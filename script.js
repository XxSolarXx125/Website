let scanResults = '';

function scanFile() {
  const file = document.getElementById("codeFile").files[0];
  const resultBox = document.getElementById("result");
  if (!file) return alert("Select a file first!");

  const reader = new FileReader();
  reader.onload = async function (e) {
    const content = e.target.result;

    const settings = {
      token: document.getElementById("checkTokens").checked,
      webhook: document.getElementById("checkWebhook").checked,
      evalExec: document.getElementById("checkEval").checked,
    };

    const response = await fetch("/api/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, settings }),
    });

    const { results } = await response.json();
    scanResults = results.join("\n");
    resultBox.innerHTML = results.length
      ? `<h3>⚠️ Suspicious Code Found:</h3><pre>${scanResults}</pre>`
      : "<p>✅ No issues detected!</p>";
  };

  reader.readAsText(file);
}

function downloadResults() {
  if (!scanResults) return alert("No scan results available.");
  const blob = new Blob([scanResults], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "scan-results.txt";
  link.click();
}

function toggleSettings() {
  const panel = document.getElementById("settingsPanel");
  panel.style.display = panel.style.display === "block" ? "none" : "block";
}
