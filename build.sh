#!/bin/bash

# Update package lists and install CMake
apt-get update && apt-get install -y cmake

# Install Python dependencies
pip install -r requirements.txt

