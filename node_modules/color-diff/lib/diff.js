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
exports.ciede2000 = ciede2000;

/**
* IMPORTS
*/
var sqrt = Math.sqrt;
var pow = Math.pow;
var cos = Math.cos;
var atan2 = Math.atan2;
var sin = Math.sin;
var abs = Math.abs;
var exp = Math.exp;
var PI = Math.PI;

/**
 * API FUNCTIONS
 */

/**
* Returns diff between c1 and c2 using the CIEDE2000 algorithm
* @param {labcolor} c1    Should have fields L,a,b
* @param {labcolor} c2    Should have fields L,a,b
* @return {float}   Difference between c1 and c2
*/
function ciede2000(c1,c2)
{
  /**
   * Implemented as in "The CIEDE2000 Color-Difference Formula:
   * Implementation Notes, Supplementary Test Data, and Mathematical Observations"
   * by Gaurav Sharma, Wencheng Wu and Edul N. Dalal.
   */

  // Get L,a,b values for color 1
  var L1 = c1.L;
  var a1 = c1.a;
  var b1 = c1.b;

  // Get L,a,b values for color 2
  var L2 = c2.L;
  var a2 = c2.a;
  var b2 = c2.b;

  // Weight factors
  var kL = 1;
  var kC = 1;
  var kH = 1;

  /**
   * Step 1: Calculate C1p, C2p, h1p, h2p
   */
  var C1 = sqrt(pow(a1, 2) + pow(b1, 2)) //(2)
  var C2 = sqrt(pow(a2, 2) + pow(b2, 2)) //(2)

  var a_C1_C2 = (C1+C2)/2.0;             //(3)

  var G = 0.5 * (1 - sqrt(pow(a_C1_C2 , 7.0) /
                          (pow(a_C1_C2, 7.0) + pow(25.0, 7.0)))); //(4)

  var a1p = (1.0 + G) * a1; //(5)
  var a2p = (1.0 + G) * a2; //(5)

  var C1p = sqrt(pow(a1p, 2) + pow(b1, 2)); //(6)
  var C2p = sqrt(pow(a2p, 2) + pow(b2, 2)); //(6)

  var hp_f = function(x,y) //(7)
  {
    if(x== 0 && y == 0) return 0;
    else{
      var tmphp = degrees(atan2(x,y));
      if(tmphp >= 0) return tmphp
      else           return tmphp + 360;
    }
  }

  var h1p = hp_f(b1, a1p); //(7)
  var h2p = hp_f(b2, a2p); //(7)

  /**
   * Step 2: Calculate dLp, dCp, dHp
   */
  var dLp = L2 - L1; //(8)
  var dCp = C2p - C1p; //(9)

  var dhp_f = function(C1, C2, h1p, h2p) //(10)
  {
    if(C1*C2 == 0)               return 0;
    else if(abs(h2p-h1p) <= 180) return h2p-h1p;
    else if((h2p-h1p) > 180)     return (h2p-h1p)-360;
    else if((h2p-h1p) < -180)    return (h2p-h1p)+360;
    else                         throw(new Error());
  }
  var dhp = dhp_f(C1,C2, h1p, h2p); //(10)
  var dHp = 2*sqrt(C1p*C2p)*sin(radians(dhp)/2.0); //(11)

  /**
   * Step 3: Calculate CIEDE2000 Color-Difference
   */
  var a_L = (L1 + L2) / 2.0; //(12)
  var a_Cp = (C1p + C2p) / 2.0; //(13)

  var a_hp_f = function(C1, C2, h1p, h2p) { //(14)
    if(C1*C2 == 0)                                      return h1p+h2p
    else if(abs(h1p-h2p)<= 180)                         return (h1p+h2p)/2.0;
    else if((abs(h1p-h2p) > 180) && ((h1p+h2p) < 360))  return (h1p+h2p+360)/2.0;
    else if((abs(h1p-h2p) > 180) && ((h1p+h2p) >= 360)) return (h1p+h2p-360)/2.0;
    else                                                throw(new Error());
  }
  var a_hp = a_hp_f(C1,C2,h1p,h2p); //(14)
  var T = 1-0.17*cos(radians(a_hp-30))+0.24*cos(radians(2*a_hp))+
    0.32*cos(radians(3*a_hp+6))-0.20*cos(radians(4*a_hp-63)); //(15)
  var d_ro = 30 * exp(-(pow((a_hp-275)/25,2))); //(16)
  var RC = sqrt((pow(a_Cp, 7.0)) / (pow(a_Cp, 7.0) + pow(25.0, 7.0)));//(17)
  var SL = 1 + ((0.015 * pow(a_L - 50, 2)) /
                sqrt(20 + pow(a_L - 50, 2.0)));//(18)
  var SC = 1 + 0.045 * a_Cp;//(19)
  var SH = 1 + 0.015 * a_Cp * T;//(20)
  var RT = -2 * RC * sin(radians(2 * d_ro));//(21)
  var dE = sqrt(pow(dLp /(SL * kL), 2) + pow(dCp /(SC * kC), 2) +
                pow(dHp /(SH * kH), 2) + RT * (dCp /(SC * kC)) *
                (dHp / (SH * kH))); //(22)
  return dE;
}

/**
 * INTERNAL FUNCTIONS
 */
function degrees(n) { return n*(180/PI); }
function radians(n) { return n*(PI/180); }

// Local Variables:
// allout-layout: t
// js-indent-level: 2
// End:
