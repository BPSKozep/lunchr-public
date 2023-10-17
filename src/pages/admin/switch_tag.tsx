import React, { useState } from "react";

import "utils/web-nfc.d.ts";

import styles from "styles/Admin.module.css";
import { trpc } from "utils/trpc";
import NFCInput from "components/NFCInput";
import Head from "next/head";
import { useRouter } from "next/router";

function SwitchTag() {
    const [fromNfc, setFromNfc] = useState<string>("");
    const [toNfc, setToNfc] = useState<string>("");
    const [fromSubmitted, setFromSubmitted] = useState<boolean>(false);
    const { data, isFetched, isLoading } = trpc.user.getUser.useQuery(
        { nfcId: fromNfc },
        { enabled: !!fromNfc }
    );
    const { mutate, data: mutateResult } = trpc.user.switchTag.useMutation();
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Lunchr - Token Változtatás</title>
            </Head>
            <button
                onClick={() => router.push("/admin")}
                className={styles.back_button}
            >
                Vissza
            </button>
            <div className={styles.center_container}>
                {!fromSubmitted && (
                    <>
                        <div
                            style={{
                                margin: "1rem",
                            }}
                        >
                            <NFCInput nfc={true} onChange={setFromNfc} />
                        </div>
                        <button
                            className={styles.button}
                            onClick={() => setFromSubmitted(true)}
                        >
                            Mehet
                        </button>
                    </>
                )}
                {fromSubmitted && (
                    <>
                        {fromNfc && !data && isFetched && (
                            <h2>Invalid user ID</h2>
                        )}
                        {fromNfc && isLoading && <h2>Loading...</h2>}
                        {data && <h2>From: {data?.name}</h2>}
                        <div
                            style={{
                                margin: "1rem",
                            }}
                        >
                            <NFCInput nfc={true} onChange={setToNfc} />
                        </div>
                        {fromNfc && data && toNfc && (
                            <button
                                className={styles.button}
                                onClick={() => {
                                    mutate({
                                        nfcId: fromNfc,
                                        newId: toNfc,
                                    });
                                }}
                                disabled={mutateResult !== undefined}
                            >
                                Switch
                            </button>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default SwitchTag;
