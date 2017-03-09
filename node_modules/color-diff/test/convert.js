/**
 * @author Markus Ekholm
 * @copyright 2012-2015 (c) Markus Ekholm <markus at botten dot org >
 * @license Copyright (c) 2012-2015, Markus Ekholm
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *    * Redistributions of source code must retain the above copyright
 *      notice, this list of conditions and the following disclaimer.
 *    * Redistributions in binary form must reproduce the above copyright
 *      notice, this list of conditions and the following disclaimer in the
 *      documentation and/or other materials provided with the distribution.
 *    * Neither the name of the <organization> nor the
 *      names of its contributors may be used to endorse or promote products
 *      derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL MARKUS EKHOLM BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * IMPORTS
 */
var assert        = require('assert');
var color_convert = require('../lib/convert');

/**
 * TESTS
 */

describe('convert', function(){
  describe('#rgb_to_lab()', function(){
    it('should convert to expected lab color #1', function(){
      assert.deepEqual({'L' : 40.473, 'a' : -6.106, 'b' : -21.417},
                       round_all(color_convert.rgb_to_lab({'R' : 55,
                                                           'G' : 100,
                                                           'B' : 130})));
    });
    it('should convert to expected lab color #2', function(){
      assert.deepEqual({'L' : 0, 'a' : 0, 'b' : 0},
                       round_all(color_convert.rgb_to_lab({'R' : 0,
                                                           'G' : 0,
                                                           'B' : 0})));
    });
    it('should convert to expected lab color #3', function(){
      assert.deepEqual({'L' : 100, 'a' : 0.005, 'b' : -0.010},
                       round_all(color_convert.rgb_to_lab({'R' : 255,
                                                           'G' : 255,
                                                           'B' : 255})));
    });
  })
});

/**
 * INTERNAL FUNCTIONS
 */
function round_all(c){ return {'L' : round(c.L),
                               'a' : round(c.a),
                               'b' : round(c.b)};
                     }
function round(n){ return Math.round(n*1000)/1000; }

// Local Variables:
// allout-layout: t
// js-indent-level: 2
// End:
