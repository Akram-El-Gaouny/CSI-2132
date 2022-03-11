cd Server
env/Scripts/activate
python -m pip install -r requirements.txt
cd dbProject
python manage.py runserver