/*jslint this: true*/
/*globals jQuery*/
/**
 * Basic jQuery plugin that turns any element into a toggle button.
 *
 * @author Dan Bettles <dan@powder-blue.com>
 * @copyright Powder Blue Ltd 2014
 * @license MIT
 */

(function () {
    'use strict';

    /**
     * @class
     * @param {jQuery} oButtonEl
     * @param {Object} oOptions
     */
    function ToggleButton(oButtonEl, oOptions) {
        this.setEl(oButtonEl);
        this.setOptions(oOptions);
    }

    /**
     * @type {String}
     */
    ToggleButton.CLASS_NAME_ON = 'toggle_button__on';

    ToggleButton.prototype = {

        /**
         * @private
         * @param {jQuery} oEl
         * @returns {undefined}
         */
        setEl: function (oEl) {
            this.oEl = oEl;
        },

        /**
         * @returns {jQuery}
         */
        getEl: function () {
            return this.oEl;
        },

        /**
         * @private
         * @param {Object} oOptions
         * @returns {undefined}
         */
        setOptions: function (oOptions) {
            this.oOptions = oOptions;
        },

        /**
         * @returns {Object}
         */
        getOptions: function () {
            return this.oOptions;
        },

        /**
         * @param {Variant} [arg,...]
         * @returns {undefined}
         */
        on: function (arg) {
            this.getEl().addClass(ToggleButton.CLASS_NAME_ON);
            this.callUserEventHandler('on', arguments);
            this.callUserEventHandler('both', arguments);
        },

        /**
         * @param {Variant} [arg,...]
         * @returns {undefined}
         */
        off: function (arg) {
            this.getEl().removeClass(ToggleButton.CLASS_NAME_ON);
            this.callUserEventHandler('off', arguments);
            this.callUserEventHandler('both', arguments);
        },

        /**
         * @returns {Boolean}
         */
        isOn: function () {
            return this.getEl().hasClass(ToggleButton.CLASS_NAME_ON);
        },

        /**
         * @param {Variant} [arg,...]
         * @returns {undefined}
         */
        toggle: function (arg) {
            if (this.isOn()) {
                this.off.apply(this, arguments);
            } else {
                this.on.apply(this, arguments);
            }
        },

        /**
         * @private
         * @param {String} eventName
         * @param {Array} aArgument
         * @returns {Boolean}
         */
        callUserEventHandler: function (eventName, aArgument) {
            var handler = this.getOptions()[eventName];

            if (typeof handler === 'function') {
                handler.apply(this, aArgument);
                return true;
            }

            return false;
        }
    };

    jQuery.fn.extend({

        /**
         * Options:
         * - `on`: Function to call when the button is switched on.
         * - `off`: Function to call when the button is switched off.
         * - `both`: Function to call when the button is switched on or off.
         *
         * Examples:
         * - A toggle button can be switched on by calling `el.data('toggleButton').on()`.
         * - A toggle button can be switched off by calling `el.data('toggleButton').off()`.
         * - The state of a toggle button can be toggled by calling `el.data('toggleButton').toggle()`.
         * - The state of a toggle button can be fetched by calling `el.data('toggleButton').isOn()`.
         *
         * @param {Object} [oOptions]
         * @returns {jQuery}
         */
        toggleButton: function (oOptions) {
            return this.each(function () {
                var oButtonEl = jQuery(this);

                oButtonEl
                    .data('toggleButton', new ToggleButton(oButtonEl, oOptions))
                    .on("click", function (oEvent) {
                        oEvent.preventDefault();
                        jQuery(this).data('toggleButton').toggle(oEvent);
                    });
            });
        }
    });
}());
