export default defineEventHandler(async (event) => {
    const cf = getHeader(event, "cf-ipcountry");
    const vercel = getHeader(event, "x-vercel-ip-country");

    if (cf && cf !== "XX") return { country: cf.toUpperCase() };
    if (vercel) return { country: vercel.toUpperCase() };

    const forwarded = getHeader(event, "x-forwarded-for");
    const ip =
        forwarded?.split(",")[0]?.trim() ??
        event.node.req.socket.remoteAddress ??
        "";

    if (
        !ip ||
        ip === "::1" ||
        ip.startsWith("127.") ||
        ip.startsWith("::ffff:127.")
    ) {
        return { country: "DEV" };
    }

    try {
        const data = await $fetch<{ countryCode: string }>(
            `https://ip-api.com/json/${ip}?fields=countryCode`,
            { timeout: 2000 },
        );
        return { country: data.countryCode?.toUpperCase() ?? "UNKNOWN" };
    } catch {
        return { country: "UNKNOWN" };
    }
});
