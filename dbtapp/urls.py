from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static
from dbtapp import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^video/list/$', views.videoList, name='videoList'),
    #url(r'^video/new/$', views.videoNew, name='videoNew'),
    #url(r'^video/(?P<pk>\d+)/$', views.videoUpdate, name='videoUpdate'),
    url(r'^video/(?:(?P<pk>\d+)/)?$', views.videoUpdate, name='videoUpdate'),
    url(r'^video/(?P<pk>\d+)/type/(?P<imgtype>[1-3]{1})/$', views.videoStep, name='videoStep'),
    url(r'^video/(?P<pk>\d+)/edit/$', views.videoEdit, name='videoEdit'),
    url(r'^video/(?P<videoId>\d+)/type/(?P<imgtype>[1-3]{1})/remove/photo/(?P<photoId>\d+)/$', views.photoRemove, name='photoRemove'),
    url(r'^video/(?P<videoId>\d+)/remove/photo/(?P<photoId>\d+)/$', views.photoRemoveEdit, name='photoRemoveEdit'),
    url(r'^video/(?P<videoId>\d+)/photo/(?P<photoId>\d+)/add/desciption/$', views.photoDescriptionPost, name='photoDescriptionPost'),
    url(r'^video/remove/(?P<pk>\d+)/$', views.videoRemove, name='videoRemove'),
    url(r'^phantomjs/(?P<pk>\d+)/$', views.phantomjspk, name='phantomjspk'),
    url(r'^video/(?P<pk>\d+)/logoPost$', views.logoPost, name='logoPost'),
    url(r'^video/(?P<pk>\d+)/render', views.videoRender, name='videoRender'),
    #url(r'^riktigIndex/$', views.riktigIndex, name='riktigIndex')

    url(r'^drive/$', views.googleDrive, name='googleDrive'),
    url(r'^drive/callback$', views.googleDriveCallback, name='googleDriveCallback'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
