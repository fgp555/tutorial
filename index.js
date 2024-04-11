import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  console.log('request');
  res.json({ message: 'hello' });
});

app.listen(3000);
console.log('http://localhost:3000');