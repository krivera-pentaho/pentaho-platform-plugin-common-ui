/*!
 * Copyright 2010 - 2015 Pentaho Corporation.  All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define([
  "./Item",
  "./value",
  "./element",
  "./list",
  "./refinement",
  "./simple",
  "./complex",
  "./string",
  "./number",
  "./boolean",
  "./date",
  "./object",
  "./function",
  "./facets/DiscreteDomain"
], function(Item, valueFactory, elementFactory, listFactory, refinementFactory,
    simpleFactory, complexFactory, stringFactory, numberFactory, booleanFactory,
    dateFactory, objectFactory, functionFactory,
    DiscreteDomain) {

  "use strict";
  
  return {
    // types
    "value":    valueFactory,
    "element":  elementFactory,
    "list":     listFactory,
    "refinement": refinementFactory,
    "simple":   simpleFactory,
    "string":   stringFactory,
    "number":   numberFactory,
    "boolean":  booleanFactory,
    "date":     dateFactory,
    "complex":  complexFactory,
    "object":   objectFactory,
    "function": functionFactory,

    "facets": {
      "DiscreteDomain": DiscreteDomain
    }
  };
});
