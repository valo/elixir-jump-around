# elixir-jump-around package

A plugin which allows to jump between the module and its tests in a mix project. By default the keybinding for the toggle is with `Alt-g Alt-t` (mnemonic for "Goto Test").

If you want to change the default shortcut you can open `Atom -> Keymap` and enter the following:

```js
'atom-text-editor[data-grammar="source elixir"]':
  "alt-g alt-b": "elixir-jump-around:toggle-test-file"
```

This is going to change the shortcut to be `Alt-g Alt-b`
