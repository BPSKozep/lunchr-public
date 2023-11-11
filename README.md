# Lunchr-public

## A projekt lényege

Iskolánk pár éve alakult, és az ebédek kiválasztására, megrendelésére, kiosztására nem volt jól bejáratott rendszerünk. Ezen szerettünk volna segíteni, amikor létrehoztuk Lunchr rendszerünket. A rendszer a következőképpen működik: A tanárok és diákok egy online felületen leadják rendelésüket a következő hétre (ahova az iskolatitkár előzőleg feltöltötte az étlapot). Mindenkinek saját fizikai tokenje van, ez azonosítja őt, ezt használja ebédelésnél. Ebédkor az ebédlőben található olvasóhoz kell érinteni a tokent, ekkor a konyhásoknál lévő monitoron rögtön megjelenik a diák neve, fényképe, és a rendelt étel. Rendszerünk egyrészt segíti a diákokat és tanárokat, hiszen egyszer kiválasztják az ételeket, utána nem kell emlékezni arra, hogy mit rendeltek, és segíti a konyhásokat is, hiszen pontosan látják ki mit rendelt, mit kell neki odaadni, nincs tévesztés, nincs variálás az ételekkel.
A rendszer folyamatosan változik, a konyhások, diákok és tanárok kérésére már több új funkció bekerült a kezdetekhez képest. Például a konyhások látják a konyhában lévő monitoron, hogy miből hány adag fogyott, ezen ők tudnak változtatni, vagy pl. a monitoron megjelenik a diák fényképe is, így nincs visszaélés egymás tokenjeivel, a konyhások látják kinek kell odaadni az ételt.

A Lunchr gazdák: Martin & Márk

---

# Folyamatábráink

[Folyamatabra_pentek.pdf](https://github.com/BPSKozep/lunchr-public/files/13226752/Folyamatabra_pentek.pdf)

![image](https://github.com/BPSKozep/lunchr-public/assets/56265261/c0f3d17e-8b9a-4d74-a06e-2b55cee9184f)

---

[Folyamatabra_kovetkezo_het.pdf](https://github.com/BPSKozep/lunchr-public/files/13231373/Folyamatabra_kovi_het.pdf)

![image](https://github.com/BPSKozep/lunchr-public/assets/56265261/f4a49788-0b90-44cc-a6ea-d73ca73198e7)

# Demo / Hosted verzió

## https://lunchr.bpskozep.hu

Használat közbeni videó: https://links.markgyoni.dev/lunchr

(Hétvégén a program nem működik, mert a rendszer csak hétköznapokat tartalmaz.)

# Demo használata és még több információ

A Demo verziót azért hoztuk létre, hogy a projektet meg lehessen tekinteni úgy, hogy az a mi adatbázisunktól és diákjainktól külön legyen és extra funkciókkal könnyű legyen kipróbálni.

## Mit csinálnak a gombok?

A Demo verzióhoz csináltunk pár extra funkciót, amit szimulálni tudják az egyes token érintéseket és az adatbázist is tudják törölni.

-   NFC Érintés

    -   Ez a gomb kiválaszt egy random diákot és szimulálja azt, mintha az olvasóhoz érintené a tokent.
    -   Ha ez a felhasználó még nem ebédelt a héten, akkor létrehoz neki egy random választott menüt

-   Adatbázis visszaállítása

    -   Létrehoztunk egy API lekérést, ami összesen annyit teljesít, hogy törli az egész `orders` adatbázist.

-   Ebédeltetés szimulálása

    -   Ez egy kapcsolható gomb, ami 5 másodpercenként, az érintéshez hasonlóan választ egy random diákot.

-   Jelenlegi email
    -   Bár ez nem etgy gomb, de kiírja a jelenleg megjelenített felhasználó email-jét, ami az adatbázisban mellette van.

## Hogy néz ki az adatbázis?

A `db_scheme` mappában megtalálhatóak kis részletek arról, hogy miként néz ki nálunk a felhasználók és a rendelések eltárolása.

-   [Users](https://github.com/BPSKozep/lunchr-public/blob/main/db_scheme/users_lunchr.json)

-   [Orders](https://github.com/BPSKozep/lunchr-public/blob/main/db_scheme/orders_lunchr.json)

## Mi változott az eredeti verzióhoz képest?

A legtöbb változást az `index.tsx` fájlban kellett csinálnunk, így az eredeti megtalálható az `index.original.tsx` név alatt.

Az eredeti verzióban más profilképekkel dolgozunk, ezért egy saját cdn szervert is létrehoztunk külön ennek.

# Egyéni Telepítés

### Szükséges programok:

-   [Node.js](https://nodejs.org/en/)
-   [Git](https://git-scm.com/)
-   [MongoDB](https://www.mongodb.com/)

## Telepítés

1. ```sh
   git clone https://github.com/BPSKozep/lunchr-public
   ```
2. ```sh
   cd lunchr-public
   ```
3. ```sh
   npm install
   ```
4. `.env fájl kitöltése`
    1. `MONGODB_URI=[MongoDB connection string]`
    2. `MONGODB_DATABASE=[Adatbázis neve]`
    3. `NEXT_PUBLIC_SOCKETIO_PASSPHRASE=[Backend csatlakozáshoz jelszó]`

MongoDB-hez ajánljuk a [cloud.mongodb.com](https://cloud.mongodb.com/)-ot.

5. ```sh
   npm run build
   ```
6. ```sh
   npm run start
   ```
7. [localhost:3000](http://localhost:3001) megnyitása böngészőben
