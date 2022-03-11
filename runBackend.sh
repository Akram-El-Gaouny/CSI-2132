source Server/env/bin/activate
cd Server
python -m pip install -r requirements.txt
cd dbProject
python manage.py runserver