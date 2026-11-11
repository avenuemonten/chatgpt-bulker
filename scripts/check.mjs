import { readFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';

const manifest = JSON.parse(readFileSync('manifest.json', 'utf8'));
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
assert.equal(manifest.name, 'ChatGPT Bulker');
assert.equal(manifest.version, pkg.version);
assert.equal(pkg.license, 'MIT');
assert.equal(manifest.author, 'avenue');
assert.equal(manifest.action.default_popup, 'popup/popup.html');
assert.deepEqual(manifest.permissions, ['storage']);
assert.ok(!manifest.host_permissions && !manifest.update_url);
if (process.env.RELEASE_TAG) assert.equal(process.env.RELEASE_TAG, `v${pkg.version}`);
for (const file of ['src/content.js', 'src/background.js', 'src/pageBridge.js', 'popup/popup.js']) {
  assert.equal(spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' }).status, 0, file);
}
for (const file of ['popup/popup.html', 'popup/popup.css', 'LICENSE', 'NOTICE']) assert.ok(existsSync(file), file);
const html = readFileSync('popup/popup.html', 'utf8');
assert.ok(!/free-badge|Сделано с|Made with|❤️/.test(html));
for (const file of ['src/content.js', 'src/background.js']) {
  const source = readFileSync(file, 'utf8');
  assert.ok(!/\bfetch\s*\(/.test(source), `${file}: unexpected direct network request`);
}
console.log(`ChatGPT Bulker v${pkg.version}: checks passed`);
