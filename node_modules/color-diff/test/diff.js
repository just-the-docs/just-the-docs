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
var assert = require('assert');
var color_diff = require('../lib/diff');

/**
 * TESTS
 */

/**
 * CIEDE2000 tests the diff.cie2000.
 * Cases taken from the paper "The CIEDE2000 Color-Difference Formula:
 * Implementation Notes, Supplementary Test Data, and Mathematical Observations"
 * by Gaurav Sharma, Wencheng Wu and Edul N. Dalal.
 */
describe('diff', function(){
  describe('#ciede2000()', function(){
    it("should use the true chroma difference (#1)", function(){
      assert_ciede2000_diff(2.0425,
                            {"L" : 50.0000,
                             "a" : 2.6772,
                             "b" : -79.7751
                            },
                            {"L" : 50.0000,
                             "a" : 0.0000,
                             "b" : -82.7485
                            });
    });
    it("should use the true chroma difference (#2)", function(){
      assert_ciede2000_diff(2.8615,
                            {"L" : 50.0000,
                             "a" : 3.1571,
                             "b" : -77.2803
                            },
                            {"L" : 50.0000,
                             "a" : 0.0000,
                             "b" : -82.7485
                            });
    });
    it("should use the true chroma difference (#3)", function(){
      assert_ciede2000_diff(3.4412,
                            {"L" : 50.0000,
                             "a" : 2.8361,
                             "b" : -74.0200
                            },
                            {"L" : 50.0000,
                             "a" : 0.0000,
                             "b" : -82.7485
                            });
    });
    it("should use the true hue difference (#4)", function(){
      assert_ciede2000_diff(1.0000,
                            {"L" : 50.0000,
                             "a" : -1.3802,
                             "b" : -84.2814
                            },
                            {"L" : 50.0000,
                             "a" : 0.0000,
                             "b" : -82.7485
                            });
    });
    it("should use the true hue difference (#5)", function(){
      assert_ciede2000_diff(1.0000,
                            {"L" : 50.0000,
                             "a" : -1.1848,
                             "b" : -84.8006
                            },
                            {"L" : 50.0000,
                             "a" : 0.0000,
                             "b" : -82.7485
                            });
    });
    it("should use the true hue difference (#6)", function(){
      assert_ciede2000_diff(1.0000,
                            {"L" : 50.0000,
                             "a" : -0.9009,
                             "b" : -85.5211
                            },
                            {"L" : 50.0000,
                             "a" : 0.0000,
                             "b" : -82.7485
                            });
    });
    it("should use the correct arctangent computation (#7)", function(){
      assert_ciede2000_diff(2.3669,
                            {"L" : 50.0000,
                             "a" : 0.0000,
                             "b" : 0.0000
                            },
                            {"L" : 50.0000,
                             "a" : -1.0000,
                             "b" : 2.0000
                            });
    });
    it("should use the correct arctangent computation (#8)", function(){
      assert_ciede2000_diff(2.3669,
                            {"L" : 50.0000,
                             "a" : -1.0000,
                             "b" : 2.0000
                            },
                            {"L" : 50.0000,
                             "a" : 0.0000,
                             "b" : 0.0000
                            });
    });
    it("should use the correct arctangent computation (#9)", function(){
      assert_ciede2000_diff(7.1792,
                            {"L" : 50.0000,
                             "a" : 2.4900,
                             "b" : -0.0010
                            },
                            {"L" : 50.0000,
                             "a" : -2.4900,
                             "b" : 0.0009
                            });
    });
    it("should use the correct arctangent computation (#10)", function(){
      assert_ciede2000_diff(7.1792,
                            {"L" : 50.0000,
                             "a" : 2.4900,
                             "b" : -0.0010
                            },
                            {"L" : 50.0000,
                             "a" : -2.4900,
                             "b" : 0.0010
                            });
    });
    it("should use the correct arctangent computation (#11)", function(){
      assert_ciede2000_diff(7.2195,
                            {"L" : 50.0000,
                             "a" : 2.4900,
                             "b" : -0.0010
                            },
                            {"L" : 50.0000,
                             "a" : -2.4900,
                             "b" : 0.0011
                            });
    });
    it("should use the correct arctangent computation (#12)", function(){
      assert_ciede2000_diff(7.2195,
                            {"L" : 50.0000,
                             "a" : 2.4900,
                             "b" : -0.0010
                            },
                            {"L" : 50.0000,
                             "a" : -2.4900,
                             "b" : 0.0012
                            });
    });
    it("should use the correct arctangent computation (#13)", function(){
      assert_ciede2000_diff(4.8045,
                            {"L" : 50.0000,
                             "a" : -0.0010,
                             "b" : 2.4900
                            },
                            {"L" : 50.0000,
                             "a" : 0.0009,
                             "b" : -2.4900
                            });
    });
    it("should use the correct arctangent computation (#14)", function(){
      assert_ciede2000_diff(4.8045,
                            {"L" : 50.0000,
                             "a" : -0.0010,
                             "b" : 2.4900
                            },
                            {"L" : 50.0000,
                             "a" : 0.0010,
                             "b" : -2.4900
                            });
    });
    it("should use the correct arctangent computation (#15)", function(){
      assert_ciede2000_diff(4.7461,
                            {"L" : 50.0000,
                             "a" : -0.0010,
                             "b" : 2.4900
                            },
                            {"L" : 50.0000,
                             "a" : 0.0011,
                             "b" : -2.4900
                            });
    });
    it("should use the correct arctangent computation (#16)", function(){
      assert_ciede2000_diff(4.3065,
                            {"L" : 50.0000,
                             "a" : 2.5000,
                             "b" : 0.0000
                            },
                            {"L" : 50.0000,
                             "a" : 0.0000,
                             "b" : -2.5000
                            });
    });
    it("should work for large color differences (#17)", function(){
      assert_ciede2000_diff(27.1492,
                            {"L" : 50.0000,
                             "a" : 2.5000,
                             "b" : 0.0000
                            },
                            {"L" : 73.0000,
                             "a" : 25.0000,
                             "b" : -18.0000
                            });
    });
    it("should work for large color differences (#18)", function(){
      assert_ciede2000_diff(22.8977,
                            {"L" : 50.0000,
                             "a" : 2.5000,
                             "b" : 0.0000
                            },
                            {"L" : 61.0000,
                             "a" : -5.0000,
                             "b" : 29.0000
                            });
    });
    it("should work for large color differences (#19)", function(){
      assert_ciede2000_diff(31.9030,
                            {"L" : 50.0000,
                             "a" : 2.5000,
                             "b" : 0.0000
                            },
                            {"L" : 56.0000,
                             "a" : -27.0000,
                             "b" : -3.0000
                            });
    });
    it("should work for large color differences (#20)", function(){
      assert_ciede2000_diff(19.4535,
                            {"L" : 50.0000,
                             "a" : 2.5000,
                             "b" : 0.0000
                            },
                            {"L" : 58.0000,
                             "a" : 24.0000,
                             "b" : 15.0000
                            });
    });
    it("should produce numbers found in the CIE technical report (#21)", function(){
      assert_ciede2000_diff(1.0000,
                            {"L" : 50.0000,
                             "a" : 2.5000,
                             "b" : 0.0000
                            },
                            {"L" : 50.0000,
                             "a" : 3.1736,
                             "b" : 0.5854
                            });
    });
    it("should produce numbers found in the CIE technical report (#22)", function(){
      assert_ciede2000_diff(1.0000,
                            {"L" : 50.0000,
                             "a" : 2.5000,
                             "b" : 0.0000
                            },
                            {"L" : 50.0000,
                             "a" : 3.2972,
                             "b" : 0.0000
                            });
    });
    it("should produce numbers found in the CIE technical report (#23)", function(){
      assert_ciede2000_diff(1.0000,
                            {"L" : 50.0000,
                             "a" : 2.5000,
                             "b" : 0.0000
                            },
                            {"L" : 50.0000,
                             "a" : 1.8634,
                             "b" : 0.5757
                            });
    });
    it("should produce numbers found in the CIE technical report (#24)", function(){
      assert_ciede2000_diff(1.0000,
                            {"L" : 50.0000,
                             "a" : 2.5000,
                             "b" : 0.0000
                            },
                            {"L" : 50.0000,
                             "a" : 3.2592,
                             "b" : 0.3350
                            });
    });
    it("should produce numbers found in the CIE technical report (#25)", function(){
      assert_ciede2000_diff(1.2644,
                            {"L" : 60.2574,
                             "a" : -34.0099,
                             "b" : 36.2677
                            },
                            {"L" : 60.4626,
                             "a" : -34.1751,
                             "b" : 39.4387
                            });
    });
    it("should produce numbers found in the CIE technical report (#26)", function(){
      assert_ciede2000_diff(1.2630,
                            {"L" : 63.0109,
                             "a" : -31.0961,
                             "b" : -5.8663
                            },
                            {"L" : 62.8187,
                             "a" : -29.7946,
                             "b" : -4.0864
                            });
    });
    it("should produce numbers found in the CIE technical report (#27)", function(){
      assert_ciede2000_diff(1.8731,
                            {"L" : 61.2901,
                             "a" : 3.7196,
                             "b" : -5.3901
                            },
                            {"L" : 61.4292,
                             "a" : 2.2480,
                             "b" : -4.9620
                            });
    });
    it("should produce numbers found in the CIE technical report (#28)", function(){
      assert_ciede2000_diff(1.8645,
                            {"L" : 35.0831,
                             "a" : -44.1164,
                             "b" : 3.7933
                            },
                            {"L" : 35.0232,
                             "a" : -40.0716,
                             "b" : 1.5901
                            });
    });
    it("should produce numbers found in the CIE technical report (#29)", function(){
      assert_ciede2000_diff(2.0373,
                            {"L" : 22.7233,
                             "a" : 20.0904,
                             "b" : -46.6940
                            },
                            {"L" : 23.0331,
                             "a" : 14.9730,
                             "b" : -42.5619
                            });
    });
    it("should produce numbers found in the CIE technical report (#30)", function(){
      assert_ciede2000_diff(1.4146,
                            {"L" : 36.4612,
                             "a" : 47.8580,
                             "b" : 18.3852
                            },
                            {"L" : 36.2715,
                             "a" : 50.5065,
                             "b" : 21.2231
                            });
    });
    it("should produce numbers found in the CIE technical report (#31)", function(){
      assert_ciede2000_diff(1.4441,
                            {"L" : 90.8027,
                             "a" : -2.0831,
                             "b" : 1.4410
                            },
                            {"L" : 91.1528,
                             "a" : -1.6435,
                             "b" : 0.0447
                            });
    });
    it("should produce numbers found in the CIE technical report (#32)", function(){
      assert_ciede2000_diff(1.5381,
                            {"L" : 90.9257,
                             "a" : -0.5406,
                             "b" : -0.9208
                            },
                            {"L" : 88.6381,
                             "a" : -0.8985,
                             "b" : -0.7239
                            });
    });
    it("should produce numbers found in the CIE technical report (#33)", function(){
      assert_ciede2000_diff(0.6377,
                            {"L" : 6.7747,
                             "a" : -0.2908,
                             "b" : -2.4247
                            },
                            {"L" : 5.8714,
                             "a" : -0.0985,
                             "b" : -2.2286
                            });
    });
    it("should produce numbers found in the CIE technical report (#34)", function(){
      assert_ciede2000_diff(0.9082,
                            {"L" : 2.0776,
                             "a" : 0.0795,
                             "b" : -1.1350
                            },
                            {"L" : 0.9033,
                             "a" : -0.0636,
                             "b" : -0.5514
                            });
    });
    it("should throw error", function(){
      assert.throws(
        function(){ color_diff.ciede2000({"L" : NaN,
                                          "a" : NaN,
                                          "b" : NaN},
                                         {"L" : 0,
                                          "a" : 0,
                                          "b" : 0
                                         })
                  },
        Error)
    });
  })
});

/**
 * INTERNAL FUNCTIONS
 */

function assert_ciede2000_diff(expected, c1, c2){
  assert.equal(expected, round(color_diff.ciede2000(c1, c2)));
  assert.equal(expected, round(color_diff.ciede2000(c2, c1)));
}

function round(n){ return Math.round(n*10000)/10000; }

// Local Variables:
// allout-layout: t
// js-indent-level: 2
// End:
