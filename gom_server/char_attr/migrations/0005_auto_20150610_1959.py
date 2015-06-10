# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('char_attr', '0004_auto_20150608_1258'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attribute',
            name='req_desc',
            field=models.BooleanField(default=False),
        ),
    ]
