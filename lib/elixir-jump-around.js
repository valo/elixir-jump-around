'use babel';

import { CompositeDisposable } from 'atom';
const path = require('path');

export default {

  subscriptions: null,

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
    currentFilePath = atom.workspace.getActiveTextEditor().getPath();
    opts = {searchAllPanes: true}
    if (this.isTestFilePath(currentFilePath)) {
      return atom.workspace.open(this.getModulePath(currentFilePath), opts);
    } else {
      return atom.workspace.open(this.getTestPath(currentFilePath), opts);
    }
  },

  isTestFilePath(filePath) {
    return atom.project.getPaths().find((rootPath) => {
      relativePath = path.relative(rootPath, filePath);
      return relativePath.match(/test\/.+_test\.exs$/);
    });
  },

  getModulePath(filePath) {
    return filePath.replace("test", "lib").replace(/_test\.exs$/, ".ex");
  },

  getTestPath(filePath) {
    return filePath.replace("lib", "test").replace(/\.ex$/, "_test.exs");
  }
};
