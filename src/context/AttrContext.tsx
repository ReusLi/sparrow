import * as React from 'react'

/** 
 * onDataTypeChange来自App.tsx
 * 
 * 当子组件属性数据变动时, 调用 onDataTypeChange 方法
 * 
 * 更新App.tsx里的关于 editor 的数据
 */
export let AttrContext = React.createContext({
    onDataTypeChange: () => { },
});