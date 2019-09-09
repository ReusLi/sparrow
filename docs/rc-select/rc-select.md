## noop

```ts
const noop = () => null;

onChange，onFocus， onBlur等事件初始化会赋值noop



```

#### 生命周期
1. componentDidMount 会初始化控件的uuid, 有 autoFocus 或 open时, 会focus
2. componentDidUpdate 如果是多选(isMultipleOrTags), 
