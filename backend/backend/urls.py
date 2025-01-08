
from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView 
# import TokenObtainPairView dan TokenRefreshView dari rest_framework_simplejwt.views 
# TokenObtainPairView digunakan untuk mendapatkan token
# TokenRefreshView digunakan untuk refresh token
# TokenObtainPairView dan TokenRefreshView adalah class yang sudah disediakan oleh rest_framework_simplejwt

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"), 
    # untuk membuat user baru
    # CreateUserView.as_view() adalah class yang akan dijalankan ketika endpoint ini diakses
    # name="register" adalah nama endpoint yang akan digunakan
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    # untuk mendapatkan token
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # untuk refresh token
    path("api-auth/", include("rest_framework.urls")),
    # untuk menggunakan rest_framework.urls
    # rest_framework.urls adalah endpoint yang digunakan untuk login dan logout
    # include("rest_framework.urls") artinya kita akan menggunakan endpoint login dan logout yang disediakan oleh rest_framework
    path("api/", include("api.urls")),
]
