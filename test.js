var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("798677", salt);
console.log(hash)
//$2a$10$uOjU99Z3OEOMtkOJ.w6uQufv/gK9.859iDrExBo8YplglUthEGnHO