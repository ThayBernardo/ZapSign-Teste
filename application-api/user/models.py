from django.db import models
from django.utils import timezone

class User(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=255, unique=True)
    password_reset_date = models.DateTimeField(default=timezone.now())
    verification_email = models.BooleanField(default=False)
    password = models.CharField(max_length=255)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        if self.pk:
            original = User.objects.get(pk=self.pk)
            if original.password != self.password:
                self.password_reset_date = timezone.now()
        super(User, self).save(*args, **kwargs)
