import re

with open("python_run_info.md", "r") as file:
    content = file.read()

    pattern = r"cp([0-9]+)-.*"
    matches = sorted(set(re.findall(pattern, content)))
    # puts a '.' after the first character: '310' => '3.10'
    result = [word[0] + '.' + word[1:] if len(word) > 1 else word + '.' for word in matches]
    print(result)