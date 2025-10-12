from django.db import models
from django.contrib.auth.models import User


class Member(models.Model):
    """Church member model"""
    MEMBERSHIP_STATUS = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('visitor', 'Visitor'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    address = models.TextField()
    date_of_birth = models.DateField(null=True, blank=True)
    membership_status = models.CharField(max_length=20, choices=MEMBERSHIP_STATUS, default='visitor')
    date_joined = models.DateField(auto_now_add=True)
    photo = models.ImageField(upload_to='members/', null=True, blank=True)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    class Meta:
        ordering = ['-date_joined']


class Event(models.Model):
    """Church events model"""
    EVENT_TYPES = [
        ('service', 'Church Service'),
        ('prayer', 'Prayer Meeting'),
        ('bible_study', 'Bible Study'),
        ('youth', 'Youth Meeting'),
        ('conference', 'Conference'),
        ('outreach', 'Outreach'),
        ('other', 'Other'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    event_type = models.CharField(max_length=20, choices=EVENT_TYPES)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    location = models.CharField(max_length=200)
    image = models.ImageField(upload_to='events/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-start_date']


class Sermon(models.Model):
    """Sermons model"""
    title = models.CharField(max_length=200)
    preacher = models.CharField(max_length=100)
    description = models.TextField()
    scripture_reference = models.CharField(max_length=200)
    date_preached = models.DateField()
    video_url = models.URLField(null=True, blank=True)
    audio_file = models.FileField(upload_to='sermons/audio/', null=True, blank=True)
    thumbnail = models.ImageField(upload_to='sermons/thumbnails/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-date_preached']


class Donation(models.Model):
    """Donations and tithes model"""
    DONATION_TYPES = [
        ('tithe', 'Tithe'),
        ('offering', 'Offering'),
        ('building_fund', 'Building Fund'),
        ('missions', 'Missions'),
        ('special', 'Special Offering'),
        ('other', 'Other'),
    ]
    
    PAYMENT_METHODS = [
        ('cash', 'Cash'),
        ('mpesa', 'M-Pesa'),
        ('bank', 'Bank Transfer'),
        ('card', 'Card'),
    ]
    
    member = models.ForeignKey(Member, on_delete=models.SET_NULL, null=True, blank=True)
    donor_name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    donation_type = models.CharField(max_length=20, choices=DONATION_TYPES)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHODS)
    transaction_reference = models.CharField(max_length=100, null=True, blank=True)
    date = models.DateField(auto_now_add=True)
    notes = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.donor_name} - {self.amount} ({self.donation_type})"
    
    class Meta:
        ordering = ['-date']


class Ministry(models.Model):
    """Church ministries model"""
    name = models.CharField(max_length=100)
    description = models.TextField()
    leader = models.ForeignKey(Member, on_delete=models.SET_NULL, null=True, related_name='led_ministries')
    members = models.ManyToManyField(Member, related_name='ministries', blank=True)
    meeting_day = models.CharField(max_length=50, null=True, blank=True)
    meeting_time = models.TimeField(null=True, blank=True)
    image = models.ImageField(upload_to='ministries/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'Ministries'
        ordering = ['name']


class PrayerRequest(models.Model):
    """Prayer requests model"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('praying', 'Praying'),
        ('answered', 'Answered'),
    ]
    
    member = models.ForeignKey(Member, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    request = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Prayer request from {self.name}"
    
    class Meta:
        ordering = ['-created_at']


class Announcement(models.Model):
    """Church announcements model"""
    title = models.CharField(max_length=200)
    content = models.TextField()
    priority = models.IntegerField(default=0, help_text="Higher number = higher priority")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-priority', '-created_at']
