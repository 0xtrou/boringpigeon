import os
from openai import OpenAI

# The newest OpenAI model is "gpt-4o" which was released May 13, 2024.
# do not change this unless explicitly requested by the user
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def generate_donation_response(donation_amount, pet_stats):
    """Generate a contextual response for a donation based on the amount and pet's current state."""
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": "You are a cute virtual pet pigeon assistant. Generate a heartfelt thank you message for a donation. Keep responses short (max 2 sentences), cute, and playful. Include references to the pet's current state and the donation amount."
                },
                {
                    "role": "user",
                    "content": f"Generate a thank you message for a donation of ${donation_amount}. The pet's current stats are: Hunger: {pet_stats['hunger']}, Energy: {pet_stats['energy']}, Happiness: {pet_stats['happiness']}."
                }
            ],
            max_tokens=100,
            temperature=0.7
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error generating donation response: {e}")
        return f"Thank you for your generous donation of ${donation_amount}! *happy coo*"
