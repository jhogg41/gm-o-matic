from django.db import models

from django.contrib.auth.models import User
from plot.models import Plot
from core.models import Character, Turn

# e.g. Minor or Major
class ActionType(models.Model):
   name = models.CharField(max_length=30)

class Action(models.Model):
   owner = models.ForeignKey(Character, null=True) # Character owning action
   turn = models.ForeignKey(Turn) # Turn action is from
   title = models.CharField(max_length=140) # Title of action
   type = models.ForeignKey(ActionType) # Type of action
   public_text = models.TextField() # Visible to all members if is_public=true
   private_text = models.TextField() # Only visible to owner
   response = models.TextField() # Response to action
   published = models.BooleanField() # Is response visible to player yet?
   parent = models.ForeignKey('self', null=True) # parent action

class ActionComment(models.Model):
   action = models.ForeignKey(Action)
   author = models.ForeignKey(User) # author
   text = models.TextField() # actual comment
