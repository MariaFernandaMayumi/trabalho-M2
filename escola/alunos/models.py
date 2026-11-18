from django.db import models


class Aluno(models.Model):
    nome = models.CharField(max_length=100)
    turma = models.CharField(max_length=1)
    nota = models.FloatField()

    def __str__(self):
        return self.nome
