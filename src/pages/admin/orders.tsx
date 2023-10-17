import { useMemo, useState } from "react";
import { trpc } from "utils/trpc";
import { getWeek, getWeekYear } from "utils/isoweek";
import { useRouter } from "next/router";
import styles from "styles/Admin.module.css";
import Head from "next/head";

function Orders() {
    const nextWeek = useMemo(() => {
        const date = new Date();

        date.setDate(date.getDate() + 7);

        return date;
    }, []);

    const router = useRouter();

    const [year, setYear] = useState<number>(getWeekYear(nextWeek));
    const [week, setWeek] = useState<number>(getWeek(nextWeek));
    const { data, isLoading } = trpc.order.getOrderCounts.useQuery({
        year,
        week,
    });

    return (
        <>
            <Head>
                <title>Lunchr - Rendelések</title>
            </Head>
            <div className={styles.selection_container}>
                <button
                    onClick={() => router.push("/admin")}
                    className="border-none bg-red-500 p-3 hover:bg-red-700 transition-all rounded-lg text-md"
                >
                    Vissza
                </button>
                <div>
                    <input
                        type="number"
                        value={year}
                        className={styles.input}
                        onChange={(e) => {
                            setYear(Number(e.target.value));
                        }}
                    />

                    <input
                        type="number"
                        value={week}
                        className={styles.input}
                        onChange={(e) => {
                            setWeek(Number(e.target.value));
                        }}
                    />
                </div>
            </div>
            <div className={styles.orders_container}>
                {isLoading && <h2>Betöltés...</h2>}

                {data?.map((day, dayIndex) => {
                    return (
                        <div className="my-10 text-xl font-sans" key={dayIndex}>
                            {[
                                <h2 key={dayIndex}>
                                    {
                                        [
                                            "Hétfő",
                                            "Kedd",
                                            "Szerda",
                                            "Csütörtök",
                                            "Péntek",
                                            "Szombat",
                                            "Vasárnap",
                                        ][dayIndex]
                                    }
                                </h2>,
                                day?.map((order) => {
                                    return (
                                        <div key={order._id}>
                                            <span>
                                                <strong>{order._id}</strong>:{" "}
                                                {order.count}
                                            </span>
                                        </div>
                                    );
                                }),
                            ]}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Orders;
