import allauth.account.forms
import django.forms

# Modifies allauth's default signup view to add first and last name fields
# as we require them on signup unlike django's default!
class SignupForm(allauth.account.forms.SignupForm):
   first_name = django.forms.CharField(max_length=30,required=True)
   last_name = django.forms.CharField(max_length=30,required=True)
   terms = django.forms.BooleanField(required=True) # Not saved to model
   cat = django.forms.BooleanField(required=True) # Not saved to model
