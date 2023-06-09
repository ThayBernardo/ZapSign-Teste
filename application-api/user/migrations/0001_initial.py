# Generated by Django 4.2.1 on 2023-05-23 19:18

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("email", models.EmailField(max_length=255, unique=True)),
                (
                    "password_reset_date",
                    models.DateTimeField(
                        default=datetime.datetime(
                            2023, 5, 23, 19, 18, 4, 766011, tzinfo=datetime.timezone.utc
                        )
                    ),
                ),
                ("verification_email", models.BooleanField(default=False)),
                ("password", models.CharField(max_length=255)),
                ("created_date", models.DateTimeField(auto_now_add=True)),
                ("updated_date", models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
