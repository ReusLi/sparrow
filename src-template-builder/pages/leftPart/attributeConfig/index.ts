/**
 * 属性配置文件, 通过这个文件可方便地添加每一行可配置的属性
 * 
 * @param attributeName 属性名(英文)
 * 
 * @param option 可选项
 * 
 * @param defaultValue 默认值
 */

export default [
    {
        attributeName: 'dataType',
        option: [
            'string',
            'number',
            'date'
        ],
        defaultValue: 'string'
    }
]