import React, { useState } from "react";

import "utils/web-nfc.d.ts";

import styles from "styles/Admin.module.css";
import { trpc } from "utils/trpc";
import NFCInput from "components/NFCInput";
import Head from "next/head";
import { useRouter } from "next/router";

function Check() {
    const [nfcId, setNfcId] = useState<string>("");
    const { data, isFetched, isLoading } = trpc.user.getUser.useQuery(
        { nfcId },
        { enabled: !!nfcId }
    );
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Lunchr - Token Ellenőrzés</title>
            </Head>
            <button
                onClick={() => router.push("/admin")}
                className={styles.back_button}
            >
                Vissza
            </button>
            <div className={styles.center_container}>
                <div style={{ margin: "1rem" }}>
                    <NFCInput nfc={true} onChange={setNfcId} />
                </div>

                {nfcId && !data && isFetched && <h2>Nem érvényes NFC token</h2>}
                {nfcId && isLoading && <h2>Betöltés...</h2>}
                <h2>{data?.name}</h2>
            </div>
        </>
    );
}

export default Check;
