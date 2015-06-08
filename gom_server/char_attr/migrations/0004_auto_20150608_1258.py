# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import char_attr.models


class Migration(migrations.Migration):

    dependencies = [
        ('char_attr', '0003_auto_20150606_1911'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attribute',
            name='costModel',
            field=models.ForeignKey(default=char_attr.models.get_default_cost_model, to='char_attr.CostModel'),
        ),
        migrations.AlterField(
            model_name='attribute',
            name='desc',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='attribute',
            name='maxVal',
            field=models.IntegerField(default=5),
        ),
        migrations.AlterField(
            model_name='attribute',
            name='minVal',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='attribute',
            name='req_desc',
            field=models.BinaryField(default=False),
        ),
        migrations.AlterField(
            model_name='attribute',
            name='vtype',
            field=models.CharField(default=b'bool', max_length=5, choices=[(b'bool', b'Boolean'), (b'int', b'Integer')]),
        ),
    ]
