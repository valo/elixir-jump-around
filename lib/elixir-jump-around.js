'use babel';

import { CompositeDisposable } from 'atom';
const path = require('path');
const fs = require('fs');

export default {

  subscriptions: null,

  // Should change these to workspace settings
  folders: {
    lib: "lib",
    test: "test/lib",
  },

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add("atom-text-editor[data-grammar='source elixir']", {
      'elixir-jump-around:toggle-test-file': () => this.toggle_test_file()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },






  toggle_test_file() {
    const currentFilePath = atom.workspace.getActiveTextEditor().getPath();
    const opts = {searchAllPanes: true}
    if (this.isTestFilePath(currentFilePath)) {
      return atom.workspace.open(this.getModulePath(currentFilePath), opts);
    } else {
      return atom.workspace.open(this.getTestPath(currentFilePath), opts)
        .then(editor => {
          if(editor.isEmpty()) {
            return editor.setText(this.template(currentFilePath))
          }
          return editor
        })
    }
  },

  isTestFilePath(filePath) {
    return atom.project.getPaths().find((rootPath) => {
      const relativePath = path.relative(rootPath, filePath);
      return relativePath.match(/test\/.+_test\.exs$/);
    });
  },

  getModulePath(filePath) {
    return filePath.replace(this.folders.test, this.folders.lib).replace(/_test\.exs$/, ".ex");
  },

  getTestPath(filePath) {``
    return filePath.replace(this.folders.lib, this.folders.test).replace(/\.ex$/, "_test.exs");
  },

  getModuleName(filePath) {
    const contents = fs.readFileSync(filePath, 'utf8');
    const matches = contents.match(/defmodule\s+(.+)\s+do\s/)
    return matches[0]
  },

  template(currentFilePath) {
    const moduleFilePath = this.getModulePath(currentFilePath);
    const module = getModuleName(moduleFilePath)
    const relativePath = path.relative(rootPath, filePath);
    return `defmodule ${module}Test do\n  describe ".method/0" do\n    test "with valid params" do\n      raise "Not Implemented"\n    end\n  end\nend\n`
  }
};
