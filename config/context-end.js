/*!
 * This program is free software; you can redistribute it and/or modify it under the
 * terms of the GNU Lesser General Public License, version 2.1 as published by the Free Software
 * Foundation.
 *
 * You should have received a copy of the GNU Lesser General Public License along with this
 * program; if not, you can obtain a copy at http://www.gnu.org/licenses/old-licenses/lgpl-2.1.html
 * or from the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Lesser General Public License for more details.
 *
 * Copyright 2016 Pentaho Corporation. All rights reserved.
 */

/**
 * Runs the project's unit tests using karma.
 *
 * Unit tests are AMD JS modules whose name ends with `"Spec"`.
 * Also, they're assumed to be located under the special project folder: `"test-js/unit"`.
 * The content of this folder is made accessible under the `"tests"` AMD id.
 * You don't strictly need to use this id, as you can use relative module ids to refer
 * to other utility test modules.
 *
 * This function configures AMD using the global variable `requireCfg`, if defined.
 *
 * @see http://karma-runner.github.io/0.10/plus/requirejs.html
 */
(function() {
  "use strict";

  /*global requireCfg:false, KARMA_DEBUG:false, __karma__:false, console:false, DEV_SPEC_FILTER:false*/

  // Karma serves files from '/base'

  requireCfg.paths["tests"] = "/base/test-js/unit";

  // ----------------

  require.config(requireCfg);

  // Ask Require.js to load all spec files and then start test run.
  require(getSpecs(), __karma__.start);

  /**
   * Filters `*Spec.js` files from `__karma__.files` and
   * loads these as AMD modules, under the `tests` root amd id.
   *
   * If files were loaded by AMD as js files (and not AMD modules),
   * it would not be possible to use relative module ids for referring to
   * sibling test utility modules.
   *
   * If the configuration variable `DEV_SPEC_FILTER` is defined,
   * its used to filter detected specification files further.
   *
   * If the configuration variable `KARMA_DEBUG` is set to `true`,
   * information about detected spec files is written to the console.
   *
   * @return {string[]} An array of Spec module ids.
   */
  function getSpecs() {
    var reSpec = /^\/base\/test-js\/unit\/(.*?Spec)\.js$/,
        specs = [],
        m;

    for(var file in __karma__.files)
      if((m = reSpec.exec(file)) && (!DEV_SPEC_FILTER || DEV_SPEC_FILTER.test(m[1])))
        specs.push('tests/' + m[1]); // prefix with the "tests" module id.

    if(KARMA_DEBUG) console.log("all detected specs:", specs);

    return specs;
  }

}());