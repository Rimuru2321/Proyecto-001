import json

with open("data/astronomy-events.json", "r", encoding="utf-8") as f:
    data = json.load(f)

js_content = "const astronomyEventsData = " + json.dumps(data, indent=2, ensure_ascii=False) + ";"

with open("data/astronomy-events.js", "w", encoding="utf-8") as f:
    f.write(js_content)
print("Saved data/astronomy-events.js")
