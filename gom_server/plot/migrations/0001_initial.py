# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Plot',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('status', models.CharField(max_length=2, choices=[(b'DR', b'Draft'), (b'AP', b'Approved (not running)'), (b'AC', b'Active'), (b'CO', b'Complete'), (b'KI', b'Killed'), (b'IN', b'Inactive')])),
                ('summary', models.CharField(max_length=140)),
                ('description', models.TextField()),
                ('owner', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PlotPoint',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('type', models.CharField(max_length=2, choices=[(b'AC', b'Action'), (b'NO', b'GM Note'), (b'NP', b'NPC')])),
                ('author', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
                ('plot', models.ForeignKey(to='plot.Plot')),
            ],
        ),
    ]
