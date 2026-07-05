# Generated migration for drivers app

from django.conf import settings
from django.db import migrations, models
from django.utils import timezone
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Driver',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(default=timezone.now, editable=False)),
                ('updated_at', models.DateTimeField(auto_now=True, editable=False)),
                ('license_number', models.CharField(max_length=50, unique=True)),
                ('vehicle_type', models.CharField(max_length=50)),
                ('vehicle_model', models.CharField(max_length=100)),
                ('vehicle_plate', models.CharField(max_length=20, unique=True)),
                ('vehicle_color', models.CharField(blank=True, max_length=30, null=True)),
                ('vehicle_year', models.IntegerField(blank=True, null=True)),
                ('status', models.CharField(choices=[('available', 'Available'), ('busy', 'Busy'), ('offline', 'Offline')], default='offline', max_length=20)),
                ('current_location', models.CharField(blank=True, max_length=255, null=True)),
                ('rating', models.DecimalField(decimal_places=2, default=5.0, max_digits=3)),
                ('total_rides', models.IntegerField(default=0)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='driver_profile', to=settings.AUTH_USER_MODEL)),
            ],
            options={}
        ),
    ]
