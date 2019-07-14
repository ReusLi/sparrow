class MapUtils {
    constructor() {

    }

    /**
     * map node with deep
     * 深度优先遍历
     * @param node html dom node
     */
    mapNode (node: Element) {
        let nodeLists = node.querySelectorAll('[data-candrop="rect"]')
        nodeLists.forEach(node => {
            debugger
        })
    }
}

export default new MapUtils()