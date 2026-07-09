export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();
    const date = (data && data.date) || "не указано";
    const time = (data && data.time) || "не указано";
    const location = (data && data.location) || "не указано";

    const text =
      "Новый ответ на сайт-приглашение!\n\n" +
      "День: " + date + "\n" +
      "Время: " + time + "\n" +
      "Место: " + location;

    const token = env.TELEGRAM_BOT_TOKEN;
    const chatId = env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return new Response(JSON.stringify({ ok: false, error: "missing env vars" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const tgResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: text }),
    });

    if (!tgResponse.ok) {
      const errText = await tgResponse.text();
      return new Response(JSON.stringify({ ok: false, error: errText }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// На случай если кто-то откроет /api/notify в браузере напрямую (GET-запрос)
export async function onRequestGet() {
  return new Response("Этот адрес принимает только POST-запросы от сайта.", { status: 405 });
}
