# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('char_attr', '0002_auto_20150606_1041'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attributetype',
            name='short_desc',
            field=models.CharField(max_length=400, blank=True),
        ),
    ]
