const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dbmysql = require('../database/mysql.js');
//ERROR POSSIBLE! Running mysql and pgsql at same time
const dbpgsql = require('../database/pgsql.js');
//const seed = require('../database/createDataFile.js')
//const pg = require('./pgRoutes.js'); //need npm install router


const app = express();

const PORT = process.env.PORT || 8083;
//const PORT = 8083;

app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//THIS IS WHERE MAIN API ROUTES START
//need to change handlers to make sure they're getting and sending correct data for new api abilities
//need to add and import functions for mongodb. 

// to receive houseId, send houseId to db, and respond with house address and associated listedAgent info and 3 premier agents
//app.get('/api/:houseId', (req,res) => {
app.get('/api', (req,res) => {
  let houseId = 1;
  if (req.params.houseId) {
    houseId = req.params.houseId;
    console.log('params', houseId)
  }
  if (req.body.houseId) {
    houseId = req.body.houseId;
    console.log('body', houseId)
  }
  console.log('getHouse hit in pgRoutes')
  dbpgsql.getAHomePgsql(houseId, (err,data) => {
    if(err) {
      console.log(err)
      res.status(401).send(err);
    } else {
      res.status(201).send(data);
    }
  });
})

//create a new message - need houseId, username, email, phone, message
//app.post('/api/:houseId', (req,res) => {
app.post('/api', (req,res) => {
  let houseId = 1;
  if (req.params.houseId) {
    houseId = req.params.houseId;
    console.log('post params', houseId)
  }
  if (req.body.houseId) {
    houseId = req.body.houseId;
    console.log('post body', houseId)
  }
  console.log('getHouse hit in pgRoutes')
  dbpgsql.newNote(houseId, req.body, (err,data) => {
    if(err) {
      console.log(err)
      res.status(401).send(err);
    } else {
      res.status(201).send('success!');
    }
  });
})

//app.patch('/api/:houseId', (req,res) => {
app.patch('/api', (req,res) => {
  let houseId = 1;
  if (req.params.houseId) {
    houseId = req.params.houseId;
    console.log('post params', houseId)
  }
  if (req.body.houseId) {
    houseId = req.body.houseId;
    console.log('post body', houseId)
  }
  console.log('getHouse hit in pgRoutes')
  dbpgsql.updateHome(houseId, req.body, (err,data) => {
    if(err) {
      console.log(err)
      res.status(401).send(err);
    } else {
      res.status(201).send('success!');
    }
  });
})

// app.delete('/api/:houseId', (req,res) => {
app.delete('/api', (req,res) => {
  let houseId = 1;
  if (req.params.houseId) {
    houseId = req.params.houseId;
    console.log('post params', houseId)
  }
  if (req.body.houseId) {
    houseId = req.body.houseId;
    console.log('post body', houseId)
  }
  console.log('getHouse hit in pgRoutes')
  dbpgsql.deleteHome(houseId, (err,data) => {
    if(err) {
      console.log('error catch worked!',err)
      res.status(401).send(err);
    } else {
      res.status(201).send('success!');
    }
  });
})


//this .get has to stay above the 
//curl -d '{"name":"Monroe Walsh"}' -H "Content-Type: application/json" -X GET http://localhost:8083/agent
app.get('/agent', (req,res) => {
  dbmysql.getAgent(req.body, (err,data) => {
    if(err) {
      console.log(err)
      res.status(401).send(err);
    } else {
      res.status(201).send(data);
    }
  });
})

// renders new html for unique house data
app.get('/:houseId', (req, res) => {
  // let houseId = req.params.houseId;

  res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
});

app.get('/houseId/listedAgent/:houseId', (req, res) => {
  let houseId = req.params.houseId;
  dbmysql.getListedAgent(houseId, (err, data) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/houseId/premierAgents', (req, res) => {
  dbmysql.getPremierAgents((err, data) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.status(200).send(data);
    }
  });
});

//crud

//create
//curl -d '{"houseId":"150", "name":"Chaaandy", "company":"Galvanize", "phone":"(484) 484-8844", "url":"www.rickroll.com"}' -H "Content-Type: application/json" -X POST http://localhost:8083/newAgent
//curl -d '{"name":"Monroe Walsh", "company":"Galvanize", "phone":"(484) 484-8844", "url":"www.rickroll.com"}' -H "Content-Type: application/json" -X POST http://localhost:8083/newAgent
app.post('/newAgent', (req,res) => {
  dbmysql.createAgent(req.body, (err) => {
    if(err) {
      console.log(err)
      res.status(409).send(err);
    } else {
      res.status(201).send('success');
    }
  });
})

//read - see above

//update
//**MAKE THE CURL COMMAND!!! 
//curl -d '{"houseId":"153", "name":"Raaandy", "company":"Hack Reactor", "phone":"(555) 484-8844", "url":"www.rickroll.com"}' -H "Content-Type: application/json" -X PATCH http://localhost:8083/updateAgent


app.patch('/updateAgent', (req,res) => {  
  dbmysql.updateAgent(req.body, (err) => {
    if(err) {
      res.status(404).send(err);
    } else {
      res.status(201).send('success');
    }
  });
})

//delete
//curl -d '{"houseId":"149"}' -H "Content-Type: application/json" -X DELETE http://localhost:8083/deleteAgent


app.delete('/deleteAgent', (req,res) => {
  dbmysql.deleteAgent(req.body, (err) => {
    if(err) {
      res.status(404).send(err);
    } else {
      res.status(201).send('success');
    }
  });
})

app.listen(PORT, () => {
  console.log(`Hidey-Ho Cap'n, we are now serving on port ${PORT}!`);
});