[**Partial**](https://juejin.im/entry/5b55a152e51d4519503b3e77)

把传入的值变成 `?:` 的形式, 如: 
```ts
interface Foo {
  name: string;
  age: number
}

Partial<IOptGroupProps> 后变成:

interface Foo {
  name?: string;
  age?: number
}
```


```js
function f(a, b, c, d, e) { 
  // a = -1
  // b = 0
  // c = 1
  // d = 2
  // e = 3
}
var args = [0, 1];
f(-1, ...args, 2, ...[3]);
```