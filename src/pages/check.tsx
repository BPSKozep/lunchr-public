import { useRouter } from "next/router";

import React, { useEffect } from "react";

function CheckRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/admin/check");
    }, [router]);

    return <></>;
}

export default CheckRedirect;
