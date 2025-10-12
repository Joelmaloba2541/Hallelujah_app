#!/bin/bash

echo "🔍 Verifying Hallelujah Church Setup..."
echo ""

# Check Python
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 installed: $(python3 --version)"
else
    echo "❌ Python 3 not found"
    exit 1
fi

# Check Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js installed: $(node --version)"
else
    echo "❌ Node.js not found"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    echo "✅ npm installed: $(npm --version)"
else
    echo "❌ npm not found"
    exit 1
fi

echo ""
echo "📦 Checking Backend Setup..."

# Check virtual environment
if [ -d "venv" ]; then
    echo "✅ Virtual environment exists"
else
    echo "❌ Virtual environment not found"
    exit 1
fi

# Check database
if [ -f "db.sqlite3" ]; then
    echo "✅ Database exists"
else
    echo "⚠️  Database not found - run migrations"
fi

# Check Django installation
if ./venv/bin/python -c "import django" 2>/dev/null; then
    echo "✅ Django installed"
else
    echo "❌ Django not installed"
    exit 1
fi

echo ""
echo "📦 Checking Frontend Setup..."

# Check node_modules
if [ -d "frontend/node_modules" ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "⚠️  Frontend dependencies not installed - run npm install"
fi

echo ""
echo "📋 Checking Files..."

# Check important files
files=(
    "manage.py"
    "requirements.txt"
    "start_backend.sh"
    "start_frontend.sh"
    "start_all.sh"
    "README.md"
    "frontend/package.json"
    "frontend/src/App.jsx"
    "church/models.py"
    "church/views.py"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file missing"
    fi
done

echo ""
echo "🎯 Setup Verification Complete!"
echo ""
echo "To start the application, run:"
echo "  ./start_all.sh"
echo ""
echo "Access points:"
echo "  Frontend: http://localhost:5173"
echo "  Backend API: http://localhost:8000/api"
echo "  Admin Panel: http://localhost:8000/admin"
echo ""
echo "Admin credentials:"
echo "  Username: admin"
echo "  Password: admin"
