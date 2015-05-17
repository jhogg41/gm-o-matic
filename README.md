# gm-o-matic
Tool for handling downtimes for freeform and similar roleplaying games. This tool has been largely designed for use by the Oxford University Roleplaying Soceity, but may be of use in other use-cases.

Bugs, comments and other requests to jhogg41 .a.t. gmail

# Installation
1. Recommend you create a virtualenv:
virtualenv env
source env/bin/activate
pip install django
pip install djangorestframework
2. Change the security key in the gom_server/gom_server/settings.py
3. Adjust database settings as you wish.
4. Serve the gom_client directory as web root.
5. Then point your favourite webstack at gom_server/wsgi.py (I use nginx/uwsgi). Serve as /api, not as root.
