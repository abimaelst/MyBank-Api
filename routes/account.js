import express from 'express'
import fs from 'fs'


const router = express.Router();

router.post('/', (req, res) => {
  let account = req.body;

  fs.readFile(fileName, 'utf8', (err, data) => {
    console.log(err)
    if(!err) {
    try {
      
      let json = JSON.parse(data)
      account = { id: json.nextId++, ...account };
      json.accounts.push(account);

      fs.writeFile(fileName, JSON.stringify(json), err => {
        if(err) {
          console.log(err);
        }else {
          res.end();
        }
      })
      res.send('post account');

    } catch (err) {
      res.status(400).send({ erro: err.message});
      
    
    }
  }else{
    res.status(400).send({ erro: err.message});
 
  }
  });
  //console.log('post account');
 // fs.appendFile('account.json', JSON.stringify(params), err => {
   // console.log(err)
 // }); 

  
})

router.get('/', (_, res) => {
  fs.readFile(fileName, 'utf-8', (err, data) => {
    if(err) {
      res.status(400).send({error: err.message})
    }else {
      let account = JSON.parse(data)
      delete account.nextId
      res.send(account);
    }
  })
})

router.get('/:id', (req, res) => {
  
  fs.readFile(fileName, 'utf-8', (err, data) => {
    
    try {
    
    if(!err) {
        let json = JSON.parse(data)
        const accountUser = json.accounts.find(user => 
          user.id === parseInt(req.params.id, 10))
        if (accountUser) {  
          res.send(accountUser)
        }else{
          res.end();
        }  
      } else {
        res.status(400).send({error: err.message})
      }
  } catch (err){
    res.status(400).send({error: err.message})
  }  
  })
});

router.delete('/:id', (req, res) => {

  fs.readFile(fileName, 'utf-8', (err, data) => {
    
    try {

      let json = JSON.parse(data)
      let accounts = json.accounts.filter(user => user.id !== parseInt(req.params.id, 10))
      json.accounts = accounts
    
      fs.writeFile(fileName, JSON.stringify(json), err => {
        if (err) { 
          res.status(400).send({error: err.message})
        } else {
          res.end();
        }
      })
    } catch (err){
    res.status(400).send({error: err.message})
  }  
  })
});

router.put('/', (req, res) => {
  
  let newAccount = req.body;
  
  fs.readFile(global.fileName, 'utf8', (err, data) => {
    try {
      if(err) throw err;

      let json = JSON.parse(data)
      let oldIndex = json.accounts.findIndex(account => account.id === newAccount.id)
      json.accounts[oldIndex].name = newAccount.name
      json.accounts[oldIndex].balance = newAccount.balance

      fs.writeFile(fileName, JSON.stringify(json), err => {
        if (err) { 
          res.status(400).send({error: err.message})
        } else {
          res.end();
        }
      });
    } catch (err) {
      res.status(400).send({error: err.message})
    }
  });

})

router.post('/transaction', (req, res) => {
  
  let transaction = req.body;
  
  fs.readFile(fileName, 'utf8', (err, data) => {
    try {
      if(err) throw err;

      let json = JSON.parse(data)
      let index = json.accounts.findIndex(account => account.id === transation.id)
      let saldo = json.accounts[index].balance 
      let movimentation = transaction.value

      if(saldo >= movimentation) {
        saldo += movimentation

        fs.writeFile(fileName, JSON.stringify(json), err => {
          if (err) { 
            res.status(400).send({error: err.message})
          } else {
            res.end();
          }
        });
        res.send(`${json.accounts.nome} seu saldo agora é ${json.accounts.balance}`)
      }else{
        res.send(`${json.accounts.nome} saldo insuficiênte, saldo atual é ${json.accounts.balance}`)

      }
      
    } catch (err) {
      res.status(400).send({error: err.message})
    }
  });
  
})

export default router;