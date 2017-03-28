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
    for (var i = 0; i < result.rows.length; i++) {
      console.log(i + ' ' + result.rows[i].first_name + ' ' + result.rows[i].last_name + ' Born: ' + result.rows[i].birthdate)
    }
    client.end();
  });
});
