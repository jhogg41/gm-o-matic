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
      fields = ('id', 'name', 'summary')
class GameDetailSerializer(serializers.ModelSerializer):
   class Meta:
      model = models.Game
class UserSerializer(serializers.ModelSerializer):
   displayname = serializers.CharField(source='profile.displayname')
   class Meta:
      model = User
      fields = ('username', 'email', 'first_name', 'last_name', 'displayname', 'character_set')
      lookup_field = 'username'

# ViewSets define the view behavior.
class CharacterViewSet(viewsets.ModelViewSet):
   queryset = models.Character.objects.all()
   serializer_class = CharacterSerializer
class GameViewSet(viewsets.ModelViewSet):
   queryset = models.Game.objects.all()
   serializers = {
      'default': GameDetailSerializer,
      'list': GameSerializer,
   }
   def get_serializer_class(self):
      return self.serializers.get(self.action, self.serializers['default'])

class UserViewSet(viewsets.ModelViewSet):
   queryset = User.objects.all()
   serializer_class = UserSerializer
   lookup_field = 'username'

# Register actual routes when called by master urls.py
def addRoutes(router):
   router.register(r'character', CharacterViewSet)
   router.register(r'game', GameViewSet)
   router.register(r'user', UserViewSet)
