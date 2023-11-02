import { trpc } from "utils/trpc";
import { useEffect, useState } from "react";
import type { Socket } from "socket.io-client";
import CountsTable from "components/CountsTable";
import Head from "next/head";
import styles from "styles/Home.module.css";
import Image from "next/image";

const ids = [
    "5b641345",
    "6bcdf544",
    "1329a4de",
    "2bd50545",
    "1bdaf844",
    "fb891345",
    "933c9dde",
    "fbf51145",
    "3132ae74",
    "83bb9bde",
    "cb83f444",
    "6be90545",
    "a13aae74",
    "cb900145",
    "bbe90545",
    "61f9ac74",
    "5b83f444",
    "8ba7ed44",
    "3b581345",
    "f35d9dde",
    "8bb70f45",
    "b1e9ac74",
    "e3609cde",
    "73549dde",
    "8b9d1345",
    "c31a8dde",
    "ebd10545",
    "eb91f444",
    "4b921345",
    "d3bc9bde",
    "000000",
    "000001",
];

export default function Home() {
    const [socketFailure, setSocketFailure] = useState<boolean>(false);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [nfcId, setNfcId] = useState<string>("");
    const [isSimulating, setIsSimulating] = useState(false);
    const {
        data: orderData,
        dataUpdatedAt,
        isSuccess,
    } = trpc.order.getOrder.useQuery(
        {
            nfcId,
        },
        {
            staleTime: Infinity,
            enabled: !!nfcId,
            cacheTime: 0,
        }
    );
    const { data: userData } = trpc.user.getUser.useQuery(
        {
            nfcId,
        },
        {
            staleTime: Infinity,
            enabled: !!nfcId,
            cacheTime: 0,
        }
    );
    // console.log(userData);
    const [orderCounts, setOrderCounts] = useState<{ [key: string]: number }>(
        {}
    ); // stores the count of each specific order
    const { mutate } = trpc.order.setCompleted.useMutation();
    const { mutate: deleteOrderData } =
        trpc.order.deleteAllOrderDataYesImNotKiddingThisWillReallyDeleteAllOrderData.useMutation();
    const [profileImageURL, setProfileImageURL] = useState<string>(
        `https://lunchr-cdn.bpskozep.hu/no_picture.png`
    );

    useEffect(() => {
        if (userData?.email)
            setProfileImageURL(
                `https://lunchr-cdn.bpskozep.hu/${userData?.email}.png`
            );
    }, [userData]);

    // useEffect(() => {
    //     const socket = io("http://127.0.0.1:27471", {
    //         auth: { passphrase: process.env.NEXT_PUBLIC_SOCKETIO_PASSPHRASE },
    //     });

    //     setSocket(socket);

    //     socket.on("disconnect", (err) => {
    //         console.log(err);
    //         setSocketFailure(true);
    //         socket.close();
    //     });

    //     socket.on("connect_error", (err) => {
    //         console.log(err);
    //         setSocketFailure(true);
    //         socket.close();
    //     });

    //     socket.on("tag", (uid: string) => {
    //         setNfcId(uid);
    //     });

    //     return () => {
    //         setSocket(null);
    //         socket.close();
    //     };
    // }, []);

    useEffect(() => {
        if (nfcId && isSuccess) {
            if (orderData.order) {
                mutate({ nfcId });
            }

            if (!orderData.failure) {
                socket?.emit("approve");
            } else {
                socket?.emit("reject");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataUpdatedAt]);

    useEffect(() => {
        if (orderData?.order) {
            if (!orderData.failure) {
                setOrderCounts((prev) => {
                    return {
                        ...prev,
                        [orderData.order]: prev[orderData.order]
                            ? prev[orderData.order] + 1
                            : 1,
                    };
                });
            }
        }
    }, [orderData]);

    useEffect(() => {
        let interval: NodeJS.Timer | null = null;

        if (isSimulating) {
            setNfcId(ids[Math.floor(Math.random() * ids.length)]);

            interval = setInterval(() => {
                setNfcId(ids[Math.floor(Math.random() * ids.length)]);
            }, 5000);
        }

        if (!isSimulating) {
            interval && clearInterval(interval);

            interval = null;
        }

        return () => {
            interval && clearInterval(interval);
        };
    }, [isSimulating]);

    if (socketFailure) {
        return (
            <>
                <div className={styles.center_container}>
                    <h2 className={styles.subtitle}>
                        {process.env.NEXT_PUBLIC_SOCKET_FAILURE}
                    </h2>

                    <CountsTable counts={orderCounts} />
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Lunchr</title>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                ></link>
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                ></link>
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                ></link>
                <link rel="manifest" href="/site.webmanifest"></link>
            </Head>
            <div className="absolute m-8">
                <button
                    className="border-none bg-red-600 p-3 hover:bg-red-400 transition-all rounded-lg text-sm"
                    onClick={() =>
                        setNfcId(ids[Math.floor(Math.random() * ids.length)])
                    }
                >
                    NFC Érintés
                </button>
                <button
                    className="border-none bg-red-600 p-3 hover:bg-red-400 transition-all rounded-lg text-sm ml-3"
                    onClick={() => {
                        deleteOrderData();
                        setOrderCounts({});
                        setNfcId("");
                    }}
                >
                    Adatbázis visszaállítása
                </button>
                <div className="my-4 border-none bg-red-600 transition-all rounded-lg text-sm h-10 w-100 text-center justify-center flex items-center">
                    <label className="relative flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isSimulating}
                            className="hidden peer"
                            onChange={(e) => setIsSimulating(e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-white">
                            Ebédeltetés szimulálása
                        </span>
                    </label>
                </div>
                <div className="text-center">
                    <h1>Jelenlegi email:</h1>
                    {orderData?.user ? (
                        <>
                            <span>{orderData.user.email}</span>
                        </>
                    ) : (
                        <span></span>
                    )}
                </div>
            </div>
            <div className={styles.center_container}>
                {orderData?.user ? (
                    <>
                        <Image
                            src={profileImageURL}
                            alt=""
                            className={styles.profile_picture}
                            height={200}
                            width={200}
                            onError={() =>
                                setProfileImageURL(
                                    "https://lunchr-cdn.bpskozep.hu/no_picture.png"
                                )
                            }
                        />
                        <h1 className={styles.title}>{orderData.user.name}</h1>
                        <h2
                            className={`${styles.subtitle} ${
                                orderData.order ? styles.success : ""
                            } ${orderData.failure ? styles.error : ""}`}
                        >
                            {orderData.order}
                        </h2>
                    </>
                ) : (
                    <h2 className={styles.subtitle}>
                        {!orderData
                            ? process.env.NEXT_PUBLIC_WAITING_FOR_NFC
                            : process.env.NEXT_PUBLIC_UNKNOWN_ERROR}
                    </h2>
                )}
                <CountsTable counts={orderCounts} />
                {/* <NumpadInput /> */}
            </div>
        </>
    );
}
