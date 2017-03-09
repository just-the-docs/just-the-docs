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
* EXPORTS
*/
exports.map_palette     = map_palette;
exports.palette_map_key = palette_map_key;

/**
* IMPORTS
*/
var color_diff    = require('./diff');
var color_convert = require('./convert');

/**
 * API FUNCTIONS
 */

/**
* Returns the hash key used for a {rgbcolor} in a {palettemap}
* @param {rgbcolor} c should have fields R,G,B
* @return {string}
*/
function palette_map_key(c)
{
  return "R" + c.R + "B" + c.B + "G" + c.G;
}

/**
* Returns a mapping from each color in a to the closest color in b
* @param [{rgbcolor}] a each element should have fields R,G,B
* @param [{rgbcolor}] b each element should have fields R,G,B
* @param 'type' should be the string 'closest' or 'furthest'
* @return {palettemap}
*/
function map_palette(a, b, type)
{
  var c = {};
  type = type || 'closest';
  for (var idx1 = 0; idx1 < a.length; idx1 += 1){
    var color1 = a[idx1];
    var best_color      = undefined;
    var best_color_diff = undefined;
    for (var idx2 = 0; idx2 < b.length; idx2 += 1)
    {
      var color2 = b[idx2];
      var current_color_diff = diff(color1,color2);

      if((best_color == undefined) || ((type === 'closest') && (current_color_diff < best_color_diff)))
      {
        best_color      = color2;
        best_color_diff = current_color_diff;
        continue;
      }
      if((type === 'furthest') && (current_color_diff > best_color_diff))
      {
        best_color      = color2;
        best_color_diff = current_color_diff;
        continue;
      }
    }
    c[palette_map_key(color1)] = best_color;
  }
  return c;
}

/**
 * INTERNAL FUNCTIONS
 */

function diff(c1,c2)
{
  c1 = color_convert.rgb_to_lab(c1);
  c2 = color_convert.rgb_to_lab(c2);
  return color_diff.ciede2000(c1,c2);
}

// Local Variables:
// allout-layout: t
// js-indent-level: 2
// End:
