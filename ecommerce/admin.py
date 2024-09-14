from django.contrib import admin
from .models import Clothes, OrderProduct, Customer, Shoes

# Register your models here.

admin.site.register(Clothes)
#admin.site.register(Order)
admin.site.register(OrderProduct)
admin.site.register(Customer)
admin.site.register(Shoes)