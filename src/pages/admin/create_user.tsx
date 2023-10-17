import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "styles/Admin.module.css";
import NFCInput from "components/NFCInput";
import { trpc } from "utils/trpc";

function CreateUser() {
    const router = useRouter();
    const [nfcId, setNfcId] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const { mutate } = trpc.user.createUser.useMutation();

    return (
        <>
            <Head>
                <title>Lunchr - Felhasználó Létrehozása</title>
            </Head>
            <button
                onClick={() => router.push("/admin")}
                className={styles.back_button}
            >
                Vissza
            </button>

            <div className={styles.center_container}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Név"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Email"
                    value={email}
                    style={{ width: "350px" }}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div style={{ margin: "1rem" }}>
                    <NFCInput nfc={true} onChange={setNfcId} />
                </div>

                <button
                    className={styles.button}
                    onClick={() => {
                        mutate({ email, name, nfcId: nfcId });
                    }}
                >
                    Létrehozás
                </button>
            </div>
        </>
    );
}

export default CreateUser;
