from django.db import models

from django.contrib.auth.models import User

# Class for a Game
class Game(models.Model):
   name = models.CharField(max_length=50)

# Class for a Character
class Character(models.Model):
   user = models.ForeignKey(User)
   game = models.ForeignKey(Game)
   name = models.CharField(max_length=200)
