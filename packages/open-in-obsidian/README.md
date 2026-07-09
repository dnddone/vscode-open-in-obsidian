# Open in Obsidian (VS Code extension)

Adds a command, an editor/explorer right-click item, a keyboard shortcut
(`Cmd/Ctrl+Alt+O` on a `.md` file), and a status bar button that opens the
current file in Obsidian, jumping straight to the right note in the right
vault. The status bar button appears at the bottom left whenever a Markdown
file is active.

It works by shelling out to `obsidian://open?path=<absolute file path>`.
Obsidian's `path` parameter searches your known vaults for whichever one
contains that path, so you don't need to hardcode a vault name anywhere.

## Install from the Marketplace

Search for "Open in Obsidian" (publisher `dndd`) in the VS Code Extensions
view, or:

```bash
code --install-extension dndd.open-in-obsidian
```

## Install from source (this repo)

```bash
pnpm install
cd packages/open-in-obsidian
pnpm package
code --install-extension open-in-obsidian-0.0.1.vsix
```

Reload VS Code. The command, context menu items, and keybinding are now
always available in every workspace — no dev host, no per-project setup.

## Notes / things to check on your machine

- First run: Obsidian needs to already know about the vault the file lives
  in (i.e. you've opened that vault at least once before). It finds the
  vault by matching the path, so this should already be true for any note
  you're actively editing.
- Windows paths: the extension swaps backslashes for forward slashes before
  encoding, since Obsidian expects `/`-style paths even on Windows. If path
  matching still fails on your setup, that's the first thing to double check.
- Changing the shortcut: edit the `keybindings` block in `package.json`
  before repackaging, or just rebind `openInObsidian.open` in VS Code's
  Keyboard Shortcuts UI after installing — no need to repackage for that.
- Changing where it shows up: the `when` clauses currently restrict it to
  `.md` files. Adjust `resourceExtname` / `resourceLangId` in `package.json`
  if you want it available more broadly (e.g. also on `.mdx`).
- To update after editing source: bump `version` in `package.json`, tag
  `open-in-obsidian@<version>` and push — CI packages and publishes it.
