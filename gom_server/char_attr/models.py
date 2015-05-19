from django.db import models
import core.models

# Create your models here.
class AttributeType(models.Model):
   game = models.ForeignKey(core.models.Game)
   title = models.CharField(max_length=50)
   short_desc = models.CharField(max_length=400)
   def __str__(self):
      return self.game.name + ': ' + self.title

class Attribute(models.Model):
   atype = models.ForeignKey(AttributeType)
   name = models.CharField(max_length=50)
   desc = models.TextField()
   validValues = models.MulitpleChoiceField()
   allowFreeValues = models.BooleanField()

