## EN
# FullStack Task Manager App using Typescript, React and Node.js + JWT Authorization

This app is a task management system, here you can create, update, delete, edit your own tasks. You can be a manager nor an executor. If you are a manager, you can assign tasks to your employees. If you are an executor, you can create and control your own tasks, and see tasks those have been assigned to you by your manager. The manager is selected on sign up page, but you can skip it and have no manager at all.

### HOW TO RUN APP
- Remember you need to have Node.js, Node Package Manager and PostgreSQL installed on your machine.
1. Clone the repository
2. Create **.env** in the backend folder and add the following variables: PORT=*your port for backend*, DATABASE_URL=postgresql://*user name*:*password*@localhost:*your database port*/*database name*?schema=public, JWT_SECRET=*your secret fixed string*, PASSWORD_SALT=*your secret fixed string*
3. Install pnpm globally: run `npm i -g pnpm` in your system terminal
4. Open the project folder, run `pnpm i` in your terminal, make sure you have no errors
5. Run `pnpm w checkall` to format and check frontend for any errors
6. Run `pnpm b checkall` to format and check backend for any errors
7. If no errors were thrown, start the app by running `pnpm dev` in your terminal
8. If all went well, you should see two clickable links. You're interested in the app link by Vite, by default it's http://localhost:5173/

---

## RU
# FullStack приложение для управления задачами на Typescript, React и Node.js + JWT Authorization

Это приложение представляет собой систему управления задачами в виде веб-приложения, где вы можете создавать, обновлять, удалять и редактировать свои задачи. Вы можете быть руководителем или исполнителем. Если вы руководитель, вы можете назначать задачи вашим сотрудникам. Если вы исполнитель, вы можете создавать и управлять своими задачами, а также видеть задачи, назначенные вам вашим руководителем. Руководитель выбирается на странице регистрации, но он не обязателен.

### КАК ЗАПУСТИТЬ ПРИЛОЖЕНИЕ
- Не забудьте установить на компьютер Node.js, Node Package Manager и PostgreSQL.
1. Склонируйте репозиторий
2. Создайте **.env** в папке backend и добавьте следующие переменные: PORT=*ваш порт для backend'а*, DATABASE_URL=postgresql://*имя пользователя*:*пароль*@localhost:*порт базы данных*/*название базы данных*?schema=public JWT_SECRET=*произвольная секретная строка*, PASSWORD_SALT=*произвольная секретнаястрока*
3. Установите pnpm: выполните `npm i -g pnpm` в терминале вашей системы
4. Откройте папку проекта, выполните `pnpm i` в терминале, убедитесь, что нет ошибок
5. Выполните `pnpm w checkall` для форматирования и проверки клиента на наличие ошибок
6. Выполните `pnpm b checkall` для форматирования и проверки сервера на наличие ошибок
7. Если ошибок нет, запустите приложение, выполнив команду `pnpm dev` в терминале
8. Если все прошло успешно, вы должны увидеть две ссылки, на которые можно нажать. Вам нужна ссылка на приложение, по умолчанию это http://localhost:5173/
