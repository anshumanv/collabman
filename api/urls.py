from django.urls import include, path
from django.conf.urls import url


from .views import login_page

app_name="rest_framework_social_oauth2"

urlpatterns = [
	url(r'^auth/', include('rest_auth.urls')),
    url(r'^auth/register/', include('rest_auth.registration.urls')),
    url(r'^login$',login_page)
    
]