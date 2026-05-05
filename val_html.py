import re

def validate_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()
    
    # Check for unclosed < or >
    
    stack = []
    lines = html.split('\n')
    for i, line in enumerate(lines):
        # Very basic check: just see if there's any `<` that isn't closed on the same line, but this is noisy.
        # Let's check specifically for `""` or `</p>` inside attributes
        if '="galaxia-espiral</p>' in line:
            print(f"ERROR: Found broken galaxia-espiral at line {i+1}")
        if 'img src="img/galaxia-eliptica.jpg""' in line:
            print(f"ERROR: Found broken eliptica at line {i+1}")
            
    print("HTML Basic validation complete.")

validate_html()
