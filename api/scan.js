export default function handler(req, res) {
  const { content, settings } = req.body;
  const lines = content.split("\n");
  const results = [];

  lines.forEach((line, index) => {
    if (settings.webhook && /discord(?:app)?\.com\/api\/webhooks/i.test(line)) {
      results.push(`Line ${index + 1}: Discord Webhook detected`);
    }
    if (settings.token && /\btoken\b/i.test(line)) {
      results.push(`Line ${index + 1}: Token usage detected`);
    }
    if (settings.evalExec && /(eval|exec|Function\()/i.test(line)) {
      results.push(`Line ${index + 1}: Dangerous function detected`);
    }
  });

  res.status(200).json({ results });
}
