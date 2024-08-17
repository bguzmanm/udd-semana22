const express = require("express");
const app = express();

require("dotenv").config();

const { MongoClient, ObjectId } = require("mongodb");

app.use(express.json());

/* 
C -> Create -> Crear
R -> Read -> Leer
U -> Update -> Actualizar
D -> Delete -> Borrar
*/

const getUsers = async () => {
  let users;
  const dbClient = new MongoClient(process.env.URL_DB);
  try {
    const database = dbClient.db('test');
    const coll = database.collection('users');
    const cursor = coll.find({});
    users = await cursor.toArray();
    console.log(users);
  } catch (error) {
    console.error(error);
  } finally {
    await dbClient.close();
  }
  return users;
}

const getUserById = async (id)=>{
  let user;
  const filter = { '_id': new ObjectId(id) };
  const dbClient = new MongoClient(process.env.URL_DB);
  try {
    const coll = dbClient.db('test').collection('users');
    const cursor = coll.find(filter);
    user = await cursor.toArray();
  } catch (error) {
    console.error(error);
  } finally {
    await dbClient.close();
  }
  return user;
}

const addUser = async (user) => {
  const dbClient = new MongoClient(process.env.URL_DB);
  try {
    await dbClient.db('test').collection('users').insertOne(user);
  } catch (error) {
    console.error(error);
    
  } finally {
    await dbClient.close();
  }
}

const saveUser = async (id, user) => {
  const filter = { _id: new ObjectId(id) };
  const update = { $set: user };
  const dbClient = new MongoClient(process.env.URL_DB);
  try {
    dbClient.db('test').collection('users').updateOne(filter, update, (error, result) => {
      user = result;
    });
  } catch (error) {
    console.error(error);
  } finally {
    await dbClient.close();
  }
}

const delUser = async(id) => {
  const filter = { _id: new ObjectId(id) };
  const dbClient = new MongoClient(process.env.URL_DB);
  try {
    await dbClient.db('test').collection('users').deleteOne(filter);
  } catch (error) {
    console.error(error);
  } finally {
    dbClient.close();
  }
}


// getUsers();
// getUserById('63b8f4e7e1e7f35d506ed19d');

// addUser({
//   "name": "Pepito",
//   "username": "pepito.gutierrez@bootcampudd.cl",
//   "password": "ca3f9db35582654f21a2b78c5b57b7e478cbcb75ff855639a6c5046a7aece18f74dd393ebd1570159f6c71a5fd30474434473488624308f03142c0dbea8d19c3",
//   "active": true,
// })

// saveUser('66c0ac358290f47151647cf4', {
//   "name": "Margarito",
//   "username": "margarito.gutierrez@bootcampudd.cl",
//   "password": "ca3f9db35582654f21a2b78c5b57b7e478cbcb75ff855639a6c5046a7aece18f74dd393ebd1570159f6c71a5fd30474434473488624308f03142c0dbea8d19c3",
//   "active": true,
// })


app.get('/users', (req, res) => {
  getUsers().then((data) => {
    res.json(data);
  })
});

app.get('/users/:id', (req, res) => {
  getUserById(req.params.id).then((data) => {
    res.json(data);
  })
});

app.post('/users', (req, res) => {
  addUser(req.body)
    .then(() => {
      console.log('document is created');
      res.json({ ok: 'ok' });
    });    
});

app.put('/users/:id', (req, res) => {
  saveUser(req.params.id, req.body)
    .then(() => {
      console.log('document is updated');
      res.json({ ok: 'ok' });
    });  
});

app.delete('/users/:id', (req, res) => {
  delUser(req.params.id)
    .then(() => {
      console.log('docuement is deleted')
      res.json({ ok: 'ok' });
    });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`listen in port ${process.env.PORT}`);
})