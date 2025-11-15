# Guide de démarrage rapide - Are You Safe

## Démarrage rapide

### 1. Backend (Terminal 1)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

Le backend sera accessible sur `http://localhost:8000`

### 2. Frontend (Terminal 2)

```bash
# Dans le dossier racine du projet
npm install  # ou pnpm install
npm run dev  # ou pnpm dev
```

Le frontend sera accessible sur `http://localhost:5173`

## Test de l'application

1. Ouvrez `http://localhost:5173` dans votre navigateur
2. Cliquez sur "Accéder au dashboard étudiant"
3. Créez un signalement en suivant les étapes :
   - Étape 1 : Sélectionnez des symboles
   - Étape 2 : Indiquez votre état émotionnel
   - Étape 3 : Choisissez le lieu
   - Étape 4 : Indiquez la fréquence
   - Étape 5 : Indiquez votre niveau de sécurité (et carte corporelle si harcèlement physique)
4. Soumettez le signalement
5. Retournez à la page d'accueil et cliquez sur "Accéder au dashboard enseignant"
6. Consultez le signalement que vous venez de créer

## Structure des fichiers créés

### Backend
- `backend/main.py` - API FastAPI avec tous les endpoints
- `backend/requirements.txt` - Dépendances Python

### Frontend
- `src/pages/Home/` - Page d'accueil
- `src/pages/StudentDashboard/` - Dashboard étudiant
- `src/pages/TeacherDashboard/` - Dashboard enseignant
- `src/components/reporting/` - Composants de signalement :
  - `SymbolSelector.tsx` - Sélecteur de symboles
  - `BodyMap.tsx` - Carte corporelle
  - `EmotionScale.tsx` - Échelle émotionnelle
  - `SafetyThermometer.tsx` - Thermomètre de sécurité
- `src/lib/api.ts` - Service API pour communiquer avec le backend

## Notes importantes

- Assurez-vous que le backend est lancé avant le frontend
- Les données sont stockées en mémoire (perdues au redémarrage du backend)
- L'authentification n'est pas encore implémentée (à ajouter plus tard)

