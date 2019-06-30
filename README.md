# mithril-feather-icons

Use [feather icons] as [mithril] components.

[feather icons]: https://feathericons.com/
[mithril]: https://mithril.js.org/

## Building Locally

To build the icon components yourself, check out the repository and execute the `build` task:
```bash
$ git clone https://github.com/jessebraham/mithril-feather-icons.git
$ cd mithril-feather-icons
$ npm i && npm run build
```

## Usage

To use icons in a mithril project, import the icon(s) of your choice and simply drop them in as regular components.

```javascript
// Import all icons, namespaced under `icons`
import * as icons from "mithril-feather-icons";
const ex1 = {
    view: vnode => return m("", icons.Alert)
}

// ... or just import what you want to use
import { Zap } from "mithril-feather-icons";
const ex2 = {
    view: vnode => return m("", [Zap, Zap, Zap])
}
```
