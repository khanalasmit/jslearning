from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
# Create your models here.

class CharVariety(models.Model):
    CHAI_TYPE_CHOICE=[
        ('ML','CHOICE'),
        ('GR','GINGER'),
        ('KL','KIWI'),
        ('PL','PLAIN'),
        ('EL','ELAICHI'),
        
    ]
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='chais/')
    date_added = models.DateTimeField(default=timezone.now)
    type=models.CharField(max_length=2,choices=CHAI_TYPE_CHOICE)
    description = models.TextField(default='empty')
    
    def __str__(self):
        return self.name


class Store(models.Model):
    name = models.CharField(max_length=100)
    chai_varieties = models.ManyToManyField(CharVariety, related_name='stores')

    def __str__(self):
        return self.name
    
    