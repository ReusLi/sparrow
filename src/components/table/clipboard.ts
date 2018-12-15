class clipboard {
    /**
     * 复制的内容
     */
    private pasteData: Array<Array<string>>

    /**
     * 监听ctrl + v事件
     * @param dom 需要监听paste事件的dom
     */
    bindClipEvent(dom: HTMLElement) {
        dom.addEventListener('paste', (event: any) => {
            let data = event.clipboardData.getData('text')
            data = data.split('\n')
            data = data.map((item: string) => {
                return item.split(/\s+/)
            })

            this.pasteData = this.filterPasteData(data)

            console.log(this.pasteData)
        })
    }

    /**
     * 过滤paste操作后的数据
     * 因为paste后正则得出的数据并不是规则的 n*n 数组
     * 规则: 
     * 1. 如果pasteData最后一个是一个 [""] 的数组, 把它删掉
     * 2. 如果剩下的数组长度都一样, 且每个数组最后一个元素都是'', 则统一 pop() 一位
     * 3. 如果剩下的数组长度不一, 把最长的数组 pop() 一位
     * 
     * @param pasteData 
     * 
     * @return 一个规则的 n*n 数组 代表paste数据
     */
    filterPasteData(pasteData: Array<Array<string>>) {
        const lastElement = pasteData.pop()

        // 规则1.
        if (lastElement.length === 1 && lastElement[0] === '') {
            // nothing
        } else {
            pasteData.push(lastElement)
        }

        // n*n 数组的第一个元素长度
        const firstElementLen = pasteData[0].length
        // 是不是每一个数组的length都相等
        const isEveryLenEqual = pasteData.every(element => element.length === firstElementLen)

        // 规则2.
        if (isEveryLenEqual) {
            // 每个数组最后一个元素都是'', 则统一 pop() 一位
            const lastElementIsEmptyStr = pasteData.every(element => {
                return element[firstElementLen] === ''
            })
            if (lastElementIsEmptyStr) {
                pasteData = pasteData.map(element => {
                    element.pop()
                    return element
                })
            }
        }
        // 规则3.
        else {
            let maxLenIndex = -1,
                targetIndex = 0;
            pasteData.map((element, index) => {
                if (element.length > maxLenIndex) {
                    maxLenIndex = element.length
                    targetIndex = index
                }
            })

            pasteData[targetIndex].pop()
        }

        return pasteData
    }
}

export default new clipboard()