export const config = {
  api: {
    bodyParser: {
      sizeLimit: "2mb"
    }
  }
};

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    // безопасный разбор body
    const body = typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body;

    const profileLink = body?.profileLink;

    if (!profileLink) {
      return res.status(400).json({ error: "No profileLink" });
    }

    // Telegram limit safety (4096 chars max)
    const text = String(profileLink);

    const telegramUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text: text
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        error: "Telegram error",
        details: data
      });
    }

    return res.status(200).json({ ok: true });

  } catch (err) {
    return res.status(500).json({
      error: "Server crash",
      message: err.message
    });
  }
}
