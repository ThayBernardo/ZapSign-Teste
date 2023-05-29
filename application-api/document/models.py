from django.db import models
from user.models import User
from company.models import Company

class Document(models.Model):
  id = models.AutoField(primary_key=True)
  name = models.CharField(max_length=255)
  deleted = models.BooleanField(default=False)
  created_date = models.DateTimeField(auto_now_add=True)
  updated_date  = models.DateTimeField(auto_now=True)
  date_limit = models.DateField()
  signed = models.BooleanField(default=False)
  company_associated = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='associated_docs')
  created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_docs')
