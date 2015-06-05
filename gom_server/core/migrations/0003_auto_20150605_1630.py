# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_userprofile'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='description',
            field=models.TextField(default='Not specified'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='game',
            name='summary',
            field=models.CharField(default='Unknown unknowns', max_length=140),
            preserve_default=False,
        ),
    ]
