# Hallelujah Church Management System

A full-stack church website and management system built with Django (backend) and React (frontend).

## Features

### Public Features
- **Home Page**: Welcome section with announcements, upcoming events, and recent sermons
- **Events**: Browse and filter church events by type
- **Sermons**: View sermon library with video links
- **Ministries**: Explore different church ministries
- **Donations**: Submit donations with various payment methods
- **Prayer Requests**: Submit and view prayer requests

### Admin Features (Django Admin)
- Manage members, events, sermons, donations
- Track ministries and prayer requests
- View announcements and statistics
- Full CRUD operations on all models

## Tech Stack

### Backend
- Django 5.2.7
- Django REST Framework
- SQLite Database
- CORS Headers for API access

### Frontend
- React 19
- React Router for navigation
- Bootstrap 5 for styling
- Axios for API calls
- Lucide React for icons

## Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   cd /home/joel/software/Hallelujah_app
   ```

2. **Make scripts executable**
   ```bash
   chmod +x start_backend.sh start_frontend.sh start_all.sh
   ```

3. **Start the full application**
   ```bash
   ./start_all.sh
   ```

   This will:
   - Create a Python virtual environment
   - Install all Python dependencies
   - Run database migrations
   - Create superuser (admin/admin)
   - Load dummy data
   - Start Django backend on port 8000
   - Install Node.js dependencies
   - Start React frontend on port 5173

### Manual Setup

#### Backend Setup
```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install django djangorestframework django-cors-headers Pillow

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Initialize database with superuser and dummy data
python manage.py init_church

# Start backend server
python manage.py runserver
```

#### Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000/api
- **Admin Panel**: http://localhost:8000/admin

## Default Admin Credentials

- **Username**: admin
- **Password**: admin
- **Email**: admin@gmail.com

**⚠️ Important**: Change these credentials in production!

## API Endpoints

### Members
- `GET /api/members/` - List all members
- `POST /api/members/` - Create member
- `GET /api/members/{id}/` - Get member details
- `PUT /api/members/{id}/` - Update member
- `DELETE /api/members/{id}/` - Delete member

### Events
- `GET /api/events/` - List all events
- `GET /api/events/upcoming/` - Get upcoming events
- `POST /api/events/` - Create event

### Sermons
- `GET /api/sermons/` - List all sermons
- `POST /api/sermons/` - Create sermon

### Donations
- `GET /api/donations/` - List donations
- `GET /api/donations/statistics/` - Get donation statistics
- `POST /api/donations/` - Create donation

### Ministries
- `GET /api/ministries/` - List ministries
- `POST /api/ministries/` - Create ministry

### Prayer Requests
- `GET /api/prayer-requests/` - List prayer requests
- `POST /api/prayer-requests/` - Submit prayer request

### Announcements
- `GET /api/announcements/` - List announcements
- `GET /api/announcements/active/` - Get active announcements

## Project Structure

```
Hallelujah_app/
├── backend/                 # Django settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── church/                  # Main Django app
│   ├── models.py           # Database models
│   ├── views.py            # API views
│   ├── serializers.py      # DRF serializers
│   ├── admin.py            # Admin configuration
│   └── management/
│       └── commands/
│           └── init_church.py  # Database initialization
├── frontend/               # React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── manage.py
├── start_backend.sh       # Backend startup script
├── start_frontend.sh      # Frontend startup script
├── start_all.sh          # Start both servers
└── README.md
```

## Dummy Data

The application comes with pre-loaded dummy data including:
- 5 sample members
- 4 ministries (Worship Team, Youth Ministry, Children Ministry, Intercessory Prayer)
- 5 upcoming events
- 4 sermons
- 5 donation records
- 3 prayer requests
- 3 announcements

## Development

### Adding New Features

1. **Backend**: Add models in `church/models.py`, create serializers and views
2. **Frontend**: Create new pages in `frontend/src/pages/` and add routes in `App.jsx`

### Database Reset

To reset the database and reload dummy data:
```bash
rm db.sqlite3
python manage.py migrate
python manage.py init_church
```

## Production Deployment

Before deploying to production:

1. Change `DEBUG = False` in `backend/settings.py`
2. Update `SECRET_KEY` in settings
3. Configure `ALLOWED_HOSTS`
4. Set up proper database (PostgreSQL recommended)
5. Configure static files serving
6. Set up environment variables
7. Change admin credentials

## License

This project is open source and available for church use.

## Support

For issues or questions, please contact the development team.

---

**Built with ❤️ for Hallelujah Church**
