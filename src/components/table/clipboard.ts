
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
            console.log(data)
            data = data.split('\n')
            data = data.map((item: string) => {
                return item.split(/\s+/)
            })

            this.pasteData = data
            console.log(this.pasteData)
        })
    }
}

export default new clipboard()