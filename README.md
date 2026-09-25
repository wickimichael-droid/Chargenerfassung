# Release 11 – Materialbahnhof

`index.html` enthält Artikelpflege und einen nach Datum gefilterten, Excel-kompatiblen CSV-Export. CSV lässt sich in Excel öffnen, ist aber keine native XLSX-Datei. `artikel-import.json` enthält 150 Artikel aus der gelieferten Liste. Die Historienansicht und der Export sind auf die letzten 14 Tage begrenzt.

## Vor dem produktiven Einsatz

1. Bestehende Realtime Database und Hosting-Version sichern. Die importierte JSON-Datei **nicht am Datenbank-Root importieren**: Ein Root-Import kann vorhandene Plätze überschreiben. In Firebase Console → Realtime Database → Daten den Knoten `materialbahnhof/articles` auswählen und dort ausschließlich das innere Objekt `articles` aus `artikel-import.json` importieren. Die Nummern sind Schlüssel und werden als Text erhalten.
2. Firebase Authentication für alle Bedienpersonen einrichten und die Custom Claim `operator: true` ausschließlich berechtigten Konten erteilen. Die Seite enthält eine Google-Anmeldung. Google als Firebase-Authentication-Anbieter aktivieren und die GitHub-Pages-Domain `wickimichael-droid.github.io` bei den autorisierten Domains eintragen. Ohne gültige Operator-Claim sperren die mitgelieferten Regeln den Zugriff. Firebase App Check für Realtime Database aktivieren und anschließend Enforcement einschalten. Eine Datenbankregel kann eine Web-Domain nicht als vertrauenswürdigen Schreiber beweisen; Berechtigung und App Check schützen den Zugriff.
3. `database.rules.json` nach Prüfung gegen die reale Datenstruktur in Firebase Realtime Database veröffentlichen. Vorher im Rules Playground erlaubte und verweigerte Aktionen prüfen. Die Regeln gelten separat von der HTML-Datei.
4. Die geplante Funktion in `functions/index.js` täglich in das Firebase-Projekt `chargenerfassung` deployen (Firebase CLI und Abrechnungsvoraussetzungen prüfen). Sie entfernt ausschließlich alte Einträge aus `materialbahnhof/history`; Plätze und Artikel bleiben bestehen. Bestehende alte Einträge haben möglicherweise keinen `timestamp`; diese vor der Umstellung gesondert sichern und bereinigen.
5. Die HTML-Datei über das bestehende Hosting veröffentlichen. Danach Artikelaufnahme, Materialwechsel, Historienfilter und CSV-Export mit einem Testkonto prüfen.

**Status:** Dies ist ein vorbereiteter Release, keine veröffentlichte Version. Die serverseitige Löschung und Anmeldung sind im Code vorbereitet, aber im Firebase-Projekt noch nicht eingerichtet oder getestet. Die Datei darf mit den beigefügten Regeln nicht ungeprüft produktiv geschaltet werden.
