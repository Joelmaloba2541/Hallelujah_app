#!/bin/bash

echo "🚀 Starting Hallelujah Church Backend..."
echo ""

# Activate virtual environment
source venv/bin/activate

# Run migrations
echo "📦 Running database migrations..."
python manage.py makemigrations
python manage.py migrate

# Initialize database with superuser and dummy data
echo ""
echo "🎯 Initializing database..."
python manage.py init_church

# Start Django server
echo ""
echo "🌐 Starting Django development server..."
python manage.py runserver 0.0.0.0:8000
