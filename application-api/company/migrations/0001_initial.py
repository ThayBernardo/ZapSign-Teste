# Generated by Django 4.2.1 on 2023-05-24 20:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("user", "0003_alter_user_password_reset_date"),
    ]

    operations = [
        migrations.CreateModel(
            name="Company",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=255)),
                ("created_date", models.DateTimeField(auto_now_add=True)),
                ("updated_date", models.DateTimeField(auto_now=True)),
                ("time_zone", models.CharField(default="-03:00", max_length=255)),
                (
                    "language",
                    models.CharField(
                        choices=[
                            ("pt", "Português"),
                            ("en", "Inglês"),
                            ("es", "Espanhol"),
                        ],
                        default="pt",
                        max_length=2,
                    ),
                ),
                (
                    "created_by",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="companies_created",
                        to="user.user",
                    ),
                ),
                (
                    "guest_users",
                    models.ManyToManyField(
                        blank=True, related_name="companies_invited", to="user.user"
                    ),
                ),
            ],
        ),
    ]
