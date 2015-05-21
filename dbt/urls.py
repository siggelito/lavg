from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    url(r'', include('dbtapp.urls', namespace="dbtapp")),
    url(r'^admin/', include(admin.site.urls)),
)
