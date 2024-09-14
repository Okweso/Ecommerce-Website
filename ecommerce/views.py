from django.shortcuts import render
from ecommerce.models import Clothes, OrderProduct, Customer, Shoes, Reviews, Product
from ecommerce.serializers import ClothesSerializer, OrderProductSerializer, CustomerSerializer, ShoesSerializer, ReviewsSerializer, ProductSerializer
from rest_framework import generics
from rest_framework import viewsets
from rest_framework.response import Response
from django.http import Http404
from ecommerce.mpesa_utils import lipa_na_mpesa_online
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from django.utils import timezone
import json
from rest_framework.decorators import api_view


# Create your views here.

'''class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()

    def get_serializer_class(self):
        if self.request.data.get('type') == 'clothes':
        #if isinstance(self.get_object(), Clothes):
            return ClothesSerializer
        if self.request.data.get('type') == 'shoes':
        #if isinstance(self.get_object(), Shoes):
            return ShoesSerializer
        return ProductSerializer
    #lookup_field = 'id' '''

class ClothesViewSet(viewsets.ModelViewSet):
    queryset = Clothes.objects.all()
    serializer_class = ClothesSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        print(f"Attempting to delete product with ID {instance.id}")
        self.perform_destroy(instance)
        print(f"Product {instance.id} has been successfully deleted")
        return Response(status=status.HTTP_204_NO_CONTENT)

class ShoesViewSet(viewsets.ModelViewSet):
    queryset = Shoes.objects.all()
    serializer_class = ShoesSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class OrderProductViewSet(viewsets.ModelViewSet):
    queryset = OrderProduct.objects.all()
    serializer_class = OrderProductSerializer

class ReviewsViewSet(viewsets.ModelViewSet):
    queryset = Reviews.objects.all()
    serializer_class = ReviewsSerializer

@api_view(['POST'])
@csrf_exempt
def initiate_payment(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        phone_number = data.get('phone_number')
        amount = data.get('amount')
        product_id = data.get('product_id')
        customer_name = data.get('customer_name')
        quantity = data.get('quantity')
        location = data.get('location')

        print(product_id, phone_number, amount, customer_name, location)
        #print(request.POST.get('phone_number'), request.POST.get('product_id'), request.POST.get('amount'))

        product = Product.objects.get(id=product_id)

       
        transaction_desc = f"Payment for Order {product.name}"
        

       

        if not phone_number or not amount or not customer_name:
            return Response({'success': False, 'message': 'Missing required fields'}, status=400)

        response = lipa_na_mpesa_online(phone_number, amount, product_id, transaction_desc)

        if response.get('ResponseCode') == '0':
             #creating an order and saving it to the database
            order = OrderProduct.objects.create(
            customer_name = customer_name,
            product = product,
            quantity = quantity,
            order_date = timezone.now(),
            amount_paid = amount,
            phone_number = phone_number,
            location = location
            )
            
            print(f"Phone Number: {phone_number}, Amount: {amount}, Order ID: {order.id}, Name: {customer_name}, Quantity: {quantity}, Location: {location}")
            return Response({'success': True, 'message': 'Payment initiated successfully!'})
        else:
            return Response({'success': False, 'message': response.get('errorMessage', 'Payment failed')})
    
    return render(request, 'payments/mpesa_payment_form.html')


@csrf_exempt
def mpesa_callback(request):
    mpesa_body = request.body.decode('utf-8')
    mpesa_payment = json.loads(mpesa_body)

    # Extract payment status and other details from the callback data
    result_code = mpesa_payment.get('Body', {}).get('stkCallback', {}).get('ResultCode')
    merchant_request_id = mpesa_payment.get('Body', {}).get('stkCallback', {}).get('MerchantRequestID')
    checkout_request_id = mpesa_payment.get('Body', {}).get('stkCallback', {}).get('CheckoutRequestID')
    amount = mpesa_payment.get('Body', {}).get('stkCallback', {}).get('CallbackMetadata', {}).get('Item', [{}])[0].get('Value')
    phone_number = mpesa_payment.get('Body', {}).get('stkCallback', {}).get('CallbackMetadata', {}).get('Item', [{}])[1].get('Value')

    if result_code == 0:  # Payment successful
        

        # Create the order
        order = OrderProduct.objects.create(
            customer_name=initiate_payment().customer_name,
            product=initiate_payment().product,
            quantity=initiate_payment().quantity,
            order_date=timezone.now(),
            amount_paid=amount,
            phone_number=phone_number,
            location=initiate_payment().location
        )
        
        print(f"Order created: {order.id}")

    return Response({"ResultCode": 0, "ResultDesc": "Accepted"})







'''@csrf_exempt
def mpesa_callback(request):
    mpesa_body = request.body.decode('utf-8')
    mpesa_payment = json.loads(mpesa_body)
    
    # Process the payment details received in the callback
    # Example: Save to database, update order status, etc.

    return Response({"ResultCode": 0, "ResultDesc": "Accepted"})'''