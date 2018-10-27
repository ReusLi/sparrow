'use strict'

const assert = require('assert')
const parse5 = require('parse5')

const namespaceURI = 'http://www.w3.org/1999/xhtml'

/**
* 描述: parse5 工具类
*/
class Util {

  constructor() {

  }

  /**
   * 
   * @param {*} string 
   * @param {*} smart 
   * 
   * @return {array} 
   */
  parse(string, smart) {
    if (smart && !this.isDocument(string)) return this.parseFragment(string)
    return parse5.parse(string)
  }

  /**
   * 
   * @param {*} string 
   */
  parseFragment(string) {
    return parse5.parseFragment(string)
  }

  /**
   * 
   * @param {*} node 
   */
  serialize(node) {
    return parse5.serialize(node)
  }

  /**
   * 
   * @param {*} node 
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

  /**
   * 是否包含某个属性
   * @param {*} node 
   * @param {*} attrName 
   * 
   * @return {boolean}
   */
  hasAttribute(node, attrName) {
    const attrs = this.attributesOf(node);
    return attrs.some(attr => attr === attrName);
  }

  /**
   * 
   * @param {*} obj 
   */
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

  /**
   * 
   * @param {*} node 
   * @param {*} key 
   * @param {*} value 
   */
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

  /**
   * 
   * @param {object} node 
   * @param {string} key 
   * 
   * @return {string}
   */
  getAttribute(node, key) {
    const attrs = node.attrs || []
    for (let i = 0; i < attrs.length; i++) {
      const attr = attrs[i]
      if (attr.name === key) return attr.value
    }
  }

  /**
   * 
   * @param {array} attrs 
   * @param {string} key 
   * 
   * @return {string}
   */
  getAttributeByAttrs(attrs, key) {
    for (let i = 0; i < attrs.length; i++) {
      const attr = attrs[i]
      if (attr.name === key) return attr.value
    }
  }

  /**
   * 
   * @param {*} node 
   * @param {*} key 
   */
  removeAttribute(node, key) {
    node.attrs = (node.attrs || []).filter(attr => attr.name !== key)
  }

  /**
   * 
   * @param {*} tagName 
   */
  createNode(tagName) {
    return {
      nodeName: tagName,
      tagName: tagName,
      attrs: [],
      namespaceURI: namespaceURI,
      childNodes: []
    }
  }

  /**
   * 
   * @param {*} text 
   */
  createTextNode(text) {
    return {
      nodeName: '#text',
      value: text
    }
  }

  /**
   * 
   * @param {*} parent 
   * @param {*} node 
   */
  prepend(parent, node) {
    node.parentNode = parent
    parent.childNodes.unshift(node)
    return node
  }

  /**
   * 
   * @param {*} parent 
   * @param {*} node 
   */
  append(parent, node) {
    node.parentNode = parent
    parent.childNodes.push(node)
    return node
  }

  /**
   * 
   * @param {*} original 
   * @param {*} node 
   */
  replace(original, node) {
    const children = original.parentNode.childNodes
    const index = children.indexOf(original)
    if (!~index) return
    node.parentNode = original.parentNode
    children.splice(index, 1, node)
    return node
  }

  /**
   * 
   * @param {*} node 
   */
  remove(node) {
    const children = node.parentNode.childNodes
    const index = children.indexOf(node)
    if (~index) children.splice(index, 1)
    return node
  }

  /**
   * 
   * @param {*} node 
   */
  textOf(node) {
    const childNodes = node.childNodes
    if (!childNodes.length) return ''
    assert.equal(childNodes.length, 1, 'wtf')
    const child = childNodes[0]
    assert.equal(child.nodeName, '#text')
    return child.value || ''
  }

  /**
   * 
   * @param {*} node 
   * @param {*} text 
   */
  setText(node, text) {
    node.childNodes = []
    this.append(node, this.createTextNode(text || ''))
    return node
  }

  /**
   * 
   * @param {*} string 
   */
  isDocument(string) {
    return /^\s*<(!doctype|html|head|body)\b/i.test(string)
  }

  /**
   * 将节点下的子节点组成一维数组返回
   * 
   * @param {object} node 
   * @param {array || undefined} arr 
   * 
   * @return {array}
   */
  flatten(node, arr) {
    arr = arr || []
    this.mapNode(node, (child) => {
      arr.push(child)
    })
    return arr
  }

  /**
   * 根据标签名找所有匹配的集合
   * @param {object} node 
   * @param {string} TAGNAME 标签名
   * @param {array || undefined} arr 
   * 
   * @return {array} node
   */
  findByTagName(node, TAGNAME, arr) {
    arr = arr || []
    this.mapNode(node, (child) => {
      if (child.tagName === TAGNAME)
        arr.push(child)
    })
    return arr
  }

  /**
   * 遍历节点
   * 每个节点会传入回调
   * 
   * @param {object} node 
   * @param {funtion} callback 
   */
  mapNode(node, callback) {
    const children = Array.isArray(node)
      ? node
      : node.childNodes

    if (!children) return;

    for (const child of children) {
      callback(child)
      this.mapNode(child, callback)
    }
  }
}