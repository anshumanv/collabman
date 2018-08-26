from django.urls import include, path
from django.conf.urls import url


from . import views

urlpatterns = [
	url(r'^auth/', include('rest_auth.urls')),
    url(r'^auth/register/', include('rest_auth.registration.urls'))
]
