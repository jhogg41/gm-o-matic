# gm-o-matic
Tool for handling downtimes for freeform and similar roleplaying games. This tool has been largely designed for use by the Oxford University Roleplaying Soceity, but may be of use in other use-cases.

Bugs, comments and other requests to jhogg41 .a.t. gmail

## Installation
1. Recommend you create a virtualenv:
virtualenv env
source env/bin/activate
pip install django
pip install djangorestframework
pip install django-rest-auth
pip install django-allauth
2. Change the security key in the gom_server/gom_server/settings.py
3. Adjust database settings as you wish. Run ./manage.py migrate to instantiate.
4. Serve the gom_client/app directory as static web root of www.gom.com.
5. Serve gom_server/wsgi.py as a WSGI webapp at www.gom.com/api.
