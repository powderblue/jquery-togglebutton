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

        /**
         * @param {jQuery.Event} [oEvent]
         * @returns {undefined}
         */
        on: function (oEvent) {
            this.getEl().addClass(ToggleButton.CLASS_NAME_ON);
            this.callUserEventHandler('on', [oEvent]);
            this.callUserEventHandler('both', [oEvent]);
        },

        /**
         * @param {jQuery.Event} [oEvent]
         * @returns {undefined}
         */
        off: function (oEvent) {
            this.getEl().removeClass(ToggleButton.CLASS_NAME_ON);
            this.callUserEventHandler('off', [oEvent]);
            this.callUserEventHandler('both', [oEvent]);
        },

        isOn: function () {
            return this.getEl().is('.' + ToggleButton.CLASS_NAME_ON);
        },

        /**
         * @param {jQuery.Event} [oEvent]
         * @returns {undefined}
         */
        toggle: function (oEvent) {
            if (this.isOn()) {
                this.off(oEvent);
            } else {
                this.on(oEvent);
            }
        },

        /**
         * @private
         * @param {String} eventName
         * @param {Array} aArgument
         * @returns {Boolean}
         */
        callUserEventHandler: function (eventName, aArgument) {
            if (typeof this.getOptions()[eventName] === 'function') {
                this.getOptions()[eventName].apply(this, aArgument);
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
                    .click(function (oEvent) {
                        jQuery(this).data('toggleButton').toggle(oEvent);
                        return false;
                    });
            });
        }
    });
}(jQuery));