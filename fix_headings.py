import os
import re

directory = r'c:\Users\Usuario\Desktop\Resumos da faculdade'

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.html') or file.endswith('.py'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace h4 with h3
            content = re.sub(r'<h3\b', '<h3', content)
            content = re.sub(r'</h3>', '</h3>', content)
            
            # Replace h5 with h4
            content = re.sub(r'<h4\b', '<h3', content)
            content = re.sub(r'</h4>', '</h3>', content)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
