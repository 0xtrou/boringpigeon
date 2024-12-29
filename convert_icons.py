import os
from subprocess import run

# Conversion configurations
icons = [
    {
        'input': 'static/icons/social-preview.svg',
        'output': 'static/icons/social-preview.png',
        'size': '1200x630'
    },
    {
        'input': 'static/icons/twitter-card.svg',
        'output': 'static/icons/twitter-card.png',
        'size': '800x418'
    },
    {
        'input': 'static/icons/favicon.svg',
        'output': 'static/icons/favicon-32x32.png',
        'size': '32x32'
    },
    {
        'input': 'static/icons/favicon.svg',
        'output': 'static/icons/favicon-16x16.png',
        'size': '16x16'
    }
]

# Convert each icon
for icon in icons:
    command = [
        'convert',
        icon['input'],
        '-resize', icon['size'],
        icon['output']
    ]
    run(command)
    print(f"Converted {icon['input']} to {icon['output']}")
