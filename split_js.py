import re

with open('js/script.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if line.startswith('// ===') or line.startswith('// =========='):
        print(f"Line {i}: {line.strip()}")
