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