# action-node-boilerplate

Opinionated Action that validates the repository content's boilerplate code in the way I like to handle my NodeJS projects.

### Inputs

Name|Default|Description
---|---|---
`token`||GitHub token
`push`|false|If `true`, automatically tries to fix some files and commit them to a pull request
`approve`|false|If `true`, pull requests created by this action are automatically approved and merged
`useEmojis`|false|If `true`, use emojis in commit messages