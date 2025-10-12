# Hallelujah Church - Quick Setup Guide

## 🚀 Quick Start (Recommended)

Run this single command to start everything:

```bash
./start_all.sh
```

This will automatically:
- ✅ Create Python virtual environment
- ✅ Install all backend dependencies
- ✅ Run database migrations
- ✅ Create superuser (username: admin, password: admin, email: admin@gmail.com)
- ✅ Load dummy data (members, events, sermons, etc.)
- ✅ Start Django backend on http://localhost:8000
- ✅ Install frontend dependencies
- ✅ Start React frontend on http://localhost:5173

## 📱 Access the Application

After running `./start_all.sh`, access:

- **Website**: http://localhost:5173
- **Admin Panel**: http://localhost:8000/admin
- **API**: http://localhost:8000/api

## 🔑 Admin Login

- Username: `admin`
- Password: `admin`
- Email: `admin@gmail.com`

## 🎯 Features

### Public Website (React + Bootstrap)
1. **Home Page** - Welcome section, announcements, upcoming events preview
2. **Events** - Browse and filter church events
3. **Sermons** - View sermon library with video links
4. **Ministries** - Explore church ministries
5. **Donations** - Submit donations with statistics
6. **Prayer Requests** - Submit and view prayer requests
7. **About** - Church information and service times

### Admin Panel (Django Admin)
- Manage all church data
- View statistics and reports
- Full CRUD operations
- User management

## 📦 What's Included (Dummy Data)

- 5 Members (John Kamau, Mary Wanjiku, Peter Ochieng, Grace Akinyi, David Mwangi)
- 4 Ministries (Worship Team, Youth Ministry, Children Ministry, Intercessory Prayer)
- 5 Upcoming Events (Sunday Service, Bible Study, Youth Night, Prayer Meeting, Outreach)
- 4 Sermons with preachers and scripture references
- 5 Donation records (Tithes, Offerings, Building Fund, Missions)
- 3 Prayer Requests
- 3 Active Announcements

## 🛠️ Manual Setup (If Needed)

### Backend Only
```bash
./start_backend.sh
```

### Frontend Only
```bash
./start_frontend.sh
```

## 🔄 Reset Database

To start fresh with new dummy data:

```bash
rm db.sqlite3
source venv/bin/activate
python manage.py migrate
python manage.py init_church
```

## 📝 API Endpoints

All endpoints are available at `http://localhost:8000/api/`

- `/members/` - Church members
- `/events/` - Church events
- `/events/upcoming/` - Upcoming events only
- `/sermons/` - Sermon library
- `/donations/` - Donation records
- `/donations/statistics/` - Donation stats
- `/ministries/` - Church ministries
- `/prayer-requests/` - Prayer requests
- `/announcements/` - Announcements
- `/announcements/active/` - Active announcements only

## 🎨 Technology Stack

**Backend:**
- Django 5.2.7
- Django REST Framework
- SQLite Database
- CORS enabled

**Frontend:**
- React 19
- Bootstrap 5
- React Router
- Axios
- Lucide React Icons

## ⚙️ Configuration

All configuration is pre-set for development. For production:

1. Update `backend/settings.py`:
   - Set `DEBUG = False`
   - Update `SECRET_KEY`
   - Configure `ALLOWED_HOSTS`
   - Use PostgreSQL instead of SQLite

2. Update frontend API URL in `frontend/src/services/api.js`

3. Change admin credentials

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Kill processes on ports 8000 or 5173
lsof -ti:8000 | xargs kill -9
lsof -ti:5173 | xargs kill -9
```

**Dependencies not installing:**
```bash
# Backend
source venv/bin/activate
pip install -r requirements.txt

# Frontend
cd frontend
npm install
```

**Database errors:**
```bash
# Reset database
rm db.sqlite3
python manage.py migrate
python manage.py init_church
```

## 📞 Support

For issues or questions, check the main README.md or contact the development team.

---

**Enjoy using Hallelujah Church Management System! 🙏**
