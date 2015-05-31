# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Attribute',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('desc', models.TextField()),
                ('req_desc', models.BinaryField()),
            ],
        ),
        migrations.CreateModel(
            name='AttributeType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=50)),
                ('short_desc', models.CharField(max_length=400)),
                ('game', models.ForeignKey(to='core.Game')),
            ],
        ),
        migrations.CreateModel(
            name='CostModel',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='CostPair',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('value', models.IntegerField()),
                ('price', models.IntegerField()),
                ('model', models.ForeignKey(to='char_attr.CostModel')),
            ],
        ),
        migrations.CreateModel(
            name='NumericAttribute',
            fields=[
                ('attribute_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='char_attr.Attribute')),
                ('minVal', models.IntegerField()),
                ('maxVal', models.IntegerField()),
            ],
            bases=('char_attr.attribute',),
        ),
        migrations.AddField(
            model_name='attribute',
            name='atype',
            field=models.ForeignKey(to='char_attr.AttributeType'),
        ),
        migrations.AddField(
            model_name='attribute',
            name='costModel',
            field=models.ForeignKey(to='char_attr.CostModel'),
        ),
    ]
