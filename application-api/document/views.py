from .models import Document
from .serializers import DocumentSerializer
from rest_framework import generics

# document by id
class DocumentDetail(generics.RetrieveUpdateDestroyAPIView):
  queryset = Document.objects.all()
  serializer_class = DocumentSerializer

# get documents
class DocumentList(generics.ListCreateAPIView):
  queryset = Document.objects.all()
  serializer_class = DocumentSerializer