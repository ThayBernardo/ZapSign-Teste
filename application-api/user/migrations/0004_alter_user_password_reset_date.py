# Generated by Django 4.2.1 on 2023-05-24 21:40

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("user", "0003_alter_user_password_reset_date"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="password_reset_date",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2023, 5, 24, 21, 40, 16, 654879, tzinfo=datetime.timezone.utc
                )
            ),
        ),
    ]
