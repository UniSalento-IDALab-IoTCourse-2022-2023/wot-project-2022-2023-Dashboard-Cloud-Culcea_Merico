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

## Test delle API

- Post HeartRate Alert:
```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "timestamp": {
    "date": "2023-06-30",
    "time": "08:30:00"
  },
  "value": "3.5",
  "vehicleID": "AB123"
}' http://localhost:3000/api/post/heartAlert
```

- Post Drive Alert:
```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "timestamp": {
    "date": "2023-06-30",
    "time": "08:30:00"
  },
  "value": "3.5",
  "vehicleID": "AB123"
}' http://localhost:3000/api/post/driveAlert
```

## Api REST

- POST:
  http://localhost:3000/api/post/driveAlert
  http://localhost:3000/api/post/heartAlert

- GET:
  http://localhost:3000/api/get/driveAlert/count
  http://localhost:3000/api/get/heartAlert/count
  http://localhost:3000/api/get/driveAlert/date/2023-12-30
  http://localhost:3000/api/get/heartAlert/date/2023-12-30
  http://localhost:3000/api/get/driveAlert/time
  http://localhost:3000/api/get/heartAlert/time

## Dashboard Test

1. Svuotare il Database
2. Eseguire alertGenerator.py
  - lo script genererà tra 300 e 600 finti allert, nell'ultimo anno, eslcuso il mese corrente
  - lo script genererà ogni secondo un alert (scelto a caso fra battiti o stile di guida) nell'ultima settimana (non nell'ultimo giorno, in modo che si possa apprezzare l'aggiornamento di tutte le colonne del grafico) (ps. in caso di utilizzo reale, ovviamente i dati nuovi arriverrano solo per il giorno corrente)

Lo script genera i valori negli alert secondo i seguenti criteri.

- HeartRate Alert:
  Se il battito è compreso tra 45-60, oppure 100-150. Non sono condizioni normali se si è alla guida.

- DangerousDrive Alert:
  Se l'accelerazione è compresa tra -6 e -3, 3 e 6 m/s^2, secondo i valori del paper considerato.
