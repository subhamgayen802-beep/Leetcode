const mongoose = require('mongoose');

async function main() {
<<<<<<< HEAD
    await mongoose.connect(process.env.DB_CONNECT_STRING)
=======
  await mongoose.connect(process.env.DB_CONNECT_STRING);
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
}

module.exports = main;


