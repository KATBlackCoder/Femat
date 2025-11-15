# Guide Spec-Kit pour le Site Web FEMAT

## ✅ Ce qui a été fait

1. ✅ Structure spec-kit créée (`.specify/`, templates)
2. ✅ Constitution du projet créée (`.specify/memory/constitution.md`)
3. ✅ Fichier CLAUDE.md créé
4. ✅ Spécification initiale créée (`specs/001-site-web-femat/spec.md`)

## 📋 Prochaines étapes

### Étape 1: Créer le plan d'implémentation

Utilisez la commande `/speckit.plan` dans Cursor pour générer le plan d'implémentation à partir de la spécification.

**Commande à utiliser**:
```
/speckit.plan
```

Cette commande va :
- Lire la spécification `specs/001-site-web-femat/spec.md`
- Créer un fichier `plan.md` avec les détails techniques
- Générer `research.md` avec les recherches nécessaires
- Créer les fichiers de design (`data-model.md`, `quickstart.md`)

### Étape 2: Générer les tâches

Après avoir créé le plan, utilisez `/speckit.tasks` pour générer la liste détaillée des tâches.

**Commande à utiliser**:
```
/speckit.tasks
```

Cette commande va créer `tasks.md` avec :
- Toutes les tâches à accomplir
- L'ordre d'exécution (dépendances)
- Les fichiers à créer/modifier
- Les checkpoints de validation

### Étape 3: Implémenter

Une fois les tâches générées, utilisez `/speckit.implement` pour commencer l'implémentation.

**Commande à utiliser**:
```
/speckit.implement
```

Cette commande va :
- Exécuter les tâches dans l'ordre
- Créer les fichiers nécessaires
- Implémenter les fonctionnalités selon le plan

## 📁 Structure du projet

```
femat/
├── app/                    # Application Nuxt
│   ├── pages/             # Pages du site
│   ├── components/        # Composants réutilisables
│   ├── layouts/           # Layouts
│   └── assets/           # Assets (CSS, etc.)
├── public/                # Assets statiques (logo, favicons)
├── specs/                 # Spécifications Spec-Driven Development
│   └── 001-site-web-femat/
│       ├── spec.md       # ✅ Spécification créée
│       ├── plan.md       # ⏳ À créer avec /speckit.plan
│       ├── tasks.md      # ⏳ À créer avec /speckit.tasks
│       └── research.md   # ⏳ À créer avec /speckit.plan
├── .specify/              # Configuration spec-kit
│   ├── memory/
│   │   └── constitution.md  # ✅ Constitution créée
│   └── templates/        # Templates pour spec-kit
└── CLAUDE.md             # ✅ Fichier de référence créé
```

## 🎨 Design et Couleurs

Le site doit utiliser les couleurs du drapeau malien (présentes dans le logo) :
- **Vert**: #00853F
- **Jaune**: #FCD116
- **Rouge**: #CE1126

## 🚀 Commandes disponibles

### Commandes Spec-Kit

- `/speckit.plan` - Génère le plan d'implémentation depuis la spec
- `/speckit.tasks` - Génère les tâches depuis le plan
- `/speckit.implement` - Implémente les fonctionnalités
- `/speckit.analyze` - Analyse la cohérence des artefacts
- `/speckit.clarify` - Clarifie les ambiguïtés dans la spec

### Commandes Nuxt

- `pnpm dev` - Démarrer le serveur de développement
- `pnpm build` - Construire pour la production
- `pnpm generate` - Générer le site statique
- `pnpm preview` - Prévisualiser le build de production

## 📝 Notes importantes

1. **Spec-Driven Development**: Toujours créer une spec avant d'implémenter
2. **Constitution**: Respecter les principes définis dans `.specify/memory/constitution.md`
3. **Mobile-First**: Toujours penser mobile en premier
4. **Accessibility**: Respecter les standards WCAG
5. **Performance**: Optimiser pour un score Lighthouse > 90

## 🔄 Workflow recommandé

1. **Spécifier** → Créer/modifier `spec.md`
2. **Planifier** → Utiliser `/speckit.plan`
3. **Tâcher** → Utiliser `/speckit.tasks`
4. **Implémenter** → Utiliser `/speckit.implement`
5. **Tester** → Vérifier manuellement et avec Lighthouse
6. **Itérer** → Répéter pour les nouvelles fonctionnalités

## 📚 Ressources

- [Documentation Nuxt.js](https://nuxt.com/docs)
- [Documentation Nuxt UI](https://ui.nuxt.com)
- [Spec-Kit GitHub](https://github.com/github/spec-kit)

## ❓ Besoin d'aide ?

Si vous avez des questions ou rencontrez des problèmes :
1. Vérifiez que tous les fichiers requis sont présents
2. Consultez la constitution pour les principes
3. Vérifiez les logs des commandes spec-kit
4. Consultez la documentation Nuxt.js et Nuxt UI

