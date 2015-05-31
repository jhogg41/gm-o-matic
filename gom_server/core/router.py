from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
import models

# Serializers define the API representation.
class CharacterSerializer(serializers.ModelSerializer):
   class Meta:
      model = models.Character
      fields = ('user', 'game', 'name')
class GameSerializer(serializers.ModelSerializer):
   class Meta:
      model = models.Game
class UserSerializer(serializers.ModelSerializer):
   class Meta:
      model = User
      fields = ('url', 'username', 'email', 'get_full_name', 'character_set')

# ViewSets define the view behavior.
class CharacterViewSet(viewsets.ModelViewSet):
   queryset = models.Character.objects.all()
   serializer_class = CharacterSerializer
class GameViewSet(viewsets.ModelViewSet):
   queryset = models.Game.objects.all()
   serializer_class = GameSerializer
class UserViewSet(viewsets.ModelViewSet):
   queryset = User.objects.all()
   serializer_class = UserSerializer

# Register actual routes when called by master urls.py
def addRoutes(router):
   router.register(r'character', CharacterViewSet)
   router.register(r'game', GameViewSet)
   router.register(r'user', UserViewSet)
