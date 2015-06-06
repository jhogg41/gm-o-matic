# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('char_attr', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='numericattribute',
            name='attribute_ptr',
        ),
        migrations.DeleteModel(
            name='NumericAttribute',
        ),
        migrations.AddField(
            model_name='attribute',
            name='maxVal',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='attribute',
            name='minVal',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='attribute',
            name='vtype',
            field=models.CharField(default='bool', max_length=5, choices=[(b'bool', b'Boolean'), (b'int', b'Integer')]),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='attribute',
            name='atype',
            field=models.ForeignKey(related_name='attributes', to='char_attr.AttributeType'),
        ),
    ]
