# Generated by Django 3.2.5 on 2022-03-03 11:06
from django.db import migrations
from django.db import models


class Migration(migrations.Migration):

    dependencies = [
        ("products", "0004_auto_20220303_1627"),
    ]

    operations = [
        migrations.AddField(
            model_name="userratingsandreviewslikes",
            name="dislike",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="userratingsandreviewslikes",
            name="like",
            field=models.BooleanField(default=False),
        ),
    ]