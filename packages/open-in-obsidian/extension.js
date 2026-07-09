const vscode = require('vscode');
const { exec } = require('child_process');

function activate(context) {
  const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 9999);
  // Status bar items only support codicons, not custom images. There's no
  // gem/crystal codicon (that was a mistake) — sparkle-filled is the
  // closest faceted shape to Obsidian's logo.
  statusBarItem.text = '$(sparkle-filled)';
  statusBarItem.color = '#7C3AED';
  statusBarItem.tooltip = 'Open in Obsidian';
  statusBarItem.command = 'openInObsidian.open';

  const updateStatusBarVisibility = (editor) => {
    if (editor?.document.languageId === 'markdown') {
      statusBarItem.show();
    } else {
      statusBarItem.hide();
    }
  };

  updateStatusBarVisibility(vscode.window.activeTextEditor);
  context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarVisibility));

  const disposable = vscode.commands.registerCommand('openInObsidian.open', (uri) => {
    const targetUri = uri || vscode.window.activeTextEditor?.document.uri;

    if (!targetUri) {
      vscode.window.showErrorMessage('No file to open in Obsidian.');
      return;
    }

    // Obsidian's `path` parameter takes an absolute filesystem path and
    // figures out which vault it belongs to on its own, so you don't
    // need to hardcode a vault name.
    let filePath = targetUri.fsPath;

    // Obsidian expects forward slashes even on Windows.
    if (process.platform === 'win32') {
      filePath = filePath.replace(/\\/g, '/');
    }

    const encodedPath = encodeURIComponent(filePath);
    const obsidianUri = `obsidian://open?path=${encodedPath}`;

    let cmd;
    switch (process.platform) {
      case 'darwin':
        cmd = `open "${obsidianUri}"`;
        break;
      case 'win32':
        cmd = `start "" "${obsidianUri}"`;
        break;
      default:
        cmd = `xdg-open "${obsidianUri}"`;
    }

    exec(cmd, (err) => {
      if (err) {
        vscode.window.showErrorMessage(`Failed to open Obsidian: ${err.message}`);
      }
    });
  });

  context.subscriptions.push(disposable, statusBarItem);
}

function deactivate() {}

module.exports = { activate, deactivate };
