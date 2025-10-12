from django.contrib import admin
from .models import Member, Event, Sermon, Donation, Ministry, PrayerRequest, Announcement


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'email', 'phone', 'membership_status', 'date_joined']
    list_filter = ['membership_status', 'date_joined']
    search_fields = ['first_name', 'last_name', 'email', 'phone']


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ['title', 'event_type', 'start_date', 'location']
    list_filter = ['event_type', 'start_date']
    search_fields = ['title', 'description', 'location']


@admin.register(Sermon)
class SermonAdmin(admin.ModelAdmin):
    list_display = ['title', 'preacher', 'scripture_reference', 'date_preached']
    list_filter = ['date_preached', 'preacher']
    search_fields = ['title', 'preacher', 'scripture_reference']


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ['donor_name', 'amount', 'donation_type', 'payment_method', 'date']
    list_filter = ['donation_type', 'payment_method', 'date']
    search_fields = ['donor_name', 'transaction_reference']


@admin.register(Ministry)
class MinistryAdmin(admin.ModelAdmin):
    list_display = ['name', 'leader', 'meeting_day', 'meeting_time']
    search_fields = ['name', 'description']
    filter_horizontal = ['members']


@admin.register(PrayerRequest)
class PrayerRequestAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['name', 'email', 'request']


@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ['title', 'priority', 'is_active', 'created_at', 'expires_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'content']
