
import json
import math

from django.http import JsonResponse
from .models import Serie


def api_series(request):

    if request.method == 'GET':
        series = Serie.objects.all()
        dados = []

        for serie in series:
            dados.append({
                "id": serie.id,
                "titulo": serie.titulo,
                "plataforma": serie.plataforma,
                "ano": serie.ano,
                "avaliacao": serie.avaliacao
            })

        return JsonResponse(dados, safe=False)

    if request.method == 'POST':
        try:
            dados = json.loads(request.body)

            if not isinstance(dados, dict):
                raise ValueError()

            titulo = dados['titulo']
            plataforma = dados['plataforma']
            ano = dados['ano']
            avaliacao = dados['avaliacao']

            if (
                not isinstance(titulo, str)
                or not titulo.strip()
                or len(titulo) > 100
                or not isinstance(plataforma, str)
                or not plataforma.strip()
                or len(plataforma) > 100
                or type(ano) is not int
                or type(avaliacao) not in (int, float)
            ):
                raise ValueError()

            if ano < 1900 or ano > 2026:
                return JsonResponse({
                    "erro": "O ano deve estar entre 1900 e 2026."
                }, status=400)

            if not math.isfinite(avaliacao) or not 0 <= avaliacao <= 10:
                return JsonResponse({
                    "erro": "A avaliação deve estar entre 0 e 10."
                }, status=400)

            serie = Serie.objects.create(
                titulo=titulo.strip(),
                plataforma=plataforma.strip(),
                ano=ano,
                avaliacao=avaliacao
            )

            return JsonResponse({
                "id": serie.id
            }, status=201)

        except (ValueError, TypeError, KeyError):
            return JsonResponse({
                "erro": "Dados inválidos. Verifique os quatro campos."
            }, status=400)

    return JsonResponse({
        "erro": "Método não permitido"
    }, status=405)


def resumo_series(request):

    if request.method != 'GET':
        return JsonResponse({
            "erro": "Método não permitido"
        }, status=405)

    series = Serie.objects.all()
    total = len(series)
    soma = 0
    melhor = None

    for serie in series:
        soma += serie.avaliacao

        if melhor is None or serie.avaliacao > melhor.avaliacao:
            melhor = serie

    if total == 0:
        media = 0
        melhor_titulo = None
    else:
        media = round(soma / total, 2)
        melhor_titulo = melhor.titulo

    return JsonResponse({
        "total": total,
        "media_avaliacao": media,
        "melhor": melhor_titulo
    })
