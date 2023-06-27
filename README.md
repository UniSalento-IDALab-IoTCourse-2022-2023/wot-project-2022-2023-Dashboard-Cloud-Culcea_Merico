# Progetto IoT: Safety Driver

## Descrizione progetto

## Descrizione Architettura

## Altri Componenti

- [Simulatore Server OBD](https://github.com/UniSalento-IDALab-IoTCourse-2022-2023/wot-project-2022-2023-OBDsimulator-Culcea_Merico.git)
- [Gateway Android](https://github.com/UniSalento-IDALab-IoTCourse-2022-2023/culcea-merico__driver_safety_gateway.git)
- [Dashboard + Cloud](https://github.com/UniSalento-IDALab-IoTCourse-2022-2023/wot-project-2022-2023-Dashboard-Cloud-Culcea_Merico.git)

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

### Flusso generale di esecuzione

Il FrontEnd del componente è gestito principalmente dai seguenti file:
- _views/home.html_ e _public/js/home.js_
- _views/alertList.html_ e _public/js/alertList.js_

Quando un utente si collega a una di queste pagine, il componente renderizza l'HTML + CSS ed il relativo scripting file.

La logica di aggiornamento della pagina _home_ è la seguente:

```js
// LOGICA DI UPDATE DELLA DASHBOARD
updateHeartRateCounters(); //aggiorna i contatori degli alert relativi al battito cardiaco
updateDriveCounters(); //aggiorna i contatori degli alert relativi alla guida anomala
updateWeeklyHeartAlertsChart(); //aggiorna l'istogramma degli alert relativi al battito cardiaco
updateWeeklyDriveAlertsChart(); // aggiorna l'istogramma degli alert relativi alla guida anomala
updateTimeHeartAlertChart(); //aggiorna il grafico a ciambella relativo alle fasce orarie degli alert relativi al battito
updateTimeDriveAlertChart(); // aggiorna il grafico a ciambella relativo alle fasce orarie degli alert relativi alla guida

setInterval(() => {
    updateHeartRateCounters();
    updateDriveCounters();
    updateWeeklyHeartAlertsChart();
    updateWeeklyDriveAlertsChart();
    updateTimeHeartAlertChart();
    updateTimeDriveAlertChart();
  }, 5000); // ogni 5 secondi fa il fetch per ottenere i dati aggiornati dal DB
```

La logica di aggiornamento della pagina _alertList_ è la seguente:
```js
// AGGIORNAMENTO QUANDO SI VISITA LA PAGINA 
function onPageLoad(){
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = String(currentDate.getMonth() + 1).padStart(2, '0');
  var day = String(currentDate.getDate()).padStart(2, '0');
  var formattedDate = year + '-' + month + '-' + day;  

  updateDriveAlertsTable(formattedDate); //aggiorna la tabella degli alert relativi alla guida
  updateHeartAlertsTable(formattedDate); //aggiorna la tabella degli alert relativi al battito
}

onPageLoad();

//AGGIORNAMENTO QUANDO SI SELEZIONA UN GIORNO
$('#calendar').on('change.datetimepicker', function(e) {
  var selectedDate = e.date.format('YYYY-MM-DD');
  updateHeartAlertsTable(selectedDate);
  updateDriveAlertsTable(selectedDate);
});
```

Ogni funzione di _update_:
- manda una richiesta REST ad una delle [API](#api-rest) definite nella sezione successiva
- preleva i dati della risposta
- aggiorna i propri grafici con i nuovi dati

Quando il componente riceve una chiamata REST su un EndPoint, esegue la relativa funzione definita nel _controller_.
Come esempio è riportata la funzione che restituisce gli alert relativi al battito cardiaco in un determinato giorno. Essa viene invocata sulle richieste GET di questo EndPoint (http://localhost:3000/api/get/heartAlert/date/:requestedDate)

```js
exports.getHeartAlertsByDate = (req, res) => {
  const { requestedDate } = req.params;

  heartAlertModel.find(
    {
      'timestamp.date': requestedDate
    }
  ).then((result) => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(200).json(result);
      }
    })
    .catch((error) => {
      // Handle any error that occurred during the aggregation
      res.status(500).json({ error: 'An error occurred while fetching the data' });
    });
};
```
La funzione esegue una query sul DB e restituisce i risultati alla view che ha invocato l'API.

### API Rest

>![image](https://github.com/UniSalento-IDALab-IoTCourse-2022-2023/wot-project-2022-2023-Dashboard-Cloud-Culcea_Merico/assets/100310104/7985bc1c-4041-4c84-a126-9ae8bb25225c)
>
>API Tree

All'interno del file **routes/apiRoutes.js** sono presenti le definizioni degli URL delle API Rest e le funzioni di business associate che definiscono la logica dietro le api. Queste funzioni sono state definite all'interno del file **controllers/apiController.js**.

>**NB:** Le API Rest hanno come root il seguente path
> http://localhost:3000/api

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

#### POST Api

| API EndPoint |Header| Positive Response | Negative Response | Description |
|:---:|:----:|:-:|:-:|:-:|
|/post/heartAlert | Content-Type: application/json | Status code 200 | Status code 500 | Permette di caricare un alert relativo al Battito Cardiaco nel DB|
|/post/driveAlert | Content-Type: application/json| Status code 200 | Status code 500 | Permette di caricare un alert relativo alla Guida Pericolosa nel DB|

**NB:** Il body della richiesta dovrà contenere un _JSON_ costruito secondo il _DataModel_ dell'alert che si intende caricare nel DB. Per conoscere i DataModel fare riferimento alla sezione [Database](#database)

Di seguito sono riportati degli esempi di post eseguiti tramite curl:
```bash
curl --location 'http://127.0.0.1:3000/api/post/heartAlert' \
--header 'Content-Type: application/json' \
--data '{
    "timestamp": {
        "date": "2023-06-30",
        "time": "03:28:45"
    },
    "heartRate": {
        "value": "60",
        "unitMeasure": "BMP"
    },
    "vehicleID": "7ddd6d6g-4256-4eaa-832a-3edfffa04ffc"
}'
```

```bash
curl --location 'http://127.0.0.1:3000/api/post/driveAlert' \
--header 'Content-Type: application/json' \
--data '{
    "timestamp": {
        "date": "2023-06-30",
        "time": "03:28:45"
    },
    "acceleration": {
        "value": "4.56",
        "unitMeasure": "m/s^2"
    },
    "vehicleID": "7ddd6d4a-4456-4eaa-832a-3edfffa04ffc"
}'

#### GET Api

<table>
	<tr>
		<th> API EndPoint </th>	
		<th>Header</th>
		<th>Positive Response</th>
		<th>Negative Response</th>
		<th>Body Response</th>
		<th>Description</th>
		<th>Parameter</th>
	</tr>
	<tr>
		<td>/get/heartAlert/count</td>
		<td>Content-Type: application/json</td>
		<td>Status code 200</td>
		<td>Status code 500</td>
		<td>Restituisce un JSON contenente il numero di HeartRate Alert totali</td>
<td>

```json
{
  "total": 234,
  "monthly": 65,
  "daily": 12,
}
```

</td>
		<td>None</td>
	</tr>
	<tr>
		<td>/get/driveAlert/count</td>
		<td>Content-Type: application/json</td>
		<td>Status code 200</td>
		<td>Status code 500</td>
		<td>Restituisce un JSON contenente il numero di Drive Alert totali</td>
<td>

```json
{
  "total": 234,
  "monthly": 65,
  "daily": 12,
}
```

</td>
		<td>None</td>
	</tr>
	<tr>
		<td>/get/heartAlert/date/:requestedDate/count</td>
		<td>Content-Type: application/json</td>
		<td>Status code 200</td>
		<td>Status code 500</td>
		<td>Restituisce un JSON contenente il numero di HeartRate Alert per la data specificata</td>
<td>

```json
{
  "date": "2023-06-20",
  "count": 3,
}
```

</td>
		<td>Stringa contenente una data in formato "YYYY-MM-DD"</td>
	</tr>
	<tr>
		<td>/get/driveAlert/date/:requestedDate/count</td>
		<td>Content-Type: application/json</td>
		<td>Status code 200</td>
		<td>Status code 500</td>
		<td>Restituisce un JSON contenente il numero di Drive Alert per la data specificata</td>
<td>

```json
{
  "date": "2023-06-13",
  "count": 5,
}
```

</td>
		<td>Stringa contenente una data in formato "YYYY-MM-DD"</td>
	</tr>
	<tr>
		<td>/get/heartAlert/time</td>
		<td>Content-Type: application/json</td>
		<td>Status code 200</td>
		<td>Status code 500</td>
		<td>Restituisce un JSON contenente il numero di HeartRate Alert in diverse fasce orarie</td>
<td>

```json
{
	"00:00-08:00": 13,
	"08:00-16:00": 42,
	"16:00-00:00": 25
}
```

</td>
		<td>None</td>
	</tr>
	<tr>
		<td>/get/driveAlert/time</td>
		<td>Content-Type: application/json</td>
		<td>Status code 200</td>
		<td>Status code 500</td>
		<td>Restituisce un JSON contenente il numero di Drive Alert in diverse fasce orarie</td>
<td>

```json
{
	"00:00-08:00": 22,
	"08:00-16:00": 11,
	"16:00-00:00": 23
}
```

</td>
		<td>None</td>
	</tr>
	<tr>
		<td>/get/heartAlert/date/:requestedDate</td>
		<td>Content-Type: application/json</td>
		<td>Status code 200</td>
		<td>Status code 500</td>
		<td>Restituisce una lista contenente i JSON degli HeartRate Alert per la data specificata</td>
<td>

```json
[
		{
		"timestamp": {
			"date": "2023-06-24",
			"time": "07:28:45"
		},
		"heartRate": {
			"value": "50",
			"unitMeasure": "BMP"
		},
		"vehicleID": "7ddd6d6a-4256-4eaa-832a-3edfefa04ffc",
	},
	{
		"timestamp": {
			"date": "2023-06-24",
			"time": "17:12:16"
		},
		"acceleration": {
			"value": "120",
			"unitMeasure": "BMP"
		},
		"vehicleID": "5f320bad-8f1f-41cb-b88d-d5977dae61b6",
	}
]
```

</td>
		<td>Stringa contenente una data in formato "YYYY-MM-DD"</td>
	</tr>
	<tr>
		<td>/get/driveAlert/date/:requestedDate</td>
		<td>Content-Type: application/json</td>
		<td>Status code 200</td>
		<td>Status code 500</td>
		<td>Restituisce una lista contenente i JSON dei Drive Alert per la data specificata</td>
<td>

```json
[
		{
		"timestamp": {
			"date": "2023-06-24",
			"time": "07:28:45"
		},
		"acceleration": {
			"value": "-4.35",
			"unitMeasure": "m/s^2"
		},
		"vehicleID": "7ddd6d6a-4256-4eaa-832a-3edfefa04ffc",
	},
	{
		"timestamp": {
			"date": "2023-06-24",
			"time": "17:12:16"
		},
		"acceleration": {
			"value": "-5.78",
			"unitMeasure": "m/s^2"
		},
		"vehicleID": "5f320bad-8f1f-41cb-b88d-d5977dae61b6",
	}
]
```

</td>
		<td>Stringa contenente una data in formato "YYYY-MM-DD"</td>
	</tr>
</table>

### Database

Il database utilizzato è MongoDB. E' stato scelto un documentale in quanto i dati non necessitano di update una volta inseriti, inoltre le relazioni tra di essi sono assenti.

La connessione al DB è gestita dal file _DBconfig/database.js_.

Il componente, dopo essersi connesso all'istanza del DB, crea un database dedicato al nostro caso d'uso chiamato **safetyDriverDB**.

>![image](https://github.com/UniSalento-IDALab-IoTCourse-2022-2023/wot-project-2022-2023-Dashboard-Cloud-Culcea_Merico/assets/100310104/2676a255-7f99-47e0-b81c-76f4a923859d)
>
>Immagine che illusta le collezioni create all'interno del DB

I documenti caricati all'interno delle collezioni rispettano dei **DataModel** definiti all'interno dei file _models/heartAlertModel.js_ e _models/driveAlertModel.js_.

Definizione del data model per gli alert relativi al battito cardiaco:

```js
const heartAlertSchema = new mongoose.Schema({
  timestamp: {
    date:{
      type: String,
      format: 'YYYY-MM-DD',
      required: true
    },
    time:{
      type: String,
      format: 'HH:mm:ss',
      required: true
    }
  },
  heartRate:{
    value:{
      type: String,
      required: true,
    },
    unitMeasure:{
      type: String,
      required: true,
    }
  },
  vehicleID: {
    type: String,
    required: true
  }  
},
{
  collection: 'heartAlerts' // Specify the custom collection name
}
);
```

Definizione del data model per gli alert relativi alle accelerazioni anomale:

```js
const driveAlertSchema = new mongoose.Schema({
  timestamp: {
    date:{
      type: String,
      format: "YYYY-MM-DD",
      required: true
    },
    time:{
      type: String,
      format: "HH:mm:ss",
      required: true
    }
  },
  acceleration:{
    value:{
      type: String,
      required: true,
    },
    unitMeasure:{
      type: String,
      required: true,
    }
  },
  vehicleID: {
    type: String,
    required: true
  }
},
{
  collection: 'driveAlerts' // Specify the custom collection name
});
```
 
