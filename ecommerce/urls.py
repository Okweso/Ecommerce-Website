from django.urls import path, include
from .views import ClothesViewSet, OrderProductViewSet, CustomerViewSet, ShoesViewSet, ReviewsViewSet, initiate_payment, mpesa_callback
from rest_framework.routers import DefaultRouter
from ecommerce import views
from django.conf import settings
from django.conf.urls.static import static

snippet_list = ClothesViewSet.as_view({
    'get': 'list',
    'post': 'create',
})
snippet_detail = ClothesViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy',
})

snippet_list = ShoesViewSet.as_view({
    'get': 'list',
    'post': 'create',
})
snippet_detail = ShoesViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy',
})

snippet_list = OrderProductViewSet.as_view({
    'get': 'list',
    'post': 'create',
})
snippet_detail = OrderProductViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy',
})

snippet_list = CustomerViewSet.as_view({
    'get': 'list',
    'post': 'create',
})
snippet_detail = CustomerViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy',
})

snippet_list = ReviewsViewSet.as_view({
    'get': 'list',
    'post': 'create',
})
snippet_detail =ReviewsViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy',
})

router = DefaultRouter()
router.register(r'products-clothes', views.ClothesViewSet, basename='clothes')
router.register(r'products-shoes', views.ShoesViewSet, basename='shoes')
router.register(r'order-products', views.OrderProductViewSet, basename='order_product')
router.register(r'customer', views.CustomerViewSet, basename='customer')
router.register(r'reviews', views.ReviewsViewSet, basename='reviews')

urlpatterns = [
    path('', include(router.urls)),
    path('initiate_payment/', initiate_payment, name='initiate_payment'),
    path('api/mpesa/callback/', mpesa_callback, name='mpesa_callback'),
    #path('products/', ProductAPIView.as_view(), name='product_list'),
    #path('order-product/', OrderProductAPIView.as_view(), name='order_list')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)