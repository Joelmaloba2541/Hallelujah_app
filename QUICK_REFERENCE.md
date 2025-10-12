# Hallelujah Church - Quick Reference Card

## 🚀 Start Application
```bash
./start_all.sh
```

## 🌐 URLs
- **Website**: http://localhost:5173
- **Admin**: http://localhost:8000/admin
- **API**: http://localhost:8000/api

## 🔑 Login
- **Username**: admin
- **Password**: admin

## 📱 Pages
1. **Home** (/) - Welcome, announcements, events preview
2. **Events** (/events) - Browse church events
3. **Sermons** (/sermons) - Sermon library
4. **Ministries** (/ministries) - Church ministries
5. **Donations** (/donations) - Give & view stats
6. **Prayer** (/prayer-requests) - Submit requests
7. **About** (/about) - Church info

## 🔧 Common Commands

### Backend
```bash
# Start backend only
./start_backend.sh

# Create migrations
./venv/bin/python manage.py makemigrations

# Apply migrations
./venv/bin/python manage.py migrate

# Reset database
rm db.sqlite3
./venv/bin/python manage.py migrate
./venv/bin/python manage.py init_church

# Create superuser manually
./venv/bin/python manage.py createsuperuser

# Run Django shell
./venv/bin/python manage.py shell
```

### Frontend
```bash
# Start frontend only
./start_frontend.sh

# Install dependencies
cd frontend && npm install

# Build for production
cd frontend && npm run build
```

## 📊 Database Models
- **Member** - Church members
- **Event** - Church events
- **Sermon** - Sermon library
- **Donation** - Giving records
- **Ministry** - Church ministries
- **PrayerRequest** - Prayer requests
- **Announcement** - Church announcements

## 🎯 API Endpoints
- `/api/members/` - Members CRUD
- `/api/events/` - Events CRUD
- `/api/events/upcoming/` - Upcoming events
- `/api/sermons/` - Sermons CRUD
- `/api/donations/` - Donations CRUD
- `/api/donations/statistics/` - Stats
- `/api/ministries/` - Ministries CRUD
- `/api/prayer-requests/` - Prayer requests
- `/api/announcements/` - Announcements
- `/api/announcements/active/` - Active only

## 🛠️ Troubleshooting

### Port in use
```bash
lsof -ti:8000 | xargs kill -9  # Backend
lsof -ti:5173 | xargs kill -9  # Frontend
```

### Reset everything
```bash
rm -rf venv db.sqlite3 frontend/node_modules
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py init_church
cd frontend && npm install
```

### Verify setup
```bash
./verify_setup.sh
```

## 📝 Files Structure
```
Hallelujah_app/
├── backend/          # Django settings
├── church/           # Main app
├── frontend/         # React app
├── venv/             # Python env
├── db.sqlite3        # Database
├── manage.py         # Django CLI
└── start_all.sh      # Startup
```

## 💡 Tips
- Use Django admin for data management
- Check browser console for errors
- Backend logs show in terminal
- Frontend hot-reloads on save
- Database is SQLite (file-based)

## 📞 Help
- Check README.md for full docs
- See SETUP_GUIDE.md for setup
- Read PROJECT_SUMMARY.md for overview

---
**Built for Hallelujah Church** 🙏
