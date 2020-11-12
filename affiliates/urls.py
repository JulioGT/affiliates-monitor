from django.urls import path, include

urlpatterns = [
    path("", include("campaigns.urls")),
    path("", include("frontend.urls")),
]
