#!/bin/bash

echo "🚀 Starting Hallelujah Church Full Stack Application..."
echo ""

# Start backend in background
echo "Starting Backend..."
./start_backend.sh &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 5

# Start frontend
echo ""
echo "Starting Frontend..."
./start_frontend.sh &
FRONTEND_PID=$!

echo ""
echo "✅ Application started!"
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend API: http://localhost:8000/api"
echo "👤 Admin Panel: http://localhost:8000/admin"
echo ""
echo "Admin credentials:"
echo "  Username: admin"
echo "  Password: admin"
echo "  Email: admin@gmail.com"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user interrupt
wait
