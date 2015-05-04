from django.conf.urls import url

from dbtapp import views

urlpatterns = [
     url(r'^$', views.index, name='index'),
     url(r'^riktigIndex/$', views.riktigIndex, name='riktigIndex')
]