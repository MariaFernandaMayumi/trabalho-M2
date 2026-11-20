
from django.contrib import admin
from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from series import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/series/', csrf_exempt(views.api_series)),
    path('api/series/resumo/', views.resumo_series),
]
