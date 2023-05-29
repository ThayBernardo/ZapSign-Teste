from django.urls import path
from .views import UserDetail, UserList

urlpatterns = [
  path('users/', UserList.as_view(), name='Users'),
  path('user/<int:pk>', UserDetail.as_view(), name='User'),
]