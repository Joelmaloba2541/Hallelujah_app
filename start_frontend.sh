#!/bin/bash

echo "🚀 Starting Hallelujah Church Frontend..."
echo ""

# Install dependencies if node_modules doesn't exist
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

# Start React development server
echo ""
echo "🌐 Starting React development server..."
cd frontend && npm run dev
