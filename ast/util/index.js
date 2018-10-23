'use strict'

const assert = require('assert')
const parse5 = require('parse5')

const namespaceURI = 'http://www.w3.org/1999/xhtml'

class utils {

  parse(string, smart) {
    if (smart && !this.isDocument(string)) return this.parseFragment(string)
    return parse5.parse(string)
  }

  parseFragment(string) {
    return parse5.parseFragment(string)
  }

  serialize(node) {
    return parse5.serialize(node)
  }

  /**
   * TODO:
   *
   *   - Turn properties into booleans
   */

  attributesOf(node) {
    const attrs = node.attrs
    if (!attrs) return {}
    const obj = Object.create(null)
    for (let i = 0, l = attrs.length; i < l; i++) {
      const attr = attrs[i]
      obj[attr.name] = attr.value
    }
    return obj
  }

  toAttrs(obj) {
    const attrs = []
    Object.keys(obj).forEach(function (key) {
      attrs.push({
        name: key,
        value: obj[key]
      })
    })
    return attrs
  }

  setAttribute(node, key, value) {
    const attrs = node.attrs = node.attrs || []

    // change the attribute
    for (let i = 0; i < attrs.length; i++) {
      const attr = attrs[i]
      if (attr.name !== key) continue
      attr.value = value
      return node
    }

    // add the attribute
    attrs.push({
      name: key,
      value: value
    })
    return node
  }

  getAttribute(node, key) {
    const attrs = node.attrs || []
    for (let i = 0; i < attrs.length; i++) {
      const attr = attrs[i]
      if (attr.name === key) return attr.value
    }
  }

  removeAttribute(node, key) {
    const attrs = node.attrs || []
    node.attrs = (node.attrs || []).filter(attr => attr.name !== key)
  }

  createNode(tagName) {
    return {
      nodeName: tagName,
      tagName: tagName,
      attrs: [],
      namespaceURI: namespaceURI,
      childNodes: []
    }
  }

  createTextNode(text) {
    return {
      nodeName: '#text',
      value: text
    }
  }

  prepend(parent, node) {
    node.parentNode = parent
    parent.childNodes.unshift(node)
    return node
  }

  append(parent, node) {
    node.parentNode = parent
    parent.childNodes.push(node)
    return node
  }

  replace(original, node) {
    const children = original.parentNode.childNodes
    const index = children.indexOf(original)
    if (!~index) return
    node.parentNode = original.parentNode
    children.splice(index, 1, node)
    return node
  }

  remove(node) {
    const children = node.parentNode.childNodes
    const index = children.indexOf(node)
    if (~index) children.splice(index, 1)
    return node
  }

  textOf(node) {
    const childNodes = node.childNodes
    if (!childNodes.length) return ''
    assert.equal(childNodes.length, 1, 'wtf')
    const child = childNodes[0]
    assert.equal(child.nodeName, '#text')
    return child.value || ''
  }

  setText(node, text) {
    node.childNodes = []
    this.append(node, this.createTextNode(text || ''))
    return node
  }

  isDocument(string) {
    return /^\s*<(!doctype|html|head|body)\b/i.test(string)
  }

  flatten(node, arr) {
    arr = arr || []

    const children = Array.isArray(node)
      ? node
      : node.childNodes

    if (!children) return arr

    for (const child of children) {
      arr.push(child)
      flatten(child, arr)
    }

    return arr
  }
}