Para subir o backend em um terminal:

esteja dentro da pasta escola (cd escola);
pip install django django-cors-headers (caso dê erro no windows, utilize py -m antes do comando);
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

Para subir o frontend em outro terminal:
esteja dentro da pasta frontend dentro de escola (cd escola e depois cd frontend);
npm install (pra carregar as dependências do vite);
npm run dev
