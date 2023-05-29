from django.urls import path
from .views import CompanyList, CompanyDetail

urlpatterns = [
  path('companys/', CompanyList.as_view(), name='Companys'),
  path('company/<int:pk>', CompanyDetail.as_view(), name='Company'),
]