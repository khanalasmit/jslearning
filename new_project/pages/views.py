from django.shortcuts import render
from django.views.generic import TemplateView
# Create your views here.
class HomepageView(TemplateView):
    template_name='pages/home.html'
    
class AboutPageView(TemplateView):
    template_name="pages/about.html"

def all_chai(request):
    return render(request,'pages/chai.html')