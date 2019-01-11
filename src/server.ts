import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as socketio from 'socket.io';

const app = express();
app.set('port', process.env.PORT || 3000);

const httpApp = new http.Server(app);
const io = socketio(httpApp);

app.get('/', (req: any, res: any) => {
  res.sendFile(path.resolve('./client/index.html'));
});

io.on('connection', (socket: any) => {
  socket.on('message', (message: any) => {
    io.emit('message', message);
  });
});

const server = httpApp.listen(3000, () => {
  console.log('listening on *:3000');
});
