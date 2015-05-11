from django.shortcuts import render
from dbtapp.phantomjs import PhantomjsTest


def index(request):
    PhantomjsTest()
    return render(request, 'dbtapp/index.html')