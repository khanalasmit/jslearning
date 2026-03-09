from django.urls import path
from .views import *

urlpatterns = [
    path('',HomepageView.as_view(),name='home'),
    path('about/',AboutPageView.as_view(),name="about"),
    path('chai/',all_chai,name='chai')
]
