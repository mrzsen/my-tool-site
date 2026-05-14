import subprocess, os

repo = r"G:\ZSEN\shop\my-tool-site"

# 恢复所有 page.tsx 到最初状态 (commit 9fedfc4)
result = subprocess.run(["git", "log", "--oneline", "-5"], capture_output=True, text=True, cwd=repo)
print("Recent commits:")
print(result.stdout)

# 恢复所有 page.tsx 文件
pages = []
for root, dirs, files in os.walk(os.path.join(repo, "src", "app")):
    for f in files:
        if f == "page.tsx":
            pages.append(os.path.join(root, f))

# git checkout 9fedfc4 -- file
for p in pages:
    rel = os.path.relpath(p, repo)
    subprocess.run(["git", "checkout", "9fedfc4", "--", rel], capture_output=True, cwd=repo)
    print(f"restored {rel}")

# 检查状态
result = subprocess.run(["git", "status", "--short"], capture_output=True, text=True, cwd=repo)
print("\nCurrent status:")
print(result.stdout)