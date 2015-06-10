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
def get_default_cost_model():
   return CostModel.objects.get(name='Linear')
class Attribute(models.Model):
   atype = models.ForeignKey(AttributeType, related_name='attributes')
   vtype = models.CharField(max_length=5, choices=VTYPE_CHOICES, default='bool')
   name = models.CharField(max_length=50)
   desc = models.TextField(blank=True)
   req_desc = models.BooleanField(default=False)
   costModel = models.ForeignKey(CostModel, default=get_default_cost_model)
   minVal = models.IntegerField(default=0)
   maxVal = models.IntegerField(default=5)
   def __str__(self):
      return self.name + ' ('+str(self.atype)+')'
