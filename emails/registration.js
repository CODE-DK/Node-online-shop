const env = require("../env");

module.exports = function (email) {
  return {
    from: env.EMAIL_ADDRESS,
    to: email,
    subject: "Аккаунт создан",
    html: `
        <h1>Добро пожаловать в наш магазин</h1>
        <p>Вы успешно создали аккаунт с email - ${email}</p>
        <hr/>
        <a href="${env.SERVER_BASEURL}">Магазин курсов</a>
    `,
  };
};
