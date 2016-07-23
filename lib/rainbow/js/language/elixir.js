/**
 * Elixir patterns, based on Ruby patterns
 *
 * @author Fred Wu <ifredwu@gmail.com>
 */

Rainbow.extend('elixir', [
  /**
   * Regular expressions
   * Escaped delimiter (`/\//`) is unsupported.
   */
  {
    name: 'string.regexp',
    matches: {
      1: 'string.regexp',
      2: {
        name: 'string.regexp',
        pattern: /\\(.){1}/g
      },
      3: 'string.regexp',
      4: 'string.regexp'
    },
    pattern: /~r(\/)(.*?)(\/)([a-z]*)/g
  },
  /**
   * Strings
   *   1. No support for multi-line strings
   */
  {
    name: 'string',
    matches: {
      1: 'string.open',
      2: [{
        name: 'string.interpolation',
        matches: {
          1: 'string.open',
          2: {
            language: 'elixir'
          },
          3: 'string.close'
        },
        pattern: /(\#\{)(.*?)(\})/g
      }],
      3: 'string.close'
    },
    pattern: /("|`)(.*?[^\\\1])?(\1)/g
  },
  {
    name: 'string',
    pattern: /('|"|`)([^\\\1\n]|\\.)*?\1/g
  },
  {
    name: 'string',
    pattern: /%[qQ](?=(\(|\[|\{|&lt;|.)(.*?)(?:'|\)|\]|\}|&gt;|\1))(?:\(\2\)|\[\2\]|\{\2\}|\&lt;\2&gt;|\1\2\1)/g
  },
  /**
   * Comments
   */
  {
    name: 'comment',
    pattern: /#.*$/gm
  },
  {
    name: 'comment',
    pattern: /""".*?$([\s\S]*?^\s*""")/gm
  },
  /**
   * Symbols
   */
  {
    matches: {
      1: 'constant'
    },
    pattern: /(\w+:)[^:]/g
  },
  {
    matches: {
      1: 'constant.symbol'
    },
    pattern: /[^:](:(?:\w+|(?=['"](.*?)['"])(?:"\2"|'\2')))/g
  },
  {
    name: 'constant.numeric',
    pattern: /\b(0x[\da-f]+|[\d_]+)\b/g
  },
  {
    name: 'support.class',
    pattern: /\b[A-Z]\w*(?=((\.)[A-Za-z]|\[))/g
  },
  {
    name: 'constant',
    pattern: /\b[A-Z]\w*\b/g
  },
  /**
   * Keywords, variables, constants, and operators
   */
  {
    matches: {
      1: 'storage.module',
      2: 'entity.name.class'
    },
    pattern: /\s*(defmodule|defprotocol|defimpl|defrecord)\s+((?:[A-Z]\w*\.?)+)/g
  },
  {
    name: 'variable.instance',
    pattern: /@([a-zA-Z_]\w*)\b/g
  },
  {
    matches: {
      1: 'keyword.control'
    },
    pattern: /[^\.]\b(after|alias|and|case|catch|cond|do|else|end|fn|for|if|import|not|or|require|rescue|try|unless|use|when)\b(?![?!])/g
  },
  {
    matches: {
      1: 'constant.language'
    },
    pattern: /\b(nil|true|false)\b(?![?!])/g
  },
  {
    matches: {
      1: 'variable.language'
    },
    pattern: /\b(__(FILE|LINE)__|self)\b(?![?!])/g
  },
  {
    name: 'keyword.operator',
    pattern: /\s\?\s|=|&lt;&lt;|&lt;&lt;=|%=|&=|\*=|\*\*=|\+=|\-=|\^=|\|{1,2}=|&lt;&lt;|&lt;=&gt;|&lt;(?!&lt;|=)|&gt;(?!&lt;|=|&gt;)|&lt;=|&gt;=|===|==|=~|!=|!~|%{|%||&amp;|\*\*|\*|\+|\-|\/|\||~|&gt;&gt;/g
  },
  {
    matches: {
      1: 'keyword.operator.logical'
    },
    pattern: /[^\.]\b(and|not|or)\b/g
  },

  /**
  * Functions
  *   1. No support for marking function parameters
  */
  {
    matches: {
      1: 'storage.function',
      2: 'entity.name.function'
    },
    pattern: /(defmacro|defp|def)\s(.*?)(?=(\s|\())/g
  }
]);
