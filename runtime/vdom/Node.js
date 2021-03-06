/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { uniqueId } from '../shared/utils'
import { getDoc } from './operation'

export default class Node {
  constructor () {
    this.nodeId = uniqueId()
    this.ref = this.nodeId
    this.children = []
    this.pureChildren = []
    this.parentNode = null
    this.nextSibling = null
    this.previousSibling = null
  }

  /**
  * Destroy current node, and remove itself form nodeMap.
  */
  destroy () {
    const doc = getDoc(this.docId)
    if (doc) {
      delete this.docId
      delete this.ownerDocument
      delete doc.nodeMap[this.nodeId]
    }

    // node props
    delete this.nodeId
    delete this.ref
    delete this.parentNode
    delete this.nextSibling
    delete this.previousSibling

    // element props
    delete this.nodeType
    delete this.type
    delete this.attr
    delete this.style
    delete this.classStyle
    delete this.event
    delete this.depth

    // child nodes
    try {
      this.children.forEach(child => {
        child.destroy()
      })
    }
    catch (e) {}
    delete this.children
    delete this.pureChildren
  }
}
