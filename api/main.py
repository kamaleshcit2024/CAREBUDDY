import os
import sys

# Add the root and backend directories to the path
root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from backend.main import app as handler

# This 'handler' is what Vercel expects
app = handler
