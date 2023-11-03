# DTM-Reserveringen
De git repository voor het DTM Reserveringen school project.

## Instalatie
- Deze applicatie heeft Node Package Manager (NPM) nodig en is hier te downloaden: [Node.js download page](https://nodejs.org/en/download)

### Download
- Download de applicatie door de `<> Code -> Download ZIP`
![download](https://github.com/DragonStruck/DTM-Reserveringen/blob/dev/src/main/resources/static/images/github/download.png?raw=true)
- Unzip de source code en open de map als IntelliJ project.

### Node packages
- Open de console binnen IntelliJ en voer het `npm install` command uit.

### Maven
- Download maven sources, documentation is optioneel.
![download](https://github.com/DragonStruck/DTM-Reserveringen/blob/dev/src/main/resources/static/images/github/maven.png?raw=true)

### Database
- navigeer naar de `.env.example` file en copy deze file en hernoem het naar `.env`
- verander de `database`, `name`, `password` en `admin_password`. Waar `database` naar de gewenste database naam wordt verandert, 
als `name` en `password` de naam en wachtwoord van je database en als `admin_password` een wachtwoord om als admin in te kunnen loggen.

## Hoe te gebruiken
- Navigeer naar `/src/main/java/nl/hu/adsd/dtmreserveringen/DtmReservationsApplication.java`
- Start deze file met de `play` knop of `Shift + F10`
- Open een browser en ga naar `localhost:8080`