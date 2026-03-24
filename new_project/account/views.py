from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect
from account.forms import *

# Create your views here.

def register(request):
    form = RegistrationForm()
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = User.objects.create_user(
                username = form.cleaned_data['username'],
                email = form.cleaned_data['email'],
                password=form.cleaned_data['password']
            )
            return HttpResponseRedirect('/account/login/')
    return render(request, 'account/register.html', {'form': form})

def user_login(request):
    form = LoginForm()
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request,username= username,password=password)
            if user is not None:
                login(request,user)
                return HttpResponseRedirect('/')
            
    return render(request,'account/login.html',{'form':form})

def user_logout(request):
    logout(request)
    return HttpResponseRedirect('/account/login/')