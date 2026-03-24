from django.shortcuts import redirect, render
from django.views.generic import TemplateView
from django.http import JsonResponse
import json
from .models import CharVariety, Store
from .import forms
from django.contrib.auth.decorators import login_required
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

@login_required
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

@login_required
def updating_chaistore(request,id):
    if request.method == "PATCH":
        try:
            data = json.loads(request.body)
            new_name = data.get("name")
            store = Store.objects.get(id=id)
            store.name = new_name
            store.save()
            return JsonResponse({"success": True, "message": "Store updated successfully"})
        except Store.DoesNotExist:
            return JsonResponse({"success": False, "message": "Store not found"}, status=404)
        except Exception as e:
            return JsonResponse({"success": False, "message": str(e)}, status=400)
    return JsonResponse({"success": False, "message": "Method not allowed"}, status=405)


@login_required
def deleting_chaistore(request,id):
    if request.method == "DELETE":
        try:
            Store.objects.filter(id=id).delete()
            return JsonResponse({"success":True,"message":"Store deleted"})
        except Exception as e:
            return JsonResponse({"success":False,"message":str(e)},status=400)
    return JsonResponse({"success":False,"message":"Method not allowed"},status=405)