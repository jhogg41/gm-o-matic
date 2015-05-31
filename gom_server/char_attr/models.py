from django.db import models
import core.models

# Type of attributes so they can be grouped. eg Quirk or Skill
class AttributeType(models.Model): 
   game = models.ForeignKey(core.models.Game)
   title = models.CharField(max_length=50)
   short_desc = models.CharField(max_length=400)
   def __str__(self):
      return self.game.name + ': ' + self.title

# Class describing cost model for an attribute
class CostModel(models.Model):
   name = models.CharField(max_length=50)

# Class for value, price pairs. Each pair belongs to a CostModel
class CostPair(models.Model):
   value = models.IntegerField()
   price = models.IntegerField()
   model = models.ForeignKey(CostModel)

# Class describing a basic attribute
class Attribute(models.Model):
   atype = models.ForeignKey(AttributeType)
   name = models.CharField(max_length=50)
   desc = models.TextField()
   req_desc = models.BinaryField()
   costModel = models.ForeignKey(CostModel)

# Class describing a numerical value from a given range of integers
class NumericAttribute(Attribute):
   minVal = models.IntegerField()
   maxVal = models.IntegerField()
