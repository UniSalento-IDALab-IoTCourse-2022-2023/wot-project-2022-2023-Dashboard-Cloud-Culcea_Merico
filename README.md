# Progetto IoT: Safety Driver

## Descrizione progetto

## Descrizione Architettura

## Altri Componenti

## Componente Dashboard + Cloud

### Introduzione

Il componente svolge due funzioni:
- espone un **WebServer** basato su API Rest con lo scopo di ricevere i dati dal _Gateway_
- espone una **Dashboard** con lo scopo di valorizzare i dati presenti nel _Database_

Al fine di memorizzare i dati, il componente si appoggia su un'istanza di _MongoDB_.

La WebApp si basa su **Node.js** e fa uso dei seguenti moduli:
- _Express.js_ -> framework molto usato per la creazione di API Rest
- _Chart.js_ -> libreria molto diffusa per la creazione di grafici
- _Mongoose.js_ -> libreria usata per la comunicazione con MongoDB
- _Bootstrap_ & _Bootstrap-icon_ -> librerie grafiche

**NB**: Alcuni template grafici sono ottenuti tramite CDN ed è pertanto richiesta una connessione internet per visualizzarli.

Il componente è interamente dockerizzato, quindi le uniche le uniche dipendenze richieste sono:
- docker
- docker compose

### Esecuzione

#### Avvio

Al fine di avviare l'applicazione:

```bash
git clone https://github.com/UniSalento-IDALab-IoTCourse-2022-2023/wot-project-2022-2023-Dashboard-Cloud-Culcea_Merico.git
cd wot-project-2022-2023-Dashboard-Cloud-Culcea_Merico/DriverSafety_dashboard
sudo docker compose up
```

#### Navigazione Dashboard

Terminata la fase di build, collegandosi al link sottostante si avrà accesso alla Dashboard.

> http://localhost:3000/

La Dashboard si articola nelle seguenti pagine:
- _Dashboard_ -> mostra le statistiche sulla totalità dei dati

    >![image](https://github.com/UniSalento-IDALab-IoTCourse-2022-2023/wot-project-2022-2023-Dashboard-Cloud-Culcea_Merico/assets/100310104/2020c598-b5bb-429b-99eb-96521ad7445c)
    >![image](https://github.com/UniSalento-IDALab-IoTCourse-2022-2023/wot-project-2022-2023-Dashboard-Cloud-Culcea_Merico/assets/100310104/1e01d057-30ab-46bd-b04c-4e0103301aae)
    >
    >Dashboard View

    La Dashboard si divide verticalmente in due colonne principali:
    - la zona sinistra dedicata agli alert relativi al battito cardiaco
    - la zona destra dedicata agli alert relativi alle accelerazioni anomale
    
    La Dashboard si divide orizzontalmente in tre righe principali:
    - la prima riga -> contiene informazioni numeriche sul numero di alert
    - la seconda riga -> contiene informazioni sul numero di alert negli ultimi 7 giorni
    - la terza riga -> contiene informazioni sulle fasce orarie in cui avvengono gli alert

- _Alert List_ -> permette di osservare nel dettaglio gli alert presenti nel DB in base al giorno selezionato

    >![image](https://github.com/UniSalento-IDALab-IoTCourse-2022-2023/wot-project-2022-2023-Dashboard-Cloud-Culcea_Merico/assets/100310104/f4bad1f5-2f3b-4d5a-97b7-9fb84f29d919)
    >
    > Alert List View

    La pagina Alert List contiene:
    - un calendario con il quale si può selezionare il giorno a cui siamo interessati
    - le liste degli alert
    
- _About_ -> fornisce informazioni sul progetto

    >![image](https://github.com/UniSalento-IDALab-IoTCourse-2022-2023/wot-project-2022-2023-Dashboard-Cloud-Culcea_Merico/assets/100310104/75dba335-2b81-47b7-90c1-130b8dd97695)
    >
    >About View


#### Uso del Generatore di Alert

Al fine di apprezzare la Dashboard è necessario riempire il database. A scopo puramente illustrativo e di test, è stato realizzato uno _alertGenerator.py_ da lanciare quando la Dashboard è attiva.

```bash
./alertGenerator.py
```

Lo script ha la seguente logica:
- genera un numero casuale finito (300-600) di alert negli ultimi 12 mesi
- genera alert in giorni randomici nella ultima settimana all'infinito (per fermarlo CTRL+C)

**NB:** in una situazione reale, i dati cambiano solo nel giorno presente. Questa condizione non è rispettata dallo script che aggiorna i dati anche nei giorni precedenti dato che il suo scopo è mostrare l'aggiornamento in tempo reale della Dashboard.

Lo script genera i valori negli alert secondo i seguenti criteri:
- HeartRate Alert:
  Battito compreso tra 45-60, oppure 100-150 (condizioni anormali se si è alla guida)

- DangerousDrive Alert:
  Accelerazione compresa tra -6m/s^2 e -3m/s^2 o 3m/s^2e 6m/s^2 (valori anormali secondo i paper considerati)

### Struttura del codice

Il codice è scritto seguendo le best practise del framework _Express.js_ e si articola secondo la seguente divisione:
- **app.js** -> main file del componente
- **Dockerfile** -> file per il build della docker image
- **docker-compose.yml** -> file per il build dei container (componente e database)
- **package.json & package-lock.json** -> file di configurazione
- */controllers* -> definizione della logica associata ai vari EndPoint
- */models* -> definizione dei *data model* utilizzati
- */public*
	- */css* -> file di stile della Dashboard
	- */js* -> file per lo scripting JS
	- */images* -> immagini statiche
- */routes* -> definizione degli EndPoint
- */views* -> file HTML della Dashboard
- */DBconfig* -> configurazione del Database

### API Rest

>![image](https://github.com/UniSalento-IDALab-IoTCourse-2022-2023/wot-project-2022-2023-Dashboard-Cloud-Culcea_Merico/assets/100310104/7985bc1c-4041-4c84-a126-9ae8bb25225c)
>
>API Tree

All'interno del file **routes/apiRoutes.js** sono presenti le definizioni degli URL delle API Rest e le funzioni di business associate che definiscono la logica dietro le api. Queste funzioni sono state definite all'interno del file **controllers/apiController.js**.

```js
// POST API
router.post('/post/heartAlert', apiController.heartAlertPost);
router.post('/post/driveAlert', apiController.driveAlertPost);
// GET API
router.get('/get/heartAlert/count', apiController.getHeartAlertCount);
router.get('/get/driveAlert/count', apiController.getDriveAlertCount);
router.get('/get/heartAlert/date/:requestedDate/count', apiController.getHeartAlertsCountByDate);
router.get('/get/driveAlert/date/:requestedDate/count', apiController.getDriveAlertsCountByDate);
router.get('/get/heartAlert/time', apiController.getHeartAlertsCountByTime);
router.get('/get/driveAlert/time', apiController.getDriveAlertsCountByTime);
router.get('/get/heartAlert/date/:requestedDate', apiController.getHeartAlertsByDate);
router.get('/get/driveAlert/date/:requestedDate', apiController.getDriveAlertsByDate);
```

### Database
