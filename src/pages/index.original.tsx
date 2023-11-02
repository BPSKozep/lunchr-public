import { trpc } from "utils/trpc";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import type { Socket } from "socket.io-client";
import CountsTable from "components/CountsTable";
import NumpadInput from "components/NumpadInput";
import Head from "next/head";
import styles from "styles/Home.module.css";
import Image from "next/image";

export default function Home() {
    const [socketFailure, setSocketFailure] = useState<boolean>(false);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [nfcId, setNfcId] = useState<string>("");
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
    const [profileImageURL, setProfileImageURL] = useState<string>(
        `https://cdn.bpskozep.hu/no_picture.png`
    );

    useEffect(() => {
        if (userData?.email)
            setProfileImageURL(`https://cdn.bpskozep.hu/${userData?.email}`);
    }, [userData]);

    useEffect(() => {
        const socket = io("http://127.0.0.1:27471", {
            auth: { passphrase: process.env.NEXT_PUBLIC_SOCKETIO_PASSPHRASE },
        });

        setSocket(socket);

        socket.on("disconnect", (err) => {
            console.log(err);
            setSocketFailure(true);
            socket.close();
        });

        socket.on("connect_error", (err) => {
            console.log(err);
            setSocketFailure(true);
            socket.close();
        });

        socket.on("tag", (uid: string) => {
            setNfcId(uid);
        });

        return () => {
            setSocket(null);
            socket.close();
        };
    }, []);

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
                                    "https://cdn.bpskozep.hu/no_picture.png"
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
                <NumpadInput />
            </div>
        </>
    );
}
