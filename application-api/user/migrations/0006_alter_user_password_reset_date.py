# Generated by Django 4.2.1 on 2023-05-25 21:15

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0005_alter_user_password_reset_date"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="password_reset_date",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2023, 5, 25, 21, 15, 0, 611432, tzinfo=datetime.timezone.utc
                )
            ),
        ),
    ]
