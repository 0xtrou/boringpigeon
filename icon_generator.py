from PIL import Image, ImageDraw

def create_pigeon_icon(size):
    # Create a new image with a white background
    image = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(image)

    # Calculate scaling based on size
    scale = size / 512

    # Body color (light gray)
    body_color = "#8B8B8B"
    # Wing color (darker gray)
    wing_color = "#696969"
    # Eye color (black)
    eye_color = "#000000"
    # Beak color (dark orange)
    beak_color = "#FF8C00"

    # Draw body (circle)
    body_radius = int(200 * scale)
    center_x = size // 2
    center_y = size // 2
    draw.ellipse([
        center_x - body_radius,
        center_y - body_radius,
        center_x + body_radius,
        center_y + body_radius
    ], fill=body_color)

    # Draw wing
    wing_points = [
        (center_x - int(100 * scale), center_y),
        (center_x - int(180 * scale), center_y - int(100 * scale)),
        (center_x - int(50 * scale), center_y - int(50 * scale))
    ]
    draw.polygon(wing_points, fill=wing_color)

    # Draw eye
    eye_radius = int(20 * scale)
    eye_x = center_x + int(50 * scale)
    eye_y = center_y - int(50 * scale)
    draw.ellipse([
        eye_x - eye_radius,
        eye_y - eye_radius,
        eye_x + eye_radius,
        eye_y + eye_radius
    ], fill=eye_color)

    # Draw beak
    beak_points = [
        (center_x + int(100 * scale), center_y),
        (center_x + int(150 * scale), center_y),
        (center_x + int(100 * scale), center_y + int(30 * scale))
    ]
    draw.polygon(beak_points, fill=beak_color)

    return image

def create_screenshot(width, height, is_mobile=False):
    # Create a new image with a light background
    background_color = "#f5f5f5"
    image = Image.new('RGB', (width, height), background_color)
    draw = ImageDraw.Draw(image)

    # Add a simple UI layout
    if is_mobile:
        # Mobile layout (vertical)
        header_height = height // 8
        draw.rectangle([(0, 0), (width, header_height)], fill="#8bca4b")  # Header

        # Game area
        game_size = min(width * 0.9, height * 0.4)
        game_x = (width - game_size) // 2
        game_y = header_height + 20
        draw.rectangle(
            [(game_x, game_y), (game_x + game_size, game_y + game_size)],
            fill="#ffffff",
            outline="#dddddd"
        )

        # Add pigeon to game area
        pigeon = create_pigeon_icon(int(game_size * 0.8))
        image.paste(pigeon, (int(game_x + game_size * 0.1), int(game_y + game_size * 0.1)), pigeon)

    else:
        # Desktop layout (horizontal)
        header_height = height // 10
        draw.rectangle([(0, 0), (width, header_height)], fill="#8bca4b")  # Header

        # Game area
        game_size = min(width * 0.6, height * 0.7)
        game_x = (width - game_size) // 2
        game_y = header_height + 20
        draw.rectangle(
            [(game_x, game_y), (game_x + game_size, game_y + game_size)],
            fill="#ffffff",
            outline="#dddddd"
        )

        # Add pigeon to game area
        pigeon = create_pigeon_icon(int(game_size * 0.8))
        image.paste(pigeon, (int(game_x + game_size * 0.1), int(game_y + game_size * 0.1)), pigeon)

    return image

# Generate icons for different sizes
sizes = [16, 32, 192, 512]
for size in sizes:
    icon = create_pigeon_icon(size)
    if size == 16:
        icon.save(f'static/icons/favicon-16x16.png')
    elif size == 32:
        icon.save(f'static/icons/favicon-32x32.png')
    else:
        icon.save(f'static/icons/icon-{size}x{size}.png')

# Generate screenshots for PWA
desktop_screenshot = create_screenshot(1920, 1080, is_mobile=False)
desktop_screenshot.save('static/screenshots/wide.png')

mobile_screenshot = create_screenshot(1080, 1920, is_mobile=True)
mobile_screenshot.save('static/screenshots/narrow.png')