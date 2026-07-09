# Как задеплоить и получить уведомление в Telegram

## 1. Создай Telegram-бота для уведомлений

1. Открой в Telegram бота **@BotFather**
2. Отправь `/newbot`, придумай имя и username (например `nikita_date_notify_bot`)
3. BotFather пришлёт **токен** вида `123456789:AAExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` — сохрани его
4. Напиши своему новому боту в личку любое сообщение (например "привет"), это нужно, чтобы бот увидел твой chat_id

## 2. Узнай свой chat_id

1. Перейди в браузере по ссылке (вставь свой токен вместо `<TOKEN>`):
   ```
   https://api.telegram.org/bot<TOKEN>/getUpdates
   ```
2. В ответе найди `"chat":{"id":123456789,...}` — это число и есть твой `TELEGRAM_CHAT_ID`

## 3. Залей проект на GitHub

Открой терминал в папке проекта:

```bash
git init
git add .
git commit -m "date invite site"
git branch -M main
git remote add origin https://github.com/fomin-dev/date-invite.git
git push -u origin main
```

(если репозитория `date-invite` ещё нет — создай его пустым на github.com перед `git push`)

## 4. Подключи Cloudflare Pages

1. Зайди в Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git
2. Выбери репозиторий `date-invite`
3. Build settings можно оставить пустыми (framework preset: None), build command не нужен, output directory — `/`
4. Нажми Save and Deploy

## 5. Добавь переменные окружения

1. В настройках проекта на Cloudflare Pages: Settings → Environment variables
2. Добавь для **Production** и **Preview**:
   - `TELEGRAM_BOT_TOKEN` = токен из шага 1
   - `TELEGRAM_CHAT_ID` = число из шага 2
3. После добавления переменных сделай redeploy (Deployments → три точки → Retry deployment), чтобы функция их подхватила

## 6. Проверь

Открой свой сайт на выданном Cloudflare адресе (`https://date-invite.pages.dev`), пройди все шаги сам и убедись, что сообщение приходит в Telegram.

Если хочешь подключить свой домен — это делается в том же проекте, вкладка Custom domains.

## Структура проекта

```
index.html              — весь сайт (разметка, стили, JS) одним файлом
functions/api/notify.js — серверная функция, отправляет данные в Telegram
```

Ничего больше на бэкенде разворачивать не нужно — это использует встроенные Cloudflare Pages Functions, а не отдельный сервер на Render.
