# Moment 2

## Syfte
Denna uppgift syftade till att skapa en webbtjänst och en webbapplikation för att hantera arbetserfarenheter. Webbtjänsten tillhandahåller CRUD-operationer (Create, Read, Update, Delete) för att hantera data om arbetsplatser och anställningar. Webbapplikationen använder Fetch API för att konsumera webbtjänsten.

### Översikt
Jag har utvecklat en REST-baserad webbtjänst som hanterar arbetserfarenheter. Webbtjänsten är byggd med Node.js och Express, och använder en MySQL-databas för att lagra data. Webbtjänsten erbjuder fullständiga CRUD-operationer och returnerar data i JSON-format.

### Funktionalitet
- **Create:** Lägg till nya arbetserfarenheter i databasen.
- **Read:** Hämta en lista över alla arbetserfarenheter eller en specifik arbetserfarenhet baserat på ID.
- **Update:** Uppdatera informationen om en befintlig arbetserfarenhet.
- **Delete:** Ta bort en arbetserfarenhet från databasen.

## MySQL

I denna uppgift har MySQL använts som den relationsbaserade databaslösningen.För detta projekt har jag använt MySQL för att lagra arbetserfarenheter, vilket ger möjlighet att enkelt hantera data.

Här är en översikt över databasens struktur:

- **Databas:** cv
- **Tabell:** workexperience
  - **id:** Ett unikt, autoinkrementerande ID för varje rad.
  - **companyname:** Namnet på företaget där arbetet utfördes.
  - **jobtitle:** Arbetsrollens titel eller befattning.
  - **location:** Platsen där arbetet utfördes.
  - **startdate:** Datumet då arbetet påbörjades.
  - **enddate:** Datumet då arbetet avslutades.
  - **description:** En beskrivning av arbetet.


  ## Kontakta mig
  
  - **E-post:** [haris18sabanovic@outlook.com](mailto:haris18sabanovic@outlook.com)
  - **GitHub:** [HarisSabanovic](https://github.com/HarisSabanovic)







