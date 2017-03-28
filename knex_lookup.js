const pg = require("pg");
const settings = require("./settings"); // settings.json
const input = process.argv[2];

const knex = require('knex')({
  client: 'pg',
  connection: {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
  }
});

//Promise
knex.select('first_name', 'last_name', 'birthdate')
.from('famous_people')
.where('last_name', '=', input)
.then(function(result) {
  console.log('Searching ...');
  console.log('Found ' + result.length + ' person(s) by the last name ' + input)
  for (var i = 0; i < result.length; i++) {
    console.log(result[i].first_name + ' ' + result[i].last_name + ' Born: ' + result[i].birthdate)
  }
});
knex.destroy();