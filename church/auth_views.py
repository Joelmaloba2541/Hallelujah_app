from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import Member


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    """
    Register a new user and create associated member profile
    """
    try:
        name = request.data.get('name', '')
        email = request.data.get('email', '')
        phone = request.data.get('phone', '')
        password = request.data.get('password', '')

        # Validation
        if not name or not email or not password:
            return Response(
                {'message': 'Name, email, and password are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check if user already exists
        if User.objects.filter(username=email).exists():
            return Response(
                {'message': 'User with this email already exists'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Split name into first and last name
        name_parts = name.strip().split(' ', 1)
        first_name = name_parts[0]
        last_name = name_parts[1] if len(name_parts) > 1 else ''

        # Create user
        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name
        )

        # Create member profile
        member = Member.objects.create(
            user=user,
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone=phone or '',
            address='',
            membership_status='visitor'
        )

        # Create token
        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key,
            'user': {
                'id': user.id,
                'name': f"{first_name} {last_name}".strip(),
                'email': email,
                'first_name': first_name,
                'last_name': last_name
            }
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response(
            {'message': f'Signup failed: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    """
    Authenticate user and return token
    """
    try:
        email = request.data.get('email', '')
        password = request.data.get('password', '')

        if not email or not password:
            return Response(
                {'message': 'Email and password are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Authenticate user (username is email)
        user = authenticate(username=email, password=password)

        if user is None:
            return Response(
                {'message': 'Invalid email or password'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Get or create token
        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key,
            'user': {
                'id': user.id,
                'name': f"{user.first_name} {user.last_name}".strip() or user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name
            }
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return Response(
            {'message': f'Login failed: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    """
    Delete user's token to logout
    """
    try:
        # Delete the user's token
        request.user.auth_token.delete()
        return Response(
            {'message': 'Successfully logged out'},
            status=status.HTTP_200_OK
        )
    except Exception as e:
        return Response(
            {'message': f'Logout failed: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    """
    Get current authenticated user details
    """
    user = request.user
    return Response({
        'id': user.id,
        'name': f"{user.first_name} {user.last_name}".strip() or user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name
    }, status=status.HTTP_200_OK)
