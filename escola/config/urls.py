from django.contrib import admin
from django.urls import path

from alunos.views import api_alunos

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/alunos/", api_alunos),
]
