# Generated by Django 5.1.1 on 2024-09-05 08:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0004_clothes_shoes'),
    ]

    operations = [
        migrations.AddField(
            model_name='clothes',
            name='size',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='shoes',
            name='size',
            field=models.IntegerField(blank=True, max_length=10, null=True),
        ),
    ]
