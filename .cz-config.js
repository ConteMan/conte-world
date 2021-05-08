
'use strict';

module.exports = {

  types: [
    {
      value: ':construction:  WIP',
      name : '🚧  WIP:      Work in progress'
    },
    {
      value: ':sparkles:  feat',
      name : '✨  feat:     A new feature'
    },
    {
      value: ':beetle:  fix',
      name : '🐞  fix:      A bug fix'
    },
    {
      value: ':building_construction:  refactor',
      name : '🏗  refactor: A code change that neither fixes a bug nor adds a feature'
    },
    {
      value: ':books:  docs',
      name : '📚  docs:     Documentation only changes'
    },
    {
      value: ':checkered_flag:  test',
      name : '🏁  test:     Add missing tests or correcting existing tests'
    },
    {
      value: ':wrench:  chore',
      name : '🔧  chore:    Changes that don\'t modify src or test files. Such as updating build tasks, package manager'
    },
    {
      value: ':art:  style',
      name : '🎨  style:    Code Style, Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)'
    },
    {
      value: ':rewind:  revert',
      name : '⏪  revert:   Revert to a commit'
    }
  ],

  scopes: [],

  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"],
  subjectLimit: 100,
};

