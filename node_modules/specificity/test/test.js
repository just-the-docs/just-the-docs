var specificity = require('../'),
	assert = require('assert'),
	tests,
	testSelector,
	comparisonTests,
	testCompare;

tests = [
	// http://css-tricks.com/specifics-on-css-specificity/
	{ selector: 'ul#nav li.active a', expected: '0,1,1,3' },
	{ selector: 'body.ie7 .col_3 h2 ~ h2', expected: '0,0,2,3' },
	{ selector: '#footer *:not(nav) li', expected: '0,1,0,2' },
	{ selector: 'ul > li ul li ol li:first-letter', expected: '0,0,0,7' },

	// http://reference.sitepoint.com/css/specificity
	{ selector: 'body#home div#warning p.message', expected: '0,2,1,3' },
	{ selector: '* body#home>div#warning p.message', expected: '0,2,1,3' },
	{ selector: '#home #warning p.message', expected: '0,2,1,1' },
	{ selector: '#warning p.message', expected: '0,1,1,1' },
	{ selector: '#warning p', expected: '0,1,0,1' },
	{ selector: 'p.message', expected: '0,0,1,1' },
	{ selector: 'p', expected: '0,0,0,1' },

	// Test pseudo-element with uppercase letters
	{ selector: 'li:bEfoRE', expected: '0,0,0,2' },

	// Pseudo-class tests
	{ selector: 'li:first-child+p', expected: '0,0,1,2'},
	{ selector: 'li:nth-child(even)+p', expected: '0,0,1,2'},
	{ selector: 'li:nth-child(2n+1)+p', expected: '0,0,1,2'},
	{ selector: 'li:nth-child( 2n + 1 )+p', expected: '0,0,1,2'},
	{ selector: 'li:nth-child(2n-1)+p', expected: '0,0,1,2'},
	{ selector: 'li:nth-child(2n-1) p', expected: '0,0,1,2'},
	{ selector: ':lang(nl-be)', expected: '0,0,1,0'},

	// Tests with CSS escape sequences
	// https://mathiasbynens.be/notes/css-escapes and https://mathiasbynens.be/demo/crazy-class
	{ selector: '.\\3A -\\)', expected: '0,0,1,0' },             /* <p class=":-)"></p> */
	{ selector: '.\\3A \\`\\(', expected: '0,0,1,0' },           /* <p class=":`("></p> */
	{ selector: '.\\3A .\\`\\(', expected: '0,0,2,0' },          /* <p class=": `("></p> */
	{ selector: '.\\31 a2b3c', expected: '0,0,1,0' },            /* <p class="1a2b3c"></p> */
	{ selector: '.\\000031a2b3c', expected: '0,0,1,0' },         /* <p class="1a2b3c"></p> */
	{ selector: '.\\000031 a2b3c', expected: '0,0,1,0' },        /* <p class="1a2b3c"></p> */
	{ selector: '#\\#fake-id', expected: '0,1,0,0' },            /* <p id="#fake-id"></p> */
	{ selector: '.\\#fake-id', expected: '0,0,1,0' },            /* <p class="#fake-id"></p> */
	{ selector: '#\\<p\\>', expected: '0,1,0,0' },               /* <p id="<p>"></p> */
	{ selector: '.\\#\\.\\#\\.\\#', expected: '0,0,1,0' },       /* <p class="#.#.#"></p> */
	{ selector: '.foo\\.bar', expected: '0,0,1,0' },             /* <p class="foo.bar"></p> */
	{ selector: '.\\:hover\\:active', expected: '0,0,1,0' },     /* <p class=":hover:active"></p> */
	{ selector: '.\\3A hover\\3A active', expected: '0,0,1,0' }, /* <p class=":hover:active"></p> */
	{ selector: '.\\000031  p', expected: '0,0,1,1' },           /* <p class="1"><p></p></p>" */
	{ selector: '.\\3A \\`\\( .another', expected: '0,0,2,0' },  /* <p class=":`("><p class="another"></p></p> */
	{ selector: '.\\--cool', expected: '0,0,1,0' },              /* <p class="--cool"></p> */
	{ selector: '#home .\\[page\\]', expected: '0,1,1,0' },      /* <p id="home"><p class="[page]"></p></p> */
];

testSelector = function(test) {
	describe('#calculate("    ' + test.selector + '    ")', function() {
		it ('should return a specificity of "' + test.expected + '"', function() {
			var result = specificity.calculate(test.selector);
			assert.equal(result[0].specificity, test.expected);
		});
	});
};

comparisonTests = [
	{ a: 'div', b: 'span', expected: 0 },
	{ a: '.active', b: ':focus', expected: 0 },
	{ a: '#header', b: '#main', expected: 0 },
	{ a: 'div', b: '.active', expected: -1 },
	{ a: 'div', b: '#header', expected: -1 },
	{ a: '.active', b: '#header', expected: -1 },
	{ a: '.active', b: 'div', expected: 1 },
	{ a: '#main', b: 'div', expected: 1 },
	{ a: '#main', b: ':focus', expected: 1 },
	{ a: 'div p', b: 'span a', expected: 0 },
	{ a: '#main p .active', b: '#main span :focus', expected: 0 },
	{ a: [0, 1, 1, 1], b: '#main span :focus', expected: 0 },
	{ a: '#main p .active', b: [0, 1, 1, 1], expected: 0 },
	{ a: ':focus', b: 'span a', expected: 1 },
	{ a: '#main', b: 'span a:hover', expected: 1 },
	{ a: 'ul > li > a > span:before', b: '.active', expected: -1 },
	{ a: 'a.active:hover', b: '#main', expected: -1 }
];

testCompare = function(test) {
	it('compare("' + test.a + '", "' + test.b + '") should return ' + test.expected, function() {
		var result = specificity.compare(test.a, test.b);
		assert.equal(result, test.expected);
	});
};

describe('specificity', function() {
	describe('calculate', function() {
		var i, len, test;

		for (i = 0, len = tests.length; i < len; i += 1) {
			test = tests[i];
			testSelector(test);
		}
	});

	describe('compare', function() {
		var i, len, test;

		for (i = 0, len = comparisonTests.length; i < len; i += 1) {
			test = comparisonTests[i];
			testCompare(test);
		}
	});

	describe('sorting with compare', function() {
		var a = 'div',
			b = 'p a',
			c = '.active',
			d = 'p.active',
			e = '.active:focus',
			f = '#main',
			original = [c, f, a, e, b, d],
			sorted = [a, b, c, d, e, f];

		it('array.sort(specificity.compare) should sort the array by specificity', function() {
			var result = original.sort(specificity.compare);

			assert.equal(result.join('|'), sorted.join('|'));
		});
	});
});
