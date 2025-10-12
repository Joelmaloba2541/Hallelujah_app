from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Member, Event, Sermon, Donation, Ministry, PrayerRequest, Announcement
from .serializers import (
    MemberSerializer, EventSerializer, SermonSerializer,
    DonationSerializer, MinistrySerializer, PrayerRequestSerializer,
    AnnouncementSerializer
)


class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['first_name', 'last_name', 'email', 'phone']
    ordering_fields = ['date_joined', 'first_name', 'last_name']


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['start_date', 'title']
    
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        from django.utils import timezone
        upcoming_events = Event.objects.filter(start_date__gte=timezone.now())
        serializer = self.get_serializer(upcoming_events, many=True)
        return Response(serializer.data)


class SermonViewSet(viewsets.ModelViewSet):
    queryset = Sermon.objects.all()
    serializer_class = SermonSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'preacher', 'scripture_reference']
    ordering_fields = ['date_preached', 'title']


class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['donor_name', 'transaction_reference']
    ordering_fields = ['date', 'amount']
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        from django.db.models import Sum, Count
        stats = {
            'total_donations': Donation.objects.aggregate(Sum('amount'))['amount__sum'] or 0,
            'total_count': Donation.objects.count(),
            'by_type': list(Donation.objects.values('donation_type').annotate(
                total=Sum('amount'),
                count=Count('id')
            ))
        }
        return Response(stats)


class MinistryViewSet(viewsets.ModelViewSet):
    queryset = Ministry.objects.all()
    serializer_class = MinistrySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']


class PrayerRequestViewSet(viewsets.ModelViewSet):
    queryset = PrayerRequest.objects.all()
    serializer_class = PrayerRequestSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'email', 'request']
    ordering_fields = ['created_at', 'status']


class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content']
    ordering_fields = ['priority', 'created_at']
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        from django.utils import timezone
        active_announcements = Announcement.objects.filter(
            is_active=True
        ).filter(
            expires_at__gte=timezone.now()
        ) | Announcement.objects.filter(
            is_active=True,
            expires_at__isnull=True
        )
        serializer = self.get_serializer(active_announcements, many=True)
        return Response(serializer.data)
