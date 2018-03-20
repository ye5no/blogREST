# Blog REST API

## Установка
1. склонировать репозиторий
2. npm install
3. Для запуска в development-окружении: npm run development

## Страница тестирования API
По адресу /api/testAPI доступен интерфейс тестирования всех функций API.

## Работа с пользователями

### POST /api/user/signup
Регистрация пользователя на сервере.<br/>
Вернет ошибку если пользователь уже авторизован.<br/>
Принимает content-type application/json и application/x-www-form-urlencoded.<br/>
В JSON должны находиться обзательные поля для создания пользователя ['email', 'password', 'admin']<br/>
admin указывает на права пользователя. Может быть true или false. В реальной жизни, конечно же, так не делается.<br/>
email и password в реальной жизни предполагают валидацию, но в данном коде это не предусмотрено.
Возвращает 'user created'.

### POST /api/user/login
Авторизация пользователя на сервер.<br/>
Вернет ошибку если пользователь уже авторизован.<br/>
Принимает content-type application/json и application/x-www-form-urlencoded.<br/>
В JSON должны находиться обзательные поля для логина - ['email', 'password'].<br/>
Возвращает JSON-объект {data: token}<br/>
Кроме того, записывает token в cookie.jwt.

### GET /api/user/logout
Логаут пользователя.<br/>
Вернет ошибку если пользователь не авторизован.<br/>
Удаляет cookie.jwt и headers.authorization.<br/>
Редирект на '/'.

## Работа с блогом

### GET /api/blog/getMessages
Возвращает массив всех сообщений-постов.<br/>
Вернет ошибку если пользователь не авторизован.<br/>
Принимает page (по умолчанию =1) и pagesize (по умолчанию =30) в качестве query-параметров.<br/>
Пример: `/api/blog/getMessages?pagesize=4&page=2`

### POST /api/blog/createMessage
Создает новые сообщения-посты.<br/>
Вернет ошибку если пользователь не явялется админом.<br/>
Принимает content-type application/json и application/x-www-form-urlencoded.<br/>
В JSON должны находиться обзательное поле 'message'.<br/>
Возвращает созданную в БД запись. <br/>

### POST /api/blog/editMessage
Редактирует сообщения-посты.<br/>
Вернет ошибку если пользователь не явялется админом.<br/>
Принимает content-type application/json и application/x-www-form-urlencoded.<br/>
В JSON должны находиться обзательные поля ['message','_id'].<br/>
Возвращает результат редактирования БД. <br/>