const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
  console.log('مستخدم جديد اتصل');

  socket.on('chat message', (data) => {
    // مثال: منع بعض الكلمات
    const bannedWords = ["سيئة", "كلمةمحظورة"];
    for(const word of bannedWords){
      if(data.msg.includes(word)) return;
    }

    io.emit('chat message', data); // إرسال الرسالة للجميع
  });

  socket.on('disconnect', () => {
    console.log('مستخدم غادر');
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log('Server running on port ' + PORT));