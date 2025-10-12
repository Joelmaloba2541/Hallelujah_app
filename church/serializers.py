from rest_framework import serializers
from .models import Member, Event, Sermon, Donation, Ministry, PrayerRequest, Announcement


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class SermonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sermon
        fields = '__all__'


class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = '__all__'


class MinistrySerializer(serializers.ModelSerializer):
    leader_name = serializers.SerializerMethodField()
    member_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Ministry
        fields = '__all__'
    
    def get_leader_name(self, obj):
        return str(obj.leader) if obj.leader else None
    
    def get_member_count(self, obj):
        return obj.members.count()


class PrayerRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrayerRequest
        fields = '__all__'


class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'
