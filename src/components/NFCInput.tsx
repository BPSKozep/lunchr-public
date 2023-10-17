import { useEffect, useState } from "react";
import styles from "./NFCInput.module.css";
import "utils/web-nfc.d.ts";

function NFCInput({
    nfc,
    onChange,
}: {
    nfc: boolean;
    onChange: (data: string) => void;
}) {
    const [data, setData] = useState("");

    function onReading({ serialNumber }: NDEFReadingEvent) {
        setData(serialNumber.replaceAll(":", ""));
    }

    useEffect(() => {
        if (nfc && "NDEFReader" in window) {
            const ndef = new NDEFReader();

            ndef.addEventListener("reading", onReading);

            ndef.scan();

            return () => {
                ndef.removeEventListener("reading", onReading);
            };
        }
    }, [nfc]);

    useEffect(() => {
        onChange(data);
    }, [data, onChange]);

    return (
        <>
            <input
                type="text"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className={styles.input}
                placeholder="User ID"
            />
        </>
    );
}

export default NFCInput;
