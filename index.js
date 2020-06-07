import express from 'express'
import fs from 'fs'
import accRouter from './routes/account.js'
const app = express();

global.fileName = 'accounts.json'

const port = 3000;

app.use(express.json());
app.use('/account', accRouter);



app.listen(port, () => {

  try {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if(err) {
        const initialJson = {
          nextId: 1,
          accounts: []
        }
        fs.writeFile(fileName, JSON.stringify(initialJson), err => {
          console.log(err);
        });
      }
    });
  } catch (err) {
    console.log(err);
    
  }
  console.log('API Started!');
});

//AYiuPSS3x4Ky9jb