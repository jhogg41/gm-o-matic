from rest_framework import routers, serializers, viewsets
import models

# Serializers define the API representation.
class AttributeSerializer(serializers.ModelSerializer):
   class Meta:
      model = models.Attribute
class AttributeTypeSerializer(serializers.ModelSerializer):
   attributes = AttributeSerializer(many=True, read_only=True)
   class Meta:
      model = models.AttributeType
      fields = ('id', 'game', 'title', 'short_desc', 'attributes')

# ViewSets define the view behavior.
class AttributesViewSet(viewsets.ModelViewSet):
   serializer_class = AttributeTypeSerializer
   def get_queryset(self):
      gameid = self.kwargs['gameid']
      return models.AttributeType.objects.filter(game=gameid)

# Register actual routes when called by master urls.py
def addRoutes(router):
   router.register(r'attrib/(?P<gameid>[0-9]+)', AttributesViewSet, base_name='attributes')
