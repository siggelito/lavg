from django.conf.urls import patterns, include, url
from django.contrib import admin
from polls_gamla import views

urlpatterns = patterns('',
    url(r'^polls_gamla/', include('polls_gamla.urls', namespace="polls_gamla")),
    url(r'^admin/', include(admin.site.urls)),
    url(r'', views.index, name='index'),
)
