export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb"
    }
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST" });
  }

  const { profileLink } = req.body;

  const text = String(profileLink);

  await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: process.env.CHAT_ID,
      text: text
    })
  });

  res.status(200).json({ ok: true });
}
