/*!
 * Copyright 2010 - 2016 Pentaho Corporation. All rights reserved.
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
  "../barAbstract/model",
  "pentaho/i18n!../abstract/i18n/model",
  "../abstract/types/labelsOption",
  "../abstract/types/shape",
  "../abstract/types/lineWidth",
  "../abstract/mixins/interpolationMeta"
], function(barAbstractModelFactory, bundle, labelsOptionFactory, shapeFactory, lineWidthFactory,
    interpolationMeta) {

  "use strict";

  return function(context) {

    var BarAbstract = context.get(barAbstractModelFactory);

    function requiredOneMeasure() {
      /*jshint validthis:true*/
      return !this.count("measures") && !this.count("measuresLine");
    }

    return BarAbstract.extend({

      meta: {
        id: "pentaho/visual/ccc/barLine",
        v2Id: "ccc_barline",

        view: "View",
        styleClass: "pentaho-visual-ccc-bar-line",

        props: [
          {
            name: "measures",
            required: requiredOneMeasure
          },
          {
            name: "measuresLine",
            type: ["string"],
            dataType: "number",
            isVisualRole: true,
            required: requiredOneMeasure
          },

          {
            name: "lineWidth",
            type: lineWidthFactory,
            applicable: function() { return this.count("measuresLine") > 0; },
            required: true,
            value: 1
          },
          {
            name: "labelsOption",
            type: {
              base: labelsOptionFactory,
              domain: ["none", "center", "insideEnd", "insideBase", "outsideEnd"]
            },
            applicable: function() { return this.count("measures") > 0; },
            required: true,
            value: "none"
          },

          {
            name: "lineLabelsOption",
            type: {
              base: labelsOptionFactory,
              domain: ["none", "center", "left", "right", "top", "bottom"]
            },
            applicable: function() { return this.count("measuresLine") > 0; },
            required: true,
            value: "none"
          },

          {
            name: "shape",
            type: shapeFactory,
            required: true,
            value: "circle",
            applicable: function() { return this.count("measuresLine") > 0; }
          }
        ]
      }
    })
    .implement({meta: interpolationMeta})
    .implement({meta: bundle.structured["interpolation"]})
    .implement({meta: bundle.structured["barLine"]});
  };
});
