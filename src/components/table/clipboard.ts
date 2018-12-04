
class clipboard {
    /**
     * 复制的内容
     */
    private pasteData: Array<Array<string>>

    bindClipEvent(dom: HTMLElement) {
        dom.addEventListener('paste', (event: any) => {
            let data = event.clipboardData.getData('text')
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