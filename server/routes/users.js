var express = require('express');
var router = express.Router();

var faker = require('faker');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/user", function (req, res) {
  var data = ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email()
  });
  res.status(200).send(data);
});


module.exports = router;
