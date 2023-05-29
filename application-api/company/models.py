from django.db import models
from django.utils import timezone
from user.models import User

class Company(models.Model):
  LANGUAGES = (
    ('pt', 'Português'),
    ('en', 'Inglês'),
    ('es', 'Espanhol'),
  )

  id = models.AutoField(primary_key=True)
  name = models.CharField(max_length=255)
  created_date = models.DateTimeField(auto_now_add=True)
  updated_date  = models.DateTimeField(auto_now=True)
  time_zone = models.CharField(max_length=255, default='-03:00')
  language = models.CharField(max_length=2, choices=LANGUAGES, default='pt')
  guest_users = models.ManyToManyField(User, related_name='companies_invited', blank=True)
  created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='companies_created')
