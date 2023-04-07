import express from 'express';
import * as dotenv from 'dotenv' 
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../../.env') });





const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
