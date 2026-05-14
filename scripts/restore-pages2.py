import subprocess, os

repo = r"G:\ZSEN\shop\my-tool-site"

# 恢复所有 page.tsx 到 commit 9fedfc4
pages = []
for root, dirs, files in os.walk(os.path.join(repo, "src", "app")):
    for f in files:
        if f == "page.tsx":
            pages.append(os.path.join(root, f))

for p in pages:
    rel = os.path.relpath(p, repo)
    subprocess.run(["git", "checkout", "9fedfc4", "--", rel], capture_output=True, cwd=repo)
    print(f"restored {rel}")

print("\ndone")