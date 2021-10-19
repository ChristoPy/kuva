# Kuva
Aims to be a lighweight and straightforward reactive front-end library.  
Always basic and easy to read.  

# Installation
```shell
npm i kuva
```

# Usage
Your script
```js
import Kuva from 'kuva';

const app = Kuva({
  name: 'John',
  lastName: 'Snow',
  fullName () {
    return `${this.name} ${this.lastName}`
  },
  canShowFullName: false
})

setTimeout(() => app.canShowFullName = true)

```
Your HTML
```html
<p k-text="name"></p>
<p k-text="lastName"></p>
<p k-if="canShowFullName" k-text="fullName"></p>
```

# Directives
Every Kuva directive, starts with a k- prefix.  
The available ones are:

* k-text:  
  Shows the text of the received reference.
* k-if:  
  Shows the element if the received value is reference.
* k-model:
  Adds two way data binding to an input with the received reference.

# Docs
Soon

# Version
0.0.1, not stable nor production ready, use with caution
