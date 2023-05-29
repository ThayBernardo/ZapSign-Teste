from django.urls import path
from .views import DocumentDetail, DocumentList

urlpatterns = [
  path('documents/', DocumentList.as_view(), name='Documents'),
  path('document/<int:pk>', DocumentDetail.as_view(), name='Document'),
]