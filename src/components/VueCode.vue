<template>
  <div class="code">
    <prism-editor
      v-model="model"
      :language="language"
      :line-numbers="true"
      :highlight="highlighter"
    />
  </div>
</template>

<script>
import { PrismEditor } from 'vue-prism-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'vue-prism-editor/dist/prismeditor.min.css';

export default {
  components: {
    PrismEditor,
  },
  props: {
    code: {
      type: String,
      default: '',
      required: true,
    },
    language: {
      type: String,
      default: 'js',
    },
  },
  data() {
    return {
      changedCode: this.code,
    };
  },
  computed: {
    model: {
      // getter
      get() {
        return this.changedCode;
      },
      // setter
      set(newValue) {
        this.changedCode = newValue;
      },
    },
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js);
    },
  },
};
</script>

<style lang="scss">
.code {
  padding: 10px 0;
  outline: none;
}
</style>

<style>
/* stylelint-disable */

/**
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou
 */

code[class*='language-'],
pre[class*='language-'] {
  background: none;
  color: #c2cbff;
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 1em;
  line-height: 1.5;
  text-align: left;
  word-wrap: normal;
  word-break: normal;
  white-space: pre;
  word-spacing: normal;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
}

pre[class*='language-']::-moz-selection,
pre[class*='language-'] ::-moz-selection,
code[class*='language-']::-moz-selection,
code[class*='language-'] ::-moz-selection {
  background: #b3d4fc;
  text-shadow: none;
}

pre[class*='language-']::selection,
pre[class*='language-'] ::selection,
code[class*='language-']::selection,
code[class*='language-'] ::selection {
  background: #b3d4fc;
  text-shadow: none;
}

@media print {
  code[class*='language-'],
  pre[class*='language-'] {
    text-shadow: none;
  }
}

/* Code blocks */
pre[class*='language-'] {
  margin: 0.5em 0;
  padding-left: 10px;
  overflow: auto;
}

:not(pre) > code[class*='language-'],
pre[class*='language-'] {
}

/* Inline code */
:not(pre) > code[class*='language-'] {
  padding: 0.1em;
  border-radius: 0.3em;
  white-space: normal;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: slategray;
}

.token.punctuation {
  color: #999;
}

.namespace {
  opacity: 0.7;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
  color: #ff6fbf;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
  color: #94ffc4;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  color: #787d9b;
}

.token.atrule,
.token.attr-value,
.token.keyword {
  color: #0ec7ff;
}

.token.function,
.token.class-name {
  color: #efc83e;
}

.token.regex,
.token.important,
.token.variable {
  color: #e90;
}

.token.important,
.token.bold {
  font-weight: bold;
}

.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}

.prism-editor__textarea {
  outline: none;
}
</style>
