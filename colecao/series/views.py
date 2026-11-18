from django.shortcuts import render
from django.http import JsonResponse 
from .models import Serie

def listar_Series(request):
    series = Serie.objects.all()

    dados = []

    for serie in series:
        dados.append({
            "id": serie.id,
            "titulo": serie.titulo,
            "ano": serie.ano,
            "avaliacao": serie.avaliacao,
            "plataforma": serie.plataforma,
        })

    return JsonResponse(dados, safe=False)
