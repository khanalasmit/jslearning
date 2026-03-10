from django.urls import path
from .views import *

urlpatterns = [
    path('',HomepageView.as_view(),name='home'),
    path('about/',AboutPageView.as_view(),name="about"),
    path('chai/',all_chai,name='chai'),
    path('chai/<int:chai_id>',definite_chai,name="specific_chai"),
    path('chai_stores/',chai_store,name='chai_stores')
]
