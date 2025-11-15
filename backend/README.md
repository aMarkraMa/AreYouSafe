# Backend API - Are You Safe

API FastAPI pour le système de signalement visuel de harcèlement scolaire.

## Installation

```bash
# Créer un environnement virtuel (recommandé)
python -m venv venv

# Activer l'environnement virtuel
# Sur macOS/Linux:
source venv/bin/activate
# Sur Windows:
venv\Scripts\activate

# Installer les dépendances
pip install -r requirements.txt
```

## Lancement

```bash
python main.py
```

Le serveur sera accessible sur `http://localhost:8000`

## Documentation API

Une fois le serveur lancé, la documentation interactive est disponible sur :
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Endpoints

- `GET /` - Informations sur l'API
- `GET /api/symbols` - Liste des symboles disponibles
- `GET /api/locations` - Liste des lieux disponibles
- `POST /api/reports` - Créer un nouveau signalement
- `GET /api/reports` - Récupérer tous les signalements
- `GET /api/reports/{report_id}` - Récupérer un signalement spécifique
- `PUT /api/reports/{report_id}` - Mettre à jour un signalement
- `GET /api/reports/student/{student_id}` - Récupérer les signalements d'un étudiant

## Notes

- Les données sont stockées en mémoire (à remplacer par une base de données en production)
- CORS est configuré pour accepter les requêtes depuis `http://localhost:5173` et `http://localhost:3000`

