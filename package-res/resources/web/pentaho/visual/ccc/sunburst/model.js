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
  "../abstract/model",
  "pentaho/i18n!../abstract/i18n/model",
  "../abstract/types/displayUnits",
  "../abstract/types/labelsOption",
  "../abstract/types/sliceOrder",
  "../abstract/mixins/settingsMultiChartMeta"
], function(abstractModelFactory, bundle, displayUnitsFactory, labelsOptionFactory, sliceOrderFactory,
    settingsMultiChartMeta) {

  "use strict";

  return function(context) {

    var Abstract = context.get(abstractModelFactory);

    return Abstract.extend({
      meta: {
        id: "pentaho/visual/ccc/sunburst",
        v2Id: "ccc_sunburst",

        view: "View",
        styleClass: "pentaho-visual-ccc-sunburst",

        props: [
          {
            name: "size",
            type: "string",
            dataType: "number",
            isVisualRole: true
          },
          {
            name: "multi",
            type: ["string"],
            dataType: "string",
            isVisualRole: true,
            required: false
          },

          {
            name: "displayUnits",
            type: displayUnitsFactory,
            required: true,
            value: "units_0"
          },
          {
            name: "labelsOption",
            type: {
              base: labelsOptionFactory,
              domain: ["none", "center"]
            },
            required: true,
            value: "none"
          },
          {
            name: "emptySlicesHidden",
            type: "boolean",
            required: true,
            value: true
          },
          {
            name: "sliceOrder",
            type: sliceOrderFactory,
            required: true,
            value: "bySizeDescending"
          }
        ]
      }
    })
    .implement({meta: settingsMultiChartMeta})
    .implement({meta: bundle.structured["settingsMultiChart"]})
    .implement({meta: bundle.structured["sunburst"]});
  };
});
