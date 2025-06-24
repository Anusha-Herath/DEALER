from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import BearerRateViewSet, SlabLevelViewSet, SO_TYPESViewSet,PackageRateViewSet, SchemeViewSet, BlacklistViewSet
#from .views import ProductViewSet


router = DefaultRouter()
router.register(r'schemes', SchemeViewSet)
router.register(r'package-rates',PackageRateViewSet)
router.register(r'blacklist', views.BlacklistViewSet)
router.register(r'so_types', SO_TYPESViewSet)
router.register(r'slab_level', SlabLevelViewSet)
router.register(r'bearer-rates',BearerRateViewSet)

urlpatterns = [
    #path('bearer-rates/', BearerRateListCreateView.as_view(), name='bearer-rate-list-create'),
    #path('bearer-rates/<int:pk>/', BearerRateRetrieveUpdateDestroyView.as_view(), name='bearer-rate-retrieve-update-destroy'),
    
    # path('slab_level/', SlabLevelListCreateView.as_view(), name='slab_level_list_create'),
    # path('slab_level/<int:pk>/', SlabLevelDetailView.as_view(), name='slab_level_detail'),
    path('', include(router.urls)),  # Include router URLs
    
]


# Define the URL patterns

