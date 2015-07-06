# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_turn'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Action',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=140)),
                ('public_text', models.TextField()),
                ('private_text', models.TextField()),
                ('response', models.TextField()),
                ('published', models.BooleanField()),
                ('owner', models.ForeignKey(to='core.Character', null=True)),
                ('parent', models.ForeignKey(to='turnsheet.Action', null=True)),
                ('turn', models.ForeignKey(to='core.Turn')),
            ],
        ),
        migrations.CreateModel(
            name='ActionComment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('text', models.TextField()),
                ('action', models.ForeignKey(to='turnsheet.Action')),
                ('author', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ActionType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.AddField(
            model_name='action',
            name='type',
            field=models.ForeignKey(to='turnsheet.ActionType'),
        ),
    ]
