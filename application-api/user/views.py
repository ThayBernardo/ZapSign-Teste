from .models import User
from .serializers import UserSerializer
from rest_framework import generics

# user by id
class UserDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer

# get users
class UserList(generics.ListCreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
