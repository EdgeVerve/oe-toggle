/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */

import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { OEFieldMixin } from "oe-mixins/oe-field-mixin.js";
import "@polymer/paper-toggle-button/paper-toggle-button.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/iron-icons/iron-icons.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "oe-i18n-msg/oe-i18n-msg";

/**
 * `oe-toggle`
 * A control to switch between two states either through Polymer's paper-toggel-button or paper-icon-button
 *
 * 
 * ### Styling
 * 
 * The following custom properties and mixins are available for styling:
 * 
 * CSS Variable | Description | Default
 * ----------------|-------------|----------
 * `--paper-toggle-button-checked-bar-color` | Slider button color when the input is checked | `--primary-color`
 * `--paper-toggle-button-checked-button-color` | Button color when the input is checked | `--primary-color`
 * `--oe-toggle-icon-checked-color` | Icon color when the button is checked | `#3F51B5`
 * `--oe-toggle-icon-unchecked-color` | Icon color when the button is unchecked | `#000000`
 * `--oe-toggle-label` | Mixin applied on toggle label
 * 
 * 
 * @customElement
 * @polymer
 * @appliesMixin OEFieldMixin
 * @demo /demo/index.html
 */
class OeToggle extends OEFieldMixin(PolymerElement) {

  static get is(){ return 'oe-toggle';}

  static get template() {
    return html`
    <style include="iron-flex">
      :host([disabled]) paper-icon-button {
       color: var(--disabled-text-color) !important;
      }

      .toggleSpan {
        margin: 10px;
        @apply --oe-toggle-label
      }

      paper-icon-button.checked {
        color: var(--oe-toggle-icon-checked-color,#3F51B5);
      }

      paper-icon-button.unchecked {
         color: var(--oe-toggle-icon-unchecked-color,#000000);
      }

    </style>
      <div class="layout horizontal">
        <span class="toggleSpan" hidden$=[[!label]]>
            <oe-i18n-msg msgid="=[[label]]">[[label]]</oe-i18n-msg>
        </span>
        <template is="dom-if" if="[[!_isIcon(icon)]]">
          <paper-toggle-button disabled$="[[disabled]]" aria-label$="[[label]]" checked={{value}}>
          </paper-toggle-button>
        </template>
        <template is="dom-if" if="[[_isIcon(icon)]]">
          <paper-icon-button icon="[[icon]]" disabled$="[[disabled]]" aria-label$="[[label]]" toggles active={{value}}
            class$="[[_getFillStyle(value)]]">
          </paper-icon-button>
        </template>
    </div>
    `;
  }

  static get properties() {
    return {
      /**
       * Specifies the label to be displayed beside the toggle.
       */
      label: {
        type: String
      },

      /**
       * Specifies the icon name or index in the set of icons available in
       * the icon's icon set. If given a valid value,
       * toggle icon will be displayed instead of sliding toggle.
       */
      icon: {
        type: String,
        value: ''
      },

      /**
       * Property reflecting checked state.
       */
      value: {
        type: Boolean,
        notify: true,
        value: false
      },

      /**
       * Property setting the disabled state. 
       */
      disabled:{
        type: Boolean,
        value: false
      }
    };
  }

  /**
   * Function to set icon's css class.
   * @param {boolean} checked 
   * @return {string} class name to change the CSS
   */
  _getFillStyle(checked) {
    if (this.icon && !this.disabled) {
      return (checked ? 'checked' : 'unchecked');
    }
  }

  /**
   * Function to determine display of toggle icon.
   * @param {string} icon Icon Name
   * @return {boolean} flag denoting whether a icon is needed.
   */
  _isIcon(icon) {
    return (icon != '' ? true : false);
  }

}

window.customElements.define(OeToggle.is, OeToggle);