import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Aluno


@csrf_exempt
def api_alunos(request):
    if request.method == "POST":
        dados = json.loads(request.body)
        aluno = Aluno.objects.create(
            nome=dados["nome"],
            turma=dados["turma"],
            nota=dados["nota"],
        )
        return JsonResponse({"id": aluno.id}, status=201)

    alunos = list(Aluno.objects.values())
    return JsonResponse(alunos, safe=False)
