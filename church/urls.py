from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    MemberViewSet, EventViewSet, SermonViewSet,
    DonationViewSet, MinistryViewSet, PrayerRequestViewSet,
    AnnouncementViewSet
)
from .auth_views import signup, login, logout, get_current_user

router = DefaultRouter()
router.register(r'members', MemberViewSet)
router.register(r'events', EventViewSet)
router.register(r'sermons', SermonViewSet)
router.register(r'donations', DonationViewSet)
router.register(r'ministries', MinistryViewSet)
router.register(r'prayer-requests', PrayerRequestViewSet)
router.register(r'announcements', AnnouncementViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # Authentication endpoints
    path('auth/signup/', signup, name='signup'),
    path('auth/login/', login, name='login'),
    path('auth/logout/', logout, name='logout'),
    path('auth/user/', get_current_user, name='current-user'),
]
