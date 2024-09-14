from django.db import models
from polymorphic.models import PolymorphicModel

# Create your models here.

class Product(PolymorphicModel):
    name = models.CharField(max_length=70)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    image = models.ImageField()
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return self.name

class Clothes(Product):
    design = models.CharField(max_length=20)
    size = models.CharField(max_length=50, null=True, blank=True)

    

class Shoes(Product):
    design = models.CharField(max_length=50)
    size = models.CharField(max_length=50, null=True, blank=True)
    

#class Order(models.Model):
    #order_date = models.DateTimeField(auto_now_add=True)

class Customer(models.Model):
    name = models.CharField(max_length=80, blank=True, null=True)
    email = models.EmailField()
    phone_no = models.IntegerField(max_length=15, null=True, blank=True)
    location = models.CharField(max_length=50)
    id_no = models.IntegerField(max_length=15)

    def __str__(self):
        return self.name

class OrderProduct(models.Model):
    order_date = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    #order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    #customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True, blank=True)
    customer_name = models.CharField(max_length=100, null=True, blank=True)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f"{self.product.name} - {self.quantity} - {self.customer_name} - {self.location} - {self.amount_paid}"
        #return f"{self.quantity} x {self.product.name} in Order {self.id}"
    

class Reviews(models.Model):
    review = models.TextField()
    customer_name = models.CharField(max_length=70, null=False, blank=False, default="Unknown")

    def __str__(self):
        return self.customer_name

