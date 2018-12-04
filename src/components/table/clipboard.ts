
class clipboard {
    bindClipEvent(dom: HTMLElement) {
        dom.addEventListener('paste', (event: any) => {
            console.log(event)
            let items = event.clipboardData && event.clipboardData.items;
            debugger
        })
    }
}

export default new clipboard()