# Generated migration for User model enhancements

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        # Email verification fields
        migrations.AddField(
            model_name='user',
            name='is_email_verified',
            field=models.BooleanField(default=False, verbose_name='Email Verified'),
        ),
        migrations.AddField(
            model_name='user',
            name='email_verification_token',
            field=models.CharField(blank=True, max_length=255, null=True, unique=True, verbose_name='Email Verification Token'),
        ),
        migrations.AddField(
            model_name='user',
            name='email_verified_at',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Email Verified At'),
        ),
        
        # Password reset fields
        migrations.AddField(
            model_name='user',
            name='password_reset_token',
            field=models.CharField(blank=True, max_length=255, null=True, unique=True, verbose_name='Password Reset Token'),
        ),
        migrations.AddField(
            model_name='user',
            name='password_reset_expires',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Password Reset Expires'),
        ),
        
        # Account security fields
        migrations.AddField(
            model_name='user',
            name='last_login_ip',
            field=models.GenericIPAddressField(blank=True, null=True, verbose_name='Last Login IP'),
        ),
        migrations.AddField(
            model_name='user',
            name='failed_login_attempts',
            field=models.IntegerField(default=0, verbose_name='Failed Login Attempts'),
        ),
        migrations.AddField(
            model_name='user',
            name='is_locked',
            field=models.BooleanField(default=False, verbose_name='Is Locked'),
        ),
        migrations.AddField(
            model_name='user',
            name='locked_until',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Locked Until'),
        ),
        
        # Alter email field to be unique
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, unique=True, verbose_name='Email Address'),
        ),
        
        # Add indexes for better query performance
        migrations.AddIndex(
            model_name='user',
            index=models.Index(fields=['email'], name='users_email_idx'),
        ),
        migrations.AddIndex(
            model_name='user',
            index=models.Index(fields=['username'], name='users_username_idx'),
        ),
        migrations.AddIndex(
            model_name='user',
            index=models.Index(fields=['role'], name='users_role_idx'),
        ),
        migrations.AddIndex(
            model_name='user',
            index=models.Index(fields=['is_email_verified'], name='users_is_email_verified_idx'),
        ),
    ]
