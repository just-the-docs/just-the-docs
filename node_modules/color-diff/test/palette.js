/**
 * @author Markus Ekholm
 * @copyright 2012-2015 (c) Markus Ekholm <markus at botten dot org >
 * @license Copyright (c) 2012, Markus Ekholm
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
var color_palette = require('../lib/palette');

/**
 * CONSTANTS
 */

var white   = {'R':255 , 'G':255 ,'B':255};
var black   = {'R':0   , 'G':0   ,'B':0};
var navy    = {'R':0   , 'G':0   ,'B':128};
var blue    = {'R':0   , 'G':0   ,'B':255};
var yellow  = {'R':255 , 'G':255 ,'B':0};
var gold    = {'R':255 , 'G':215 ,'B':0};
var colors1 = [white, black, navy, blue, yellow, gold]
var colors2 = [white, black, blue, gold]
var colors3 = [white, black, yellow, blue]

/**
 * TESTS
 */

describe('palette', function(){
  describe('#map_palette()', function (){
    it('should map all colors to themselves when possible',
       function(){
         var expected1                                    = {};
         expected1[color_palette.palette_map_key(white)]  = white;
         expected1[color_palette.palette_map_key(black)]  = black;
         expected1[color_palette.palette_map_key(navy)]   = navy;
         expected1[color_palette.palette_map_key(blue)]   = blue;
         expected1[color_palette.palette_map_key(yellow)] = yellow;
         expected1[color_palette.palette_map_key(gold)]   = gold;
         assert.deepEqual(expected1, color_palette.map_palette(colors1, colors1));
       });
    it('should map navy->blue and yellow->gold when navy and yellow are missing',
       function(){
         var expected2                                    = {};
         expected2[color_palette.palette_map_key(white)]  = white;
         expected2[color_palette.palette_map_key(black)]  = black;
         expected2[color_palette.palette_map_key(navy)]   = blue;
         expected2[color_palette.palette_map_key(blue)]   = blue;
         expected2[color_palette.palette_map_key(yellow)] = gold;
         expected2[color_palette.palette_map_key(gold)]   = gold;
         assert.deepEqual(expected2, color_palette.map_palette(colors1, colors2));
       });
    it('should map white->black & black,navy,blue->yellow & yellow,gold->blue',
       function(){
         var expected3                                    = {};
         expected3[color_palette.palette_map_key(white)]  = black;
         expected3[color_palette.palette_map_key(black)]  = yellow;
         expected3[color_palette.palette_map_key(navy)]   = yellow;
         expected3[color_palette.palette_map_key(blue)]   = yellow;
         expected3[color_palette.palette_map_key(yellow)] = blue;
         expected3[color_palette.palette_map_key(gold)]   = blue;
         assert.deepEqual(expected3, color_palette.map_palette(colors1, colors3, 'furthest'));
       });

  })
});

// Local Variables:
// allout-layout: t
// js-indent-level: 2
// End:
