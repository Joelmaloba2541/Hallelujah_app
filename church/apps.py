from django.apps import AppConfig
from django.core.management import call_command
from django.db.utils import OperationalError
import sys


class ChurchConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'church'

    def ready(self):
        # Run migrations automatically when the app starts
        # Skip if running migrations command itself to avoid recursion
        if 'runserver' in sys.argv or 'gunicorn' in sys.argv[0]:
            try:
                print("🔄 Running automatic migrations...")
                call_command('migrate', '--noinput')
                print("✅ Migrations completed successfully!")
            except OperationalError as e:
                print(f"⚠️ Migration error: {e}")
            except Exception as e:
                print(f"⚠️ Unexpected error during migration: {e}")
