
# runp

Run some functions in parallel.


## Install

	npm install runp


## Usage

	runp = require("runp");		// load the module

	runp()						// create a runner object

	.add(function(cb) {			// add a simple function that does something
		// do something.
		cb();	// call this when it's done
	})

	.add(function(cb, str) {	// pass in an argument and also return an error
		// str == "foo"
		cb("error "+str);
	}, "foo")

	.add(function(cb, str1, str2) {		// pass in multiple args
		// str1 == "bar", str2 = "baz"
		cb(null, "okay "+str1+" "+str2);
	}, "bar", "baz")

	.add( [ 7, 11 ], function( cb, num, str ) {		// call the func once for each item in an array
		// this function called twice once with num = 7 and once with num = 11
		// both times str = "qux"
		cb(null, "okay "+num+" "+str);
	}, "qux")

	// All the calls are set up but nothing happens until
	// I call run() on the runner object, at which point all the functions
	// will be fired off in parallel.  When they're all completed (okay or fail)
	// the the call back calls you with an array of errors and results.

	.run(function(errors, results) {
		// all the functions have completed
		// errors = [null, "error foo", null, null, null ];
		// results = [null, null, "okay bar baz", "okay 7 qux", "okay 11 qux" ];
	})


