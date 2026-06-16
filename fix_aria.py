import os

directory = r'c:\Users\Usuario\Desktop\Resumos da faculdade'
for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            if 'id="themeToggle"' in content and 'aria-label=' not in content:
                content = content.replace('id="themeToggle"', 'id="themeToggle" aria-label="Toggle dark/light mode"')
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
