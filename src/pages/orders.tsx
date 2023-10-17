import { useRouter } from "next/router";

import React, { useEffect } from "react";

function OrdersRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/admin/orders");
    }, [router]);

    return <></>;
}

export default OrdersRedirect;
