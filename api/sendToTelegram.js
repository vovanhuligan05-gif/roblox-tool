export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const { profileLink } = req.body;

    if (!profileLink) {
      return res.status(400).json({ error: "No link provided" });
    }

    const token = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: `📌 New Roblox link:\n${profileLink}`
      })
    });

    return res.status(200).json({ ok: true });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
