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
            <table>
                <tbody className={styles.table}>
                    {Object.entries(counts).map(([key, value]) => {
                        return (
                            <tr key={key} className={styles.row}>
                                <th>{key}</th>
                                <td>
                                    {manualCounts[key]
                                        ? value + manualCounts[key]
                                        : value}
                                </td>
                                <td>
                                    <button
                                        onClick={() =>
                                            setManualCounts((prev) => {
                                                const oldPrev = { ...prev };

                                                oldPrev[key] = oldPrev[key]
                                                    ? oldPrev[key] + 1
                                                    : 1;

                                                return oldPrev;
                                            })
                                        }
                                        className="mouse-pointer text-center h-12 bg-slate-400 rounded-s aspect-square text-2xl m-2"
                                    >
                                        +
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default CountsTable;
