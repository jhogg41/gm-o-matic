from django.db import models

from django.contrib.auth.models import User

# Class for a Game
class Game(models.Model):
   name = models.CharField(max_length=50)
   summary = models.CharField(max_length=140)
   description = models.TextField()
   def __str__(self):
      return self.name

# Class for User Profile information
class UserProfile(models.Model):
   user = models.OneToOneField(User)
   displayname = models.CharField(max_length=50)
   def __str__(self):
      return str(self.user)
def suggest_displayname(user):
   if user.first_name == '' and user.last_name == '':
      return 'Unspecified Name'
   else:
      return user.first_name + ' ' + user.last_name[0] + '.'
User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u, defaults={'displayname': suggest_displayname(u)})[0])

# Class for a Character
class Character(models.Model):
   user = models.ForeignKey(User)
   game = models.ForeignKey(Game)
   name = models.CharField(max_length=200)
   def __str__(self):
      return self.name + '(' + self.game.name + ': ' + self.user.get_full_name() + ')'
