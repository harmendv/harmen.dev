(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["view-stylelint"],{f81e:function(e,n,o){"use strict";o.r(n);var r=function(){var e=this,n=e.$createElement,o=e._self._c||n;return o("div",[o("vue-code",{attrs:{code:e.code}})],1)},t=[],i=o("d1e8"),l={components:{VueCode:i["a"]},data:function(){return{code:"module.exports = {\n  extends: [\n    'stylelint-config-standard', // Load the standard stylelint configuration\n    'stylelint-config-rational-order',\n  ],\n  plugins: [\n    'stylelint-declaration-block-no-ignored-properties', // This plugin checks for ignored properties and throws error if so\n  ],\n  rules: {\n    'no-empty-source': null, // If not set an error will be shown for single file components without css\n    'string-quotes': 'single', // Use single quotes for all strings\n    'at-rule-no-vendor-prefix': true, // No vendor prefix (let autoprefixer handle this)\n    'media-feature-name-no-vendor-prefix': true, // No vendor prefix (let autoprefixer handle this)\n    'property-no-vendor-prefix': true, // No vendor prefix (let autoprefixer handle this)\n    'selector-no-vendor-prefix': true, // No vendor prefix (let autoprefixer handle this)\n    'value-no-vendor-prefix': true, // No vendor prefix (let autoprefixer handle this)\n    'color-no-invalid-hex': true, // No invalid (shorthand) hex allowed\n    'no-descending-specificity': null, // Disabled because of SCSS conflicts\n    'at-rule-no-unknown': null, // Disabled because of SCSS conflicts (@while, @for)\n    'media-feature-name-no-unknown': true, // Only known media features can be used\n    'plugin/declaration-block-no-ignored-properties': true, // Disallow property values that are ignored due to another property value in the same rule\n  },\n};"}}},a=l,s=o("2877"),d=Object(s["a"])(a,r,t,!1,null,null,null);n["default"]=d.exports}}]);
//# sourceMappingURL=view-stylelint.ce05c92c.js.map