import os
import signal
import sys
import logging
import psutil
from app import app

# Setup logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def cleanup_port(port):
    """Clean up any process using the specified port"""
    logger.info(f"Cleaning up port {port}")
    try:
        for proc in psutil.process_iter(['pid', 'name', 'connections']):
            try:
                connections = proc.connections()
                for conn in connections:
                    if conn.laddr.port == port:
                        logger.info(f"Terminating process {proc.pid} using port {port}")
                        proc.terminate()
                        proc.wait(timeout=5)
            except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.TimeoutExpired):
                continue
    except Exception as e:
        logger.warning(f"Error during port cleanup: {e}")

def signal_handler(sig, frame):
    logger.info('Shutting down Flask server...')
    sys.exit(0)

if __name__ == "__main__":
    # Register signal handlers for cleanup
    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)

    try:
        port = 5000
        logger.info(f"Starting Flask server on port {port}")
        cleanup_port(port)
        app.run(host='0.0.0.0', port=port, debug=True)
    except Exception as e:
        logger.error(f"Failed to start server: {str(e)}")
        sys.exit(1)