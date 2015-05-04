from django.shortcuts import render


def index(request):
    return render(request, 'dbtapp/index.html')

def riktigIndex(request):
    return render(request, 'dbtapp/riktigIndex.html')