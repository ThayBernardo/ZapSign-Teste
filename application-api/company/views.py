from .models import Company
from .serializers import CompanySerializer
from rest_framework import generics

# company by id
class CompanyDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Company.objects.all()
  serializer_class = CompanySerializer

# get companys
class CompanyList(generics.ListCreateAPIView):
  queryset = Company.objects.all()
  serializer_class = CompanySerializer
