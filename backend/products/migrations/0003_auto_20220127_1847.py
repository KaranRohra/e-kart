# Generated by Django 3.2.5 on 2022-01-27 13:17
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("products", "0002_recentlyviewed"),
    ]

    operations = [
        migrations.RenameField(
            model_name="recentlyviewed",
            old_name="product",
            new_name="products",
        ),
        migrations.RenameField(
            model_name="wishlist",
            old_name="product",
            new_name="products",
        ),
    ]
