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
 *
 */

define([], function() {
  return function(api) {
    /**
     * Registers a before render event
     *
     * @method beforeRender
     * @param callback {Function} The function to be executed when the event is triggered
     */
    this.beforeRender = function(callback) {
      api.operation._getPromptPanel().dashboard.on('cdf:beforeRender', callback);
    };
    
    /**
     * Registers an after render event
     *
     * @method afterRender
     * @param callback {Function} The function to be executed when the event is triggered
     */
    this.afterRender = function(callback) {
      api.operation._getPromptPanel().dashboard.on('cdf:postInit', callback);
    };

    /**
     * Registers a parameter changed event
     *
     * @method parameterChanged
     * @param callback {Function} The function to be executed when the event is triggered
     */
    this.parameterChanged = function(callback) {
      api.operation._getPromptPanel().dashboard.on('cdf:postInit', callback);
    };

    /**
     * Registers a post init event
     *
     * @method postInit
     * @param callback {Function} The function to be executed when the event is triggered
     */
    this.postInit = function(callback) {
      api.operation._getPromptPanel().dashboard.on('cdf:postInit', callback);
    }
  };
});