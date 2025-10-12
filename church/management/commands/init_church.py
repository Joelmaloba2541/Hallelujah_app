from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from church.models import Member, Event, Sermon, Donation, Ministry, PrayerRequest, Announcement
from datetime import datetime, timedelta
from django.utils import timezone


class Command(BaseCommand):
    help = 'Initialize church database with superuser and dummy data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Initializing Hallelujah Church database...')
        
        # Create superuser
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                username='admin',
                email='admin@gmail.com',
                password='admin'
            )
            self.stdout.write(self.style.SUCCESS('✓ Superuser created (admin/admin)'))
        else:
            self.stdout.write(self.style.WARNING('⚠ Superuser already exists'))
        
        # Create members
        if Member.objects.count() == 0:
            members_data = [
                {
                    'first_name': 'John', 'last_name': 'Kamau',
                    'email': 'john.kamau@example.com', 'phone': '+254712345678',
                    'address': 'Nairobi, Kenya', 'membership_status': 'active'
                },
                {
                    'first_name': 'Mary', 'last_name': 'Wanjiku',
                    'email': 'mary.wanjiku@example.com', 'phone': '+254723456789',
                    'address': 'Kiambu, Kenya', 'membership_status': 'active'
                },
                {
                    'first_name': 'Peter', 'last_name': 'Ochieng',
                    'email': 'peter.ochieng@example.com', 'phone': '+254734567890',
                    'address': 'Kisumu, Kenya', 'membership_status': 'active'
                },
                {
                    'first_name': 'Grace', 'last_name': 'Akinyi',
                    'email': 'grace.akinyi@example.com', 'phone': '+254745678901',
                    'address': 'Mombasa, Kenya', 'membership_status': 'active'
                },
                {
                    'first_name': 'David', 'last_name': 'Mwangi',
                    'email': 'david.mwangi@example.com', 'phone': '+254756789012',
                    'address': 'Nakuru, Kenya', 'membership_status': 'visitor'
                },
            ]
            
            members = []
            for data in members_data:
                member = Member.objects.create(**data)
                members.append(member)
            
            self.stdout.write(self.style.SUCCESS(f'✓ Created {len(members)} members'))
        else:
            members = list(Member.objects.all())
            self.stdout.write(self.style.WARNING('⚠ Members already exist'))
        
        # Create ministries
        if Ministry.objects.count() == 0:
            ministries_data = [
                {
                    'name': 'Worship Team',
                    'description': 'Leading the congregation in praise and worship',
                    'leader': members[0] if members else None,
                    'meeting_day': 'Saturday',
                    'meeting_time': '10:00:00'
                },
                {
                    'name': 'Youth Ministry',
                    'description': 'Empowering young people for Christ',
                    'leader': members[1] if members else None,
                    'meeting_day': 'Friday',
                    'meeting_time': '18:00:00'
                },
                {
                    'name': 'Children Ministry',
                    'description': 'Teaching children about Jesus',
                    'leader': members[2] if members else None,
                    'meeting_day': 'Sunday',
                    'meeting_time': '09:00:00'
                },
                {
                    'name': 'Intercessory Prayer',
                    'description': 'Standing in the gap through prayer',
                    'leader': members[3] if members else None,
                    'meeting_day': 'Wednesday',
                    'meeting_time': '06:00:00'
                },
            ]
            
            for data in ministries_data:
                Ministry.objects.create(**data)
            
            self.stdout.write(self.style.SUCCESS(f'✓ Created {len(ministries_data)} ministries'))
        else:
            self.stdout.write(self.style.WARNING('⚠ Ministries already exist'))
        
        # Create events
        if Event.objects.count() == 0:
            now = timezone.now()
            events_data = [
                {
                    'title': 'Sunday Worship Service',
                    'description': 'Join us for a powerful worship experience',
                    'event_type': 'service',
                    'start_date': now + timedelta(days=7 - now.weekday() + 6),
                    'end_date': now + timedelta(days=7 - now.weekday() + 6, hours=2),
                    'location': 'Main Sanctuary'
                },
                {
                    'title': 'Midweek Bible Study',
                    'description': 'Deep dive into the Word of God',
                    'event_type': 'bible_study',
                    'start_date': now + timedelta(days=7 - now.weekday() + 2),
                    'end_date': now + timedelta(days=7 - now.weekday() + 2, hours=1.5),
                    'location': 'Fellowship Hall'
                },
                {
                    'title': 'Youth Night',
                    'description': 'An evening of worship, games, and fellowship',
                    'event_type': 'youth',
                    'start_date': now + timedelta(days=7 - now.weekday() + 4),
                    'end_date': now + timedelta(days=7 - now.weekday() + 4, hours=3),
                    'location': 'Youth Center'
                },
                {
                    'title': 'Prayer Meeting',
                    'description': 'Corporate prayer for our church and nation',
                    'event_type': 'prayer',
                    'start_date': now + timedelta(days=7 - now.weekday() + 2),
                    'end_date': now + timedelta(days=7 - now.weekday() + 2, hours=1),
                    'location': 'Prayer Room'
                },
                {
                    'title': 'Community Outreach',
                    'description': 'Serving our community with love',
                    'event_type': 'outreach',
                    'start_date': now + timedelta(days=14),
                    'end_date': now + timedelta(days=14, hours=4),
                    'location': 'City Center'
                },
            ]
            
            for data in events_data:
                Event.objects.create(**data)
            
            self.stdout.write(self.style.SUCCESS(f'✓ Created {len(events_data)} events'))
        else:
            self.stdout.write(self.style.WARNING('⚠ Events already exist'))
        
        # Create sermons
        if Sermon.objects.count() == 0:
            sermons_data = [
                {
                    'title': 'Walking in Faith',
                    'preacher': 'Pastor James Mwangi',
                    'description': 'Understanding what it means to walk by faith and not by sight',
                    'scripture_reference': 'Hebrews 11:1-6',
                    'date_preached': timezone.now().date() - timedelta(days=7),
                    'video_url': 'https://www.youtube.com/watch?v=example1'
                },
                {
                    'title': 'The Power of Prayer',
                    'preacher': 'Pastor Sarah Njeri',
                    'description': 'Discovering the transformative power of prayer in our lives',
                    'scripture_reference': 'James 5:16-18',
                    'date_preached': timezone.now().date() - timedelta(days=14),
                    'video_url': 'https://www.youtube.com/watch?v=example2'
                },
                {
                    'title': 'Love One Another',
                    'preacher': 'Pastor James Mwangi',
                    'description': 'Living out Christ\'s command to love one another',
                    'scripture_reference': 'John 13:34-35',
                    'date_preached': timezone.now().date() - timedelta(days=21),
                    'video_url': 'https://www.youtube.com/watch?v=example3'
                },
                {
                    'title': 'The Great Commission',
                    'preacher': 'Pastor David Omondi',
                    'description': 'Our calling to make disciples of all nations',
                    'scripture_reference': 'Matthew 28:18-20',
                    'date_preached': timezone.now().date() - timedelta(days=28),
                    'video_url': 'https://www.youtube.com/watch?v=example4'
                },
            ]
            
            for data in sermons_data:
                Sermon.objects.create(**data)
            
            self.stdout.write(self.style.SUCCESS(f'✓ Created {len(sermons_data)} sermons'))
        else:
            self.stdout.write(self.style.WARNING('⚠ Sermons already exist'))
        
        # Create donations
        if Donation.objects.count() == 0:
            donations_data = [
                {
                    'member': members[0] if members else None,
                    'donor_name': 'John Kamau',
                    'amount': 5000.00,
                    'donation_type': 'tithe',
                    'payment_method': 'mpesa',
                    'transaction_reference': 'MPE123456789'
                },
                {
                    'member': members[1] if members else None,
                    'donor_name': 'Mary Wanjiku',
                    'amount': 2000.00,
                    'donation_type': 'offering',
                    'payment_method': 'cash'
                },
                {
                    'member': members[2] if members else None,
                    'donor_name': 'Peter Ochieng',
                    'amount': 10000.00,
                    'donation_type': 'building_fund',
                    'payment_method': 'bank',
                    'transaction_reference': 'BNK987654321'
                },
                {
                    'member': members[3] if members else None,
                    'donor_name': 'Grace Akinyi',
                    'amount': 3000.00,
                    'donation_type': 'missions',
                    'payment_method': 'mpesa',
                    'transaction_reference': 'MPE111222333'
                },
                {
                    'donor_name': 'Anonymous',
                    'amount': 15000.00,
                    'donation_type': 'special',
                    'payment_method': 'cash'
                },
            ]
            
            for data in donations_data:
                Donation.objects.create(**data)
            
            self.stdout.write(self.style.SUCCESS(f'✓ Created {len(donations_data)} donations'))
        else:
            self.stdout.write(self.style.WARNING('⚠ Donations already exist'))
        
        # Create prayer requests
        if PrayerRequest.objects.count() == 0:
            prayer_requests_data = [
                {
                    'member': members[0] if members else None,
                    'name': 'John Kamau',
                    'email': 'john.kamau@example.com',
                    'request': 'Please pray for my family\'s health and protection',
                    'status': 'praying'
                },
                {
                    'member': members[1] if members else None,
                    'name': 'Mary Wanjiku',
                    'email': 'mary.wanjiku@example.com',
                    'request': 'Pray for wisdom in my new job',
                    'status': 'pending'
                },
                {
                    'name': 'Anonymous',
                    'email': 'anonymous@example.com',
                    'request': 'Pray for healing from illness',
                    'status': 'praying'
                },
            ]
            
            for data in prayer_requests_data:
                PrayerRequest.objects.create(**data)
            
            self.stdout.write(self.style.SUCCESS(f'✓ Created {len(prayer_requests_data)} prayer requests'))
        else:
            self.stdout.write(self.style.WARNING('⚠ Prayer requests already exist'))
        
        # Create announcements
        if Announcement.objects.count() == 0:
            announcements_data = [
                {
                    'title': 'Welcome to Hallelujah Church!',
                    'content': 'We are excited to have you worship with us. Join us every Sunday at 9 AM and 11 AM.',
                    'priority': 10,
                    'is_active': True
                },
                {
                    'title': 'Upcoming Conference',
                    'content': 'Join us for our annual faith conference next month. Registration is now open!',
                    'priority': 8,
                    'is_active': True,
                    'expires_at': timezone.now() + timedelta(days=30)
                },
                {
                    'title': 'Volunteer Opportunities',
                    'content': 'We are looking for volunteers to serve in various ministries. Contact the church office for more information.',
                    'priority': 5,
                    'is_active': True
                },
            ]
            
            for data in announcements_data:
                Announcement.objects.create(**data)
            
            self.stdout.write(self.style.SUCCESS(f'✓ Created {len(announcements_data)} announcements'))
        else:
            self.stdout.write(self.style.WARNING('⚠ Announcements already exist'))
        
        self.stdout.write(self.style.SUCCESS('\n✅ Database initialization complete!'))
        self.stdout.write(self.style.SUCCESS('Admin credentials: admin / admin'))
        self.stdout.write(self.style.SUCCESS('Admin email: admin@gmail.com'))
