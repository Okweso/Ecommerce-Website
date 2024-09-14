from rest_framework import serializers
from ecommerce.models import Clothes, OrderProduct, Customer, Shoes, Product, Reviews

class ProductSerializer(serializers.ModelSerializer):
     
     class Meta:
          model = Product
          fields = ['id', 'name', 'price', 'description', 'image', 'created_at']

class ClothesSerializer(ProductSerializer):

    class Meta(ProductSerializer.Meta):
        model = Clothes
        fields  = ProductSerializer.Meta.fields + ['design', 'size']

class ShoesSerializer(ProductSerializer):
     
     class Meta(ProductSerializer.Meta):
          model = Shoes
          fields = ProductSerializer.Meta.fields + ['design', 'size']

class CustomerSerializer(serializers.ModelSerializer):

        class Meta:
             model = Customer
             fields = '__all__'

class OrderProductSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField()

    class Meta:
        model = OrderProduct
        fields = ['id', 'order_date', 'customer_name', 'product', 'quantity', 'amount_paid', 'phone_number', 'location', 'product_name']
    def get_product_name(self, obj):
        return obj.product.name
    
class ReviewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reviews
        fields = ['review', 'customer_name']

'''class OrderSerializer(serializers.ModelSerializer):
    order_products = OrderProductSerializer(many=True)

    class Meta:
        model=Order
        fields = ['id', 'order_date', 'order_products']
    
    def create(self, validated_data):
        order_products_data = validated_data.pop('order_products')
        order = Order.objects.create(**validated_data)

        for order_product_data in order_products_data:
            OrderProduct.objects.create(order=order, **order_product_data)
        return order
    
    def update(self, instance, validated_data):
        order_products_data = validated_data.pop('order_products', None)

        if order_products_data is not None:
            instance.order.products.all().delete()
            for order_product_data in order_products_data:
                OrderProduct.objects.create(order=instance, **order_product_data)
        return instance'''