export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { profileLink } = req.body;

    const token = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const body = JSON.stringify({
      chat_id: chatId,
      text: `Пользователь отправил ссылку: ${profileLink}`
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body
    });

    if (response.ok) {
      res.status(200).json({ message: 'Сообщение отправлено в Telegram!' });
    } else {
      res.status(500).json({ error: 'Ошибка отправки сообщения' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Метод ${req.method} не разрешён`);
  }
}
