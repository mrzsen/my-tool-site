#!/usr/bin/env python3
import os, re, sys

tools_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "src/app/tools")

section_marker = "Content section"
insert_pattern = re.compile(r'\n( *)\)\s*;\s*\n\}\s*\Z', re.DOTALL)

for d in sorted(os.listdir(tools_dir)):
    path = os.path.join(tools_dir, d, "page.tsx")
    if not os.path.exists(path):
        continue
    
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if section_marker in content:
        print(f"SKIP {d}: already has content")
        continue
    
    with open(f"{path}.example", 'r', encoding='utf-8') as f:
        example_path = path
    
    m = insert_pattern.search(content)
    if not m:
        print(f"FAIL {d}: no end pattern")
        continue
    
    # Find last </div> before the match start
    before = content[:m.start()]
    last_div = before.rfind('</div>')
    if last_div < 0:
        print(f"FAIL {d}: no </div> found")
        continue
    
    # Get tool-specific content or generic
    print(f"OK   {d}: pattern found at {m.start()}, inserting before </div> at {last_div}")
