from django.conf.urls import patterns, url

from polls_gamla import views

urlpatterns = patterns('',
    # ex: /polls_gamla/
    url(r'^$', views.index, name='index'),
    # ex: /polls_gamla/5/
    url(r'^(?P<question_id>\d+)/$', views.detail, name='detail'),
    # ex: /polls_gamla/5/results/
    url(r'^(?P<question_id>\d+)/results/$', views.results, name='results'),
    # ex: /polls_gamla/5/vote/
    url(r'^(?P<question_id>\d+)/vote/$', views.vote, name='vote'),
)