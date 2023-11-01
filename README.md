# Lunchr-public

## A Lunchr projekt publikus verziója

---

# Folyamatábrák

[Folyamatábra_pentek.pdf](https://github.com/BPSKozep/lunchr-public/files/13226752/Folyamatabra_pentek.pdf)

![image](https://github.com/BPSKozep/lunchr-public/assets/56265261/c0f3d17e-8b9a-4d74-a06e-2b55cee9184f)

---

[Folyamatábra_kovetkezo_het.pdf](https://github.com/BPSKozep/lunchr-public/files/13226757/Folyamatabra_kovi_het.pdf)

![image](https://github.com/BPSKozep/lunchr-public/assets/56265261/307aa360-6ae6-4571-9a01-8dc8dbfc2880)

# Demo / Hosted verzió

https://lunchr.bpskozep.hu


# Egyéni Telepítés

### Szükséges programok:
- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/)

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
7. [localhost:3000](http://localhost:3000) megnyitása böngészőben
