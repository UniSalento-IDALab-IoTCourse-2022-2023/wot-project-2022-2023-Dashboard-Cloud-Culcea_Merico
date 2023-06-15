# Progetto Dashboard e REST API

Si basa su node.js
Per lanciare:

```bash
node app.js
```

## Struttura progetto

- app.js --> File principale del server
- routes/index.js --> File contenente le route della Dashboard
- routes/api.js --> File contenente le route delle REST API
- controllers/indexController.js --> File contenente la logica da eseguire sugli URL della Dashboard
- controllers/apiController.js --> File contenente la logica da eseguire sugli URL delle REST API
- views/home.html --> File della Dashboard
- views/about.html --> File della Dashboard
- public/css --> Directory per i file CSS
- public/js --> Directory per gli script
- public/images --> Directory per immagini
- models/heartAlertModel.js --> Datamodel degli Alert per il battito cardiaco
- models/driveAlertModel.js --> Datamodel degli Alert per la guida pericolosa