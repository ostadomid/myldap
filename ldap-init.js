
var ActiveDirectory = require('activedirectory');
var config = require('./ldap-config');
module.exports= new ActiveDirectory(config);