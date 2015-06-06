from django.db import models
import core.models

# Types of value we can have
VTYPE_CHOICES = (
   ('bool', 'Boolean'),
   ('int', 'Integer'),
)

# Type of attributes so they can be grouped. eg Quirk or Skill
class AttributeType(models.Model): 
   game = models.ForeignKey(core.models.Game)
   title = models.CharField(max_length=50)
   short_desc = models.CharField(max_length=400, blank=True)
   def __str__(self):
      return self.game.name + ': ' + self.title

# Class describing cost model for an attribute
class CostModel(models.Model):
   name = models.CharField(max_length=50)
   def __str__(self):
      return self.name

# Class for value, price pairs. Each pair belongs to a CostModel
class CostPair(models.Model):
   value = models.IntegerField()
   price = models.IntegerField()
   model = models.ForeignKey(CostModel)
   def __str__(self):
      return self.model.name+'('+self.value+', '+self.price+')'

# Class describing a basic attribute
class Attribute(models.Model):
   atype = models.ForeignKey(AttributeType, related_name='attributes')
   vtype = models.CharField(max_length=5, choices=VTYPE_CHOICES)
   name = models.CharField(max_length=50)
   desc = models.TextField()
   req_desc = models.BinaryField()
   costModel = models.ForeignKey(CostModel)
   minVal = models.IntegerField()
   maxVal = models.IntegerField()
   def __str__(self):
      return self.name + ' ('+str(self.atype)+')'
