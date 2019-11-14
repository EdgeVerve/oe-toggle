/**
 * @license
 * ©2018-2019 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 */

import {
  html,
  PolymerElement
} from '@polymer/polymer/polymer-element.js';
import {
  OEFieldMixin
} from "oe-mixins/oe-field-mixin.js";
import "@polymer/paper-button/paper-button.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";

import "oe-i18n-msg/oe-i18n-msg";

/**
 * `oe-multistate-toggle`
 * A control to switch between specified states
 *
 * 
 * ### Styling
 * 
 * The following custom properties and mixins are available for styling:
 * 
 * CSS Variable | Description | Default
 * ----------------|-------------|----------
 * `--oe-multistate-toggle-button` | Mixin applied on toggle button
 * `--oe-multistate-toggle-label` | Mixin applied on toggle label
 * 
 * 
 * @customElement
 * @polymer
 * @appliesMixin OEFieldMixin
 * @demo /demo/index.html
 */
class OeMultiStateToggle extends OEFieldMixin(PolymerElement) {

  static get is() {
    return 'oe-multistate-toggle';
  }

  static get template() {
    return html `
    <style include="iron-flex">
    :host {
      display: block;
    }

    #label {
      font-size: 12px;
      color: var(--secondary-text-color);
      @apply --oe-multistate-toggle-label;
    }

    #button {
      font-size: 15px;
      margin: 0px;
      padding: 0.32em 0.57em;
      @apply --oe-multistate-toggle-button;
    }

    .container {
      margin-top: 12px;
    }

    #label.label-focused {
      color: var(--oe-multistate-toggle-label-focused-color, var(--primary-color));
      @apply --oe-multistate-toggle-label-focused;
    }

    </style>
      <div class="container layout vertical">
        <span id="label" class$=[[_getLabelClass(focused)]] hidden$=[[!label]]>
            dsdasd <oe-i18n-msg msgid="=[[label]]">[[label]]</oe-i18n-msg>
        </span>
        <paper-button id="button" style=[[_getStyle(value)]] on-tap="_nextState" disabled=[[disabled]] raised=[[raised]]>[[_getDisplay(value)]]</paper-button>
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
       * Property reflecting checked state.
       */
      value: {
        type: String,
        notify: true,
        value: ""
      },

      listdata: {
        type: Array
      },
      /**
       * Property setting the disabled state. 
       */
      disabled: {
        type: Boolean,
        value: false
      },

      /**
       * Property setting the raised state. 
       */
      raised: {
        type: Boolean,
        value: false
      },
      _boundOnFocus: {
        type: Function,
        value: function () {
          return this._onFocus.bind(this);
        }
      },

      _boundOnBlur: {
        type: Function,
        value: function () {
          return this._onBlur.bind(this);
        }
      }
    };
  }

  ready() {
    super.ready();
    this.addEventListener('focus', this._boundOnFocus, true);
    this.addEventListener('blur', this._boundOnBlur, true);
  }
  _onFocus() {
    console.log('Got Focus');
    this.set('focused', true);
  }

  _onBlur() {
    console.log('Lost Focus');
    this.set('focused', false);
  }

  _getLabelClass(focused) {
    let val = focused ? 'label-focused' : '';
    console.log(val)
    return val;
  }
  static get _defaultStyles() {
    return [
      'background: var(--primary-color); color: var(--text-primary-color);',
      'background: var(--accent-color); color: var(--text-primary-color);',
      'background: #ED553B; color: var(--text-primary-color);',
      'background: #20639B; color: var(--text-primary-color);',
      'background: #F6D55C; color: var(--text-primary-color);'
    ]
  }
  _getStyle(value) {
    let style;
    let self = this;
    if (this.listdata) {
      let index = this.listdata.findIndex(item => item.value === self.value);
      if (index >= 0) {
        style = this.listdata[index].style || OeMultiStateToggle._defaultStyles[index]
      }
    }
    return style;

  }

  _getDisplay(value) {
    let display = '';
    let self = this;
    if (this.listdata) {
      let index = this.listdata.findIndex(item => item.value === self.value);
      display = index >= 0 ? this.listdata[index].label : '';
    }
    return display;
  }
  _nextState() {
    let self = this;
    if (this.listdata) {
      let index = this.listdata.findIndex(item => item.value === self.value);
      index += 1;
      if (index < 0 || index >= this.listdata.length) {
        index = 0;
      }
      this.set('value', this.listdata[index].value);
    }
  }

}

window.customElements.define(OeMultiStateToggle.is, OeMultiStateToggle);