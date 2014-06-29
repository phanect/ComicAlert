#!/usr/bin/env node

"use strict";

var geddy = require("geddy");
 
geddy.start({
	port: process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || "3000",
	hostname: process.env.OPENSHIFT_NODEJS_IP || "localhost",
	environment: "development"
});
