'use babel';

import ElixirJumpAround from '../lib/elixir-jump-around';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

const path = require('path');
const fs = require('fs');
const PROJECT_ROOT = fs.mkdtempSync("/tmp/elixir-jump-around-");

describe('ElixirJumpAround', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    atom.project.setPaths([PROJECT_ROOT])

    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('elixir-jump-around');
  });

  describe('isTestFilePath', () => {
    it('returns if the file is a test or not', () => {
      expect(ElixirJumpAround.isTestFilePath(path.join(PROJECT_ROOT, "/lib/foo.ex"))).toBeFalsy();
      expect(ElixirJumpAround.isTestFilePath(path.join(PROJECT_ROOT, "/lib/foo.ex"))).toBeFalsy();
      expect(ElixirJumpAround.isTestFilePath(path.join(PROJECT_ROOT, "/test/foo_test.exs"))).toBeTruthy();
    });
  });

  describe('getModulePath', () => {
    it('returns the correct module path of a test file', () => {
      expect(ElixirJumpAround.getModulePath(path.join(PROJECT_ROOT, "/test/foo_test.exs"))).toEqual(path.join(PROJECT_ROOT, "/lib/foo.ex"));
    });
  });

  describe('getTestPath', () => {
    it('returns the correct test path of a test file', () => {
      expect(ElixirJumpAround.getTestPath(path.join(PROJECT_ROOT, "/lib/foo.ex"))).toEqual(path.join(PROJECT_ROOT, "/test/foo_test.exs"));
    });
  });
});
