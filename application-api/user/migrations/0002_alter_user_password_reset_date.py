# Generated by Django 4.2.1 on 2023-05-23 19:21

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="password_reset_date",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2023, 5, 23, 19, 21, 36, 892343, tzinfo=datetime.timezone.utc
                )
            ),
        ),
    ]
