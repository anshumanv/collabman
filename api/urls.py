from django.urls import include, path
from django.conf.urls import url


from . import views

urlpatterns = [
	#l(r'^auth/', include('rest_auth.urls')),
	url(r'^auth/', include('rest_framework_social_oauth2.urls')),
    url(r'^auth/register/', include('rest_auth.registration.urls'))
]
