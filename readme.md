# action-uptodater


<a href="https://raw.githubusercontent.com/jaid/action-uptodater/master/license.txt"><img src="https://img.shields.io/github/license/jaid/action-uptodater?style=flat-square" alt="License"/></a> <a href="https://github.com/sponsors/jaid"><img src="https://img.shields.io/badge/<3-Sponsor-FF45F1?style=flat-square" alt="Sponsor action-uptodater"/></a>  
<a href="https://actions-badge.atrox.dev/jaid/action-uptodater/goto"><img src="https://img.shields.io/endpoint.svg?style=flat-square&url=https%3A%2F%2Factions-badge.atrox.dev%2Fjaid%2Faction-uptodater%2Fbadge" alt="Build status"/></a> <a href="https://github.com/jaid/action-uptodater/commits"><img src="https://img.shields.io/github/commits-since/jaid/action-uptodater/v2.3.0?style=flat-square&logo=github" alt="Commits since v2.3.0"/></a> <a href="https://github.com/jaid/action-uptodater/commits"><img src="https://img.shields.io/github/last-commit/jaid/action-uptodater?style=flat-square&logo=github" alt="Last commit"/></a> <a href="https://github.com/jaid/action-uptodater/issues"><img src="https://img.shields.io/github/issues/jaid/action-uptodater?style=flat-square&logo=github" alt="Issues"/></a>  

**GitHub Action that ensures my Node projects use an up-to-date boilerplate setup.**

#### Opinionated

This project is tailored to my personal needs and workflows and therefore highly opinionated. Feel free to use it or get inspired by it, but please do not get frustrated if you come across weird features or have difficulties integrating it in your own ecosystem.














## Options



<table>
<tr>
<th></th>
<th></th>
<th>Default</th>
<th>Info</th>
</tr>
<tr>
<td>approve</td>
<td>*</td>
<td></td>
<td>If true, pull requests created by this action are automatically approved and merged</td>
</tr>
<tr>
<td>commitMessagePrefix</td>
<td>*</td>
<td>autofix:</td>
<td>Prefix string used in messages for automatically generated commits</td>
</tr>
<tr>
<td>fix</td>
<td>*</td>
<td></td>
<td>If true, automatically tries to fix some files and commit them to a pull request</td>
</tr>
<tr>
<td>removeBranch</td>
<td>*</td>
<td>true</td>
<td>If true, automatically merged pull requests will delete their branch afterwards</td>
</tr>
<tr>
<td>token</td>
<td>*</td>
<td></td>
<td>Repository token for allowing the action to make commits.</td>
</tr>
</table>











## Development



Setting up:
```bash
git clone git@github.com:jaid/action-uptodater.git
cd action-uptodater
npm install
```


## License
[MIT License](https://raw.githubusercontent.com/jaid/action-uptodater/master/license.txt)  
Copyright © 2020, Jaid \<jaid.jsx@gmail.com> (https://github.com/jaid)
