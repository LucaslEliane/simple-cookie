## 一个简单的Cookie操作模块

该模块实例会绑定到`window.$cookie`对象上。

实现了几个简单的功能：

* `getCookie`: 获取cookie中指定的某个cookie值。

```typescript
function getCookie: (name: string) => string;
```

* `setCookie`: 设置cookie。尽量设置cookie的有效时间，否则cookie将会是在session内有效。

```typescript
function setCookie: (c_name: string, {
  value: string;    // cookie的值
  domain?: string;  // cookie的域名
  path?: string;    // cookie的指定生效路径
  maxAge?: string;  // cookie的最大生命长度
  expires?: string; // cookie的过期时间
}): void
```

* `checkCookie`: 检测当前cookie中是否有参数指定的cookie

```typescript
function checkCookie: (c_name: string) => boolean
```