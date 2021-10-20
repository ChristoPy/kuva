# Kuva
Aims to be a lightweight and straightforward reactive front-end library.  
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
  canShowLastName: false
})
```
Your HTML
```html
<label for="name-input">What is your name?</label>
<input k-bind="name" name="name-input"/>

<div>your name is:
  <b k-text="name"></b>
</div>

<p k-if="canShowLastName">This node doesn't exists</p>
<p k-hide="canShowLastName">This node is hidden</p>
```

# Directives
Every Kuva directive, starts with a k- prefix.  
The available ones are:

* **k-text**:  
  Shows the value of the received reference in the element's text.
* **k-if**:  
  Removes the element if received reference is falsy. Add if truthy.
* **k-hide**:  
  Hides the element if received reference is falsy. Shows if truthy.
* **k-bind**:  
  Adds two way data binding to an input with the received reference.

# Docs
Soon

# Version
0.0.2, not stable nor production ready, use with caution
