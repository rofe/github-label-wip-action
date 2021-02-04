# Github WIP Label Action

This action blocks a PR if contains a specified label. You can specify an optional allowed base ref where the PR will not be blocked.

## Inputs

### `label`

**Required** The label to block

## Example usage

add a file: `.github/workflows/wip.yaml`
```yaml
on:
  pull_request:
    types: [opened, synchronize, reopened, labeled, unlabeled]

jobs:
  block_label:
    runs-on: ubuntu-latest
    name: Check for 'breaking' label
    steps:
      - uses: adobe-rnd/github-label-wip-action@master
        with:
          label: breaking
```
with allowed base ref:
```yaml
on:
  pull_request:
    types: [opened, synchronize, reopened, labeled, unlabeled]

jobs:
  block_label:
    runs-on: ubuntu-latest
    name: Check for 'breaking' label
    steps:
      - uses: adobe-rnd/github-label-wip-action@master
        with:
          label: breaking
          allowed_base: breaking-.*
```

# Development

## build and deploy

```sh-session
$ npm run build
$ git commit -am"...."
$ npm release
```


