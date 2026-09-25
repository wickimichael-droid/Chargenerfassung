# Release 11 – Materialbahnhof

Die Seite bleibt ohne sichtbare Anmeldung nutzbar. Sie verwendet im Hintergrund Firebase Anonymous Authentication und App Check mit unsichtbarem reCAPTCHA Enterprise (Punktesystem). Ein Zeitraumexport wird als Excel-kompatible CSV angeboten. Die Artikelliste stammt aus `artikel-import.json` mit 150 Nummern.

## Umstellung

1. Die vorhandene Realtime Database sichern. Die Historie wurde am 25.09.2026 mit Zeitstempeln ergänzt; ein Backup der ursprünglichen Daten liegt gesondert vor.
2. In Firebase Authentication den Anbieter „Anonym“ aktivieren. Für App Check einen reCAPTCHA-Enterprise-Schlüssel für `wickimichael-droid.github.io` registrieren. Der **öffentliche Site Key** ist bereits in `index.html` eingetragen. Niemals den geheimen Schlüssel in GitHub hochladen.
3. Die Web-App in Firebase App Check mit dem öffentlichen Enterprise-Site-Key registrieren. App Check zunächst ohne Erzwingung beobachten. Nach erfolgreichem Test der neuen Seite Realtime Database Enforcement einschalten.
4. Die überarbeitete `index.html` auf der GitHub-Pages-Branch veröffentlichen. Die aktuelle Live-Version überschreibt beim Start den gesamten Zweig `materialbahnhof` und entfernt daher neue Artikeldaten. Erst nach dem Wechsel auf diese Version `artikel-import.json` ausschließlich unter `materialbahnhof/articles` importieren (inneres Objekt `articles`, nicht die ganze Datei am Root).
5. Die `database.rules.json` in Realtime Database → Regeln einfügen, im Rules Playground prüfen und veröffentlichen. Sie lässt nur anonyme Firebase-Sitzungen an die Daten. Der Schutz gegen andere Websites beruht auf App Check Enforcement; Herkunft aus einer Webseite ist allein durch Regeln nicht beweisbar.
6. Historie und Export testen. Beim Öffnen bereinigt die Seite Einträge, die älter als 14 Tage sind. Ohne Seitenaufruf ist die Löschung auf dem kostenlosen Spark-Tarif nicht garantiert. Die bereinigten Historieneinträge ändern keine Plätze.

Die vorher mitgelieferte Cloud Function war für den kostenlosen Tarif ungeeignet und gehört nicht zu diesem Release. Die bereitgestellten Regeln schützen erst nach Veröffentlichung in Firebase; das bloße Hochladen nach GitHub aktiviert sie nicht.
