const { Router } = require('express');

const router = Router();

let messages = [];
let newMessageTime = null;
let lastMessageTime = null;

let connections = [];
const LIMIT = 20;
const DELAY = 1000;
let tick = 0;

router.post('/', (req, res) => {
  const date = new Date();
  // const hours = date.getHours();
  // const minutes = date.getMinutes();
  // const formatedTime = `${formatTime(hours)}:${formatTime(minutes)}`;

  const message = {
    ...req.body,
    time: date.getTime(),
  };

  messages.push(message);

  console.log(message);
  newMessageTime = new Date();

  res.sendStatus(201);
});

router.get('/', (_, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Transfer-Encoding', 'chunked');

  connections.push(res);
  console.log(connections.length);
});

function run() {
  setTimeout(() => {
    tick++;
    if (newMessageTime != lastMessageTime) {
      lastMessageTime = newMessageTime;

      connections.forEach((res) => {
        res.write(JSON.stringify(messages));
        res.end();
      });
      messages = [];
      connections = [];
      tick = 0;

      return run();
    }

    if (tick > LIMIT) {
      connections.forEach((res) => {
        res.status(408);
        res.end();
      });
      connections = [];
      tick = 0;
    }

    run();
  }, DELAY);
}

run();

module.exports = router;
