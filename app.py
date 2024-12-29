import os
import logging
from logging.handlers import RotatingFileHandler
from flask import Flask, render_template, jsonify, request
from openai_service import generate_donation_response

# Setup enhanced logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
)
logger = logging.getLogger(__name__)

# Add file handler to maintain logs
if not os.path.exists('logs'):
    os.mkdir('logs')
file_handler = RotatingFileHandler('logs/virtual_pet.log',
                                   maxBytes=10240,
                                   backupCount=10)
file_handler.setFormatter(
    logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
file_handler.setLevel(logging.INFO)
logger.addHandler(file_handler)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("FLASK_SECRET_KEY") or "virtual-pet-secret-key"


@app.route('/')
def index():
    try:
        logger.debug("Rendering index page")
        return render_template('index.html')
    except Exception as e:
        logger.error(f"Error rendering index page: {str(e)}", exc_info=True)
        return jsonify({"error": "Internal server error"}), 500


@app.route('/api/generate-donation-response', methods=['POST'])
def get_donation_response():
    try:
        data = request.get_json()
        donation_amount = data.get('amount')
        message = data.get('message')
        from_address = data.get('from_address')
        pet_stats = data.get('stats')

        if not donation_amount or not pet_stats:
            return jsonify({"error": "Missing required parameters"}), 400

        response = generate_donation_response(donation_amount, pet_stats,
                                              message, from_address)
        return jsonify({"response": response})
    except Exception as e:
        logger.error(f"Error generating donation response: {str(e)}",
                     exc_info=True)
        return jsonify({"error": "Error generating response"}), 500


@app.errorhandler(404)
def not_found_error(error):
    logger.error(f"Page not found: {request.url}")
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_error(error):
    logger.error(f"Server Error: {error}", exc_info=True)
    return render_template('500.html'), 500


if __name__ == '__main__':
    logger.info("Starting Flask server on port 5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
