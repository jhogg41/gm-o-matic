from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

import models

# Define and inline models to add UserProfile info to User model
class UserProfileInline(admin.StackedInline):
   model = models.UserProfile
   can_delete = False
class UserAdmin(UserAdmin):
   inlines = (UserProfileInline, )
admin.site.unregister(User)
admin.site.register(User, UserAdmin)

# Register your models here.
admin.site.register(models.Game)
admin.site.register(models.Character)
