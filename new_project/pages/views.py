from django.shortcuts import redirect, render
from django.views.generic import TemplateView
from .models import CharVariety, Store
from .import forms
# Create your views here.
class HomepageView(TemplateView):
    template_name='pages/home.html'
    
class AboutPageView(TemplateView):
    template_name="pages/about.html"

def all_chai(request):
    chais = CharVariety.objects.all()
    return render(request,'pages/chai.html',{'chais':chais})

def definite_chai(request,chai_id):
    chai=CharVariety.objects.get(id = chai_id)
    return render(request,'pages/specific_chai.html',{'chai':chai})

def chai_store(request):
    if request.method == 'POST':
        form = forms.StoreForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('chai_stores')
    else:
        form = forms.StoreForm()

    stores = Store.objects.prefetch_related('chai_varieties').all()
    return render(request,'pages/chai_stores.html', {'form':form, 'stores':stores})