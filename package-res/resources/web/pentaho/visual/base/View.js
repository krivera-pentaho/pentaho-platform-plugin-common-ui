/*!
 * Copyright 2010 - 2016 Pentaho Corporation.  All rights reserved.
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
  "pentaho/lang/Base",
  "pentaho/util/error",
  "pentaho/shim/es6-promise"
], function(Base, error, Promise) {

  "use strict";

  /**
   * @name pentaho.visual.base.View
   * @memberOf pentaho.visual.base
   * @class
   * @extends pentaho.lang.Base
   * @abstract
   * @classDesc This is the base class for visualizations.
   *
   * A container is expected to instantiate a `View` with a reference to a `Model` instance,
   * which may not be immediately valid.
   *
   * Over time, the container mutates the `Model` instance and triggers events.
   * In response, the method [_onChange]{@link pentaho.visual.base.View#_onChange} is
   * invoked to process the events, which may cause the `View` to update itself.
   *
   * @description Initializes a `View` instance.
   *
   * @constructor
   * @param {HTMLElement} element The DOM element where the visualization should render.
   * An error is thrown if this is not a valid DOM element.
   * @param {pentaho.visual.base.Model} model The base visualization `Model`.
   *
   * @throws {pentaho.lang.ArgumentInvalidError} When `element` is not an HTML DOM element.
   */

  var View = Base.extend(/** @lends pentaho.visual.base.View# */{
    constructor: function(element, model) {
      if(!element)
        throw error.argRequired("element");
      if(!isElement(element))
        throw error.argInvalidType("element", "HTMLElement", typeof element);

      if(!model)
        throw error.argRequired("model");

      /**
       * The HTML element where the visualization should render.
       * @type {HTMLElement}
       * @protected
       * @readonly
       */
      this._element = element;

      /**
       * The modelf of the visualization.
       * @type {pentaho.visual.base.Model}
       * @public
       * @readonly
       */
      this.model = model;

      this._init();
    },

    /**
     * Orchestrates the rendering of the visualization.
     *
     * This method executes [_render]{@link pentaho.visual.base.View#_render}
     * asynchronously and is meant to be invoked by the container.
     *
     * @return {Promise} A promise that is fulfilled when the visualization
     * is completely rendered. If the visualization is in an invalid state, the promise
     * is immediately rejected.
     */
    render: function() {
      var me = this;
      return new Promise(function(resolve, reject) {
        try {
          var validationErrors = me._validate();
          if(!validationErrors) {
            Promise.resolve(me._render()).then(resolve, reject);
          } else {
            reject(validationErrors);
          }
        } catch(e) {
          reject(e.message);
        }
      });
    },

    /**
     * Called before the visualization is discarded.
     *
     * @overridable
     */
    dispose: function() {
      this._element = null;
    },

    /**
     * Initializes the visualization.
     *
     * This method is invoked by the constructor of `pentaho.visual.base.View`.
     * Override this method to perform initialization tasks,
     * such as setting up event listeners.
     *
     * @protected
     * @overridable
     */
    _init: function() {
      //this.model.on("change", this._onChange);
    },

    /**
     * Validates the current state of the visualization.
     *
     * By default, this method simply calls {@link pentaho.visual.base.Model#validate}
     * to validate the model.
     *
     * @return {?Array.<!Error>} A non-empty array of `Error` or `null`.
     * @protected
     * @overridable
     */
    _validate: function() {
      var validationErrors = this.model.validate();
      return validationErrors;
    },

    /**
     * Determines if the visualization is in a valid state.
     *
     * A visualization in an invalid state should not be rendered.
     *
     * @return {boolean} Returns `true` if this visualization is valid, or `false` if not valid.
     * @protected
     * @see pentaho.visual.base.View#_validate
     */
    _isValid: function() {
      return !this._validate();
    },

    /**
     * Renders the visualization.
     *
     * Subclasses of `pentaho.visual.base.View` should override this method
     * and implement a complete rendering of the visualization.
     *
     * @protected
     * @overridable
     */
    _render: function() {
      throw error.notImplemented("_render");
    },

    /**
     * Updates the visualization, taking into account that
     * only the dimensions have changed.
     *
     * Subclasses of `pentaho.visual.base.View` are expected to override this method to
     * implement a fast and cheap resizing of the visualization.
     * By default, this method invokes [_render]{@link pentaho.visual.base.View#_render}.
     *
     * @protected
     * @overridable
     */
    _resize: function() {
      this._render();
    },

    /**
     * Updates the visualization, taking into account that
     * only the selection has changed.
     *
     * Subclasses of `pentaho.visual.base.View` are expected to override this method
     * with an implementation that
     * updates the selection state of the items displayed by this visualization.
     * By default, this method invokes [_render]{@link pentaho.visual.base.View#_render}.
     *
     * @protected
     * @overridable
     */
    _selectionChanged: function() {
      this._render();
    },

    /**
     * Decides how the visualization should react
     * to a modification of its properties.
     *
     * Subclasses of `pentaho.visual.base.View` are expected to override this method
     * with an implementation that
     * selects the cheapest reaction to a generic change of properties.
     * By default, this method invokes [_render]{@link pentaho.visual.base.View#_render},
     * but the developer should also consider invoking
     * [_resize]{@link pentaho.visual.base.View#_resize} or
     * [_selectionChanged]{@link pentaho.visual.base.View#_selectionChanged}.
     *
     * @see pentaho.visual.base.View#_render
     * @see pentaho.visual.base.View#_resize
     * @see pentaho.visual.base.View#_selectionChanged
     *
     * @param {Object} changeMap - Map of the properties that have changed.
     * @protected
     * @overridable
     */
    _onChange: function(changeMap) {
      this._render();
    }
  });

  return View;

  function isElement(obj) {
    return typeof HTMLElement === "object" ? obj instanceof HTMLElement : !!(obj && obj.nodeType === 1);
  }
});
