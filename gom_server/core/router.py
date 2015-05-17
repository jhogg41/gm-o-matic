from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
import models

# Serializers define the API representation.
class UserSerializer(serializers.ModelSerializer):
   class Meta:
      model = User
      fields = ('url', 'username', 'email', 'get_full_name', 'character_set')
class CharacterSerializer(serializers.ModelSerializer):
   class Meta:
      model = models.Character
      fields = ('user', 'game', 'name')

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
   queryset = User.objects.all()
   serializer_class = UserSerializer
class CharacterViewSet(viewsets.ModelViewSet):
   queryset = models.Character.objects.all()
   serializer_class = CharacterSerializer

# Register actual routes when called by master urls.py
def addRoutes(router):
   router.register(r'user', UserViewSet)
   router.register(r'character', CharacterViewSet)
