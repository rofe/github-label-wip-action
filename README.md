# Github WIP Label Action

This action blocks a PR if contains a specified label.

## Inputs

### `label`

**Required** The labels to block

### `repo-token`

**Required** A github token to issue the dummy commit.

## Example usage

```
on:
  pull_request:
    types: [opened, labeled, unlabeled, synchronize, reopened]
    branches-ignore:
      - master

jobs:
  block_label:
    runs-on: ubuntu-latest
    name: Check for label
    steps:
      - name: Trigger
        id: trigger
        uses: adobe-rnd/github-label-wip-action@master
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          label: breaking
```

# Development

## build and deploy

```sh-session
$ npm run build
$ git commit -am"...."
$ npm release
```


