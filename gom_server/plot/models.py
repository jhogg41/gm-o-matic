from django.db import models

from django.contrib.auth.models import User
from core.models import Character

PLOT_STATUSES = (
   ('DR', 'Draft'),
   ('AP', 'Approved (not running)'),
   ('AC', 'Active'),
   ('CO', 'Complete'),
   ('KI', 'Killed'),
   ('IN', 'Inactive'),
)

PLOTPOINT_TYPES = (
   ('AC', 'Action'),
   ('NO', 'GM Note'),
   ('NP', 'NPC'),
)

class Plot(models.Model):
   owner = models.ForeignKey(User)
   status = models.CharField(max_length=2, choices=PLOT_STATUSES)
   summary = models.CharField(max_length=140)
   description = models.TextField()

class PlotPoint(models.Model):
   plot = models.ForeignKey(Plot)
   author = models.ForeignKey(User)
   type = models.CharField(max_length=2, choices=PLOTPOINT_TYPES)
