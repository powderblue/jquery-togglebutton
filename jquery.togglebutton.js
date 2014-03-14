/*globals jQuery*/
/**
 * Very simple jQuery plugin that turns any element into a toggle button.
 * 
 * @author Dan Bettles <dan@powder-blue.com>
 */

(function (jQuery) {
    function ToggleButton(oButtonEl, oOptions) {
        this.setEl(oButtonEl);
        this.setOptions(oOptions);
    }

    ToggleButton.CLASS_NAME_ON = 'toggle_button__on';

    ToggleButton.prototype = {

        setEl: function (oEl) {
            this.oEl = oEl;
        },

        getEl: function () {
            return this.oEl;
        },

        setOptions: function (oOptions) {
            this.oOptions = oOptions;
        },

        getOptions: function () {
            return this.oOptions;
        },

        on: function () {
            this.getEl().addClass(ToggleButton.CLASS_NAME_ON);
            this.callUserEventHandler('on');
            this.callUserEventHandler('both');
        },

        off: function () {
            this.getEl().removeClass(ToggleButton.CLASS_NAME_ON);
            this.callUserEventHandler('off');
            this.callUserEventHandler('both');
        },

        isOn: function () {
            return this.getEl().is('.' + ToggleButton.CLASS_NAME_ON);
        },

        toggle: function () {
            if (this.isOn()) {
                this.off();
            } else {
                this.on();
            }
        },

        /**
         * @private
         * @param {String} eventName
         * @returns {Boolean}
         */
        callUserEventHandler: function (eventName) {
            if (typeof this.getOptions()[eventName] === 'function') {
                this.getOptions()[eventName].call(this);
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
                    .click(function () {
                        jQuery(this).data('toggleButton').toggle();
                        return false;
                    });
            });
        }
    });
}(jQuery));