import { useRouter } from "next/router";
import React from "react";
import Head from "next/head";
import dashboardStyles from "styles/Dashboard.module.css";

function AdminDashboard() {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Lunchr - Kezelőpanel</title>
            </Head>
            <div className="text-center absolute top-52 space-x-10 space-y-10">
                <h1 className={dashboardStyles.title}>
                    BPSKözép Ebédrendszer Kezelőpanel
                </h1>
                <button
                    className="border-none bg-red-500 p-10 hover:bg-red-700 transition-all rounded-lg text-2xl py-5"
                    onClick={() => router.push("/admin/orders")}
                >
                    Rendelések
                </button>
                <button
                    className="border-none bg-red-500 p-10 hover:bg-red-700 transition-all rounded-lg text-2xl py-5"
                    onClick={() => router.push("/admin/check")}
                >
                    Token Ellenőrzés
                </button>
                <button
                    className="border-none bg-red-500 p-10 hover:bg-red-700 transition-all rounded-lg text-2xl py-5"
                    onClick={() => router.push("/admin/switch_tag")}
                >
                    Token Változtatás
                </button>
                <button
                    className="border-none bg-red-500 p-10 hover:bg-red-700 transition-all rounded-lg text-2xl py-5"
                    onClick={() => router.push("/admin/create_user")}
                >
                    Felhasználó Létrehozása
                </button>
            </div>
        </>
    );
}

export default AdminDashboard;
