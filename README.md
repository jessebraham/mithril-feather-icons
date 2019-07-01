# mithril-feather-icons

Use [feather icons] as [mithril] components. Uses mithril's `v2` API.

[feather icons]: https://feathericons.com/
[mithril]: https://mithril.js.org/

## Usage

*mithril-feather-icons* can be installed using [npm] or [yarn]:

```bash
$ npm install mithril-feather-icons  
$ yarn add mithril-feather-icons
```

To use these icons in a project, import the icon(s) of your choice and simply drop them in as regular components.

```javascript
import m from "mithril";

// Import all icons, namespaced under `icons`
import * as icons from "mithril-feather-icons";
class AddUserButton {
    view(vnode) {
        return m("button", { class: "btn" }, [
            "Add user",
            icons.UserPlus,
        ]);
    }
}

// ... or just import what you want to use
import { Zap } from "mithril-feather-icons";
class Example {
    view(vnode) {
        return m(".container", [Zap, Zap, Zap]);
    }
}
```

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/en/

## Building Locally

To build the icon components yourself, check out the repository and execute the `build` script:
```bash
$ git clone https://github.com/jessebraham/mithril-feather-icons.git
$ cd mithril-feather-icons
$ npm i && npm run build
```

## License

*mithril-feather-icons* is licensed under the [MIT License].

[MIT License]: LICENSE
