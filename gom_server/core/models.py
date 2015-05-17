from django.db import models

from django.contrib.auth.models import User

# Class for a Game
class Game(models.Model):
   name = models.CharField(max_length=50)
   def __str__(self):
      return self.name

# Class for a Character
class Character(models.Model):
   user = models.ForeignKey(User)
   game = models.ForeignKey(Game)
   name = models.CharField(max_length=200)
   def __str__(self):
      return self.name + '(' + self.game.name + ': ' + self.user.get_full_name() + ')'
