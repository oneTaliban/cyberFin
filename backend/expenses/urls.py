from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExpenseViewset, ExpenseCategoryViewSet

router = DefaultRouter()
router.register(r'categories', ExpenseCategoryViewSet)
router.register(r'', ExpenseViewset, basename='expense')

urlpatterns = [
    path('', include(router.urls)),
]