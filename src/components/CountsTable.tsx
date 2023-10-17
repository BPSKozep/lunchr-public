import { useState } from "react";
import styles from "./CountsTable.module.css";
import { useRouter } from "next/router";

function CountsTable({ counts }: { counts: { [key: string]: number } }) {
    const [manualCounts, setManualCounts] = useState<{ [key: string]: number }>(
        {}
    );

    const router = useRouter();

    const isEmpty = Object.keys(counts).length === 0; // ezt adta a gpt lol, programming is my passion

    if (isEmpty) {
        return <></>;
    }

    return (
        <div className={styles.table_container}>
            <table className={styles.table}>
                {Object.entries(counts).map(([key, value]) => {
                    return (
                        <tr key={key} className={styles.row}>
                            <th>{key}</th>
                            <td>
                                {manualCounts[key]
                                    ? value + manualCounts[key]
                                    : value}
                            </td>
                            <div className={styles.manual_div}>
                                <button
                                    onClick={() =>
                                        setManualCounts((prev) => {
                                            prev[key] = prev[key]
                                                ? prev[key] + 1
                                                : 1;
                                            router.push("/");
                                            return prev;
                                        })
                                    }
                                    className={styles.manual_count}
                                >
                                    +
                                </button>
                            </div>
                        </tr>
                    );
                })}
            </table>
        </div>
    );
}

export default CountsTable;
