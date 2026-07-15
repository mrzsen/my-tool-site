import os
import re

slugs = ['encryption-guide','formatting-best-practices','regex-guide','base64-url-guide']
for slug in slugs:
    fp = os.path.join('src/app/blog', slug, 'page.tsx')
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find prose div content and wrap with dangerouslySetInnerHTML
    pattern = r'<div className="prose prose-lg max-w-none text-gray-700">\s*\n(.*?)\n        </div>'
    
    def repl(m):
        inner = m.group(1)
        escaped = inner.replace("{", "&lbrace;").replace("}", "&rbrace;")
        return '<div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: `' + inner + '` }} />'
    
    new_content = re.sub(pattern, repl, content, flags=re.DOTALL)
    
    with open(fp, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f'Fixed: {slug}')

print('Done')
