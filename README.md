# vscode-extensions

Monorepo for dndd's VS Code extensions, published under the `dndd`
Marketplace publisher.

```
packages/
  open-in-obsidian/   # opens the current Markdown file in Obsidian
```

## Development

```bash
pnpm install
cd packages/<extension-name>
pnpm package   # builds a local .vsix
```

## Releasing

Push a tag `<extension-name>@<version>` (e.g. `open-in-obsidian@0.0.2`) to
`main`. The `publish` GitHub Actions workflow packages and publishes that
extension to the Marketplace using the `VSCE_PAT` repo secret.
