"""Build an unpackable Chrome extension ZIP without development artifacts."""
from pathlib import Path
import json
import zipfile

root = Path(__file__).resolve().parents[1]
version = json.loads((root / "manifest.json").read_text())["version"]
destination = root / "dist" / f"chatgpt-bulker-{version}.zip"
destination.parent.mkdir(exist_ok=True)
entries = [root / item for item in ["manifest.json", "styles", "README.txt", "LICENSE", "NOTICE", "_locales", "icons", "src", "popup"]]
with zipfile.ZipFile(destination, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
    for entry in entries:
        for file in sorted(entry.rglob("*")) if entry.is_dir() else [entry]:
            if file.is_file():
                archive.write(file, str(file.relative_to(root)))
with zipfile.ZipFile(destination) as archive:
    assert archive.testzip() is None
    assert "manifest.json" in archive.namelist()
    assert "popup/popup.html" in archive.namelist()
print(destination)
