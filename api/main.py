import os
import sys

# Add the root and backend directories to the path
root_dir = os.path.join(os.path.dirname(__file__), '..')
sys.path.append(root_dir)
sys.path.append(os.path.join(root_dir, 'backend'))

from backend.main import app as handler

# This 'handler' is what Vercel expects
app = handler
