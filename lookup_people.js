const pg = require("pg");
const settings = require("./settings"); // settings.json
const input = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
    client.query("SELECT first_name, last_name, birthdate FROM famous_people WHERE last_name = '" + input + "'", null,(err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('Searching ...');
    console.log('Found ' + result.rows.length + ' person(s) by the last name ' + input)
    console.log(result.rows[0].first_name + ' ' + result.rows[0].last_name + ' Born: ' + result.rows[0].birthdate); //output: 1
    client.end();
  });
});
