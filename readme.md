# action-uptodater

Opinionated Action that validates the repository content's boilerplate code in the way I like to handle my NodeJS projects.

:warning: Usage in production projects is not recommended yet. Feel free to use this action for inspiration and experimenting.

### Inputs

Name|Default|Description
---|---|---
`token`||GitHub token
`fix`|`false`|If `true`, automatically tries to fix some files and commit them to a pull request
`approve`|`false`|If `true`, pull requests created by this action are automatically approved and merged
`commitMessagePrefix`|`"autofix: "`|Prefix used in messages for automatically generated commits