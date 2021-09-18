from products import views
from rest_framework import routers

route = routers.DefaultRouter()
route.register("", views.ProductAPI, basename="products")
urlpatterns = route.urls
