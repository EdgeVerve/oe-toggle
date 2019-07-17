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

import "@polymer/paper-ripple/paper-ripple.js"

import "@polymer/paper-tabs/paper-tabs.js"
import "@polymer/paper-tabs/paper-tab.js"


import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";
import "oe-i18n-msg/oe-i18n-msg";
import { Polymer } from '@polymer/polymer/polymer-legacy';

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
class OeSliderToggle extends OEFieldMixin(PolymerElement) {

  static get is() {
    return 'oe-slider-toggle';
  }

  static get template() {
    return html `
    <style include="iron-flex">
    :host {
      display: block;
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 90px;
      height: 34px;
    }
    
    .switch input {display:none;}
    
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: blue;
      -webkit-transition: .4s;
      transition: .4s;
    }
    
    .slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }
    
    input:checked + .slider {
      background-color: red;
    }
    
    input:focus + .slider {
      box-shadow: 0 0 1px #2196F3;
    }
    
    input:checked + .slider:before {
      -webkit-transform: translateX(55px);
      -ms-transform: translateX(55px);
      transform: translateX(55px);
    }
    
    /*------ ADDED CSS ---------*/
    .on
    {
      display: none;
    }
    
    .on, .off
    {
      color: white;
      position: absolute;
      transform: translate(-50%,-50%);
      top: 50%;
      left: 50%;
    }
    
    input:checked+ .slider .on
    {display: block;}
    
    input:checked + .slider .off
    {display: none;}
    
    /*--------- END --------*/
    
    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }
    
    .slider.round:before {
      border-radius: 50%;}

    </style>

    <label class="switch"><input type="checkbox" id="togBtn">
    <div class="slider round">
      <span class="off">[[listdata.0.label]]</span>
      <span class="on">[[listdata.1.label]]</span>
    </div>
    </label>


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
        style = this.listdata[index].style || OeSliderToggle._defaultStyles[index]
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

window.customElements.define(OeSliderToggle.is, OeSliderToggle);