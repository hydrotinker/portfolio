const GDPR_COUNTRIES = new Set([
    "DEV",
    "AT",
    "BE",
    "BG",
    "CH",
    "CY",
    "CZ",
    "DE",
    "DK",
    "EE",
    "ES",
    "FI",
    "FR",
    "GB",
    "GR",
    "HR",
    "HU",
    "IE",
    "IS",
    "IT",
    "LI",
    "LT",
    "LU",
    "LV",
    "MT",
    "NL",
    "NO",
    "PL",
    "PT",
    "RO",
    "SE",
    "SI",
    "SK",
]);

type ConsentStatus = "pending" | "accepted" | "declined";
type PrivacyRegime = "russia" | "gdpr" | "ccpa" | "none";

const STORAGE_KEY = "ht_consent";
const COUNTRY_KEY = "ht_consent_country";

function getRegime(country: string): PrivacyRegime {
    if (country === "RU") return "russia";
    if (GDPR_COUNTRIES.has(country)) return "gdpr";
    if (country === "US") return "ccpa";
    return "none";
}

export function useConsent() {
    const consentStatus = useState<ConsentStatus>(
        "consent-status",
        () => "pending",
    );
    const country = useState<string>("consent-country", () => "");
    const regime = useState<PrivacyRegime>("consent-regime", () => "none");
    const showBanner = useState<boolean>("consent-banner", () => false);
    const ready = useState<boolean>("consent-ready", () => false);

    async function initialize() {
        if (ready.value) return;

        const geo = await $fetch<{ country: string }>("/api/geo").catch(() => ({
            country: "UNKNOWN",
        }));
        country.value = geo.country;
        regime.value = getRegime(geo.country);

        const stored = import.meta.client
            ? localStorage.getItem(STORAGE_KEY)
            : null;

        if (stored === "accepted") {
            consentStatus.value = "accepted";
            if (regime.value !== "russia") activateGtag();
        } else if (stored === "declined") {
            consentStatus.value = "declined";
        } else if (regime.value === "none") {
            consentStatus.value = "accepted";
            activateGtag();
        } else {
            consentStatus.value = "pending";
            showBanner.value = true;
        }

        ready.value = true;
    }

    function activateGtag() {
        const { initialize: initGtag, gtag } = useGtag();
        initGtag();
        gtag("consent", "update", {
            analytics_storage: "granted",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
        });
    }

    function accept() {
        consentStatus.value = "accepted";
        showBanner.value = false;
        if (import.meta.client) {
            localStorage.setItem(STORAGE_KEY, "accepted");
            localStorage.setItem(COUNTRY_KEY, country.value);
        }
        if (regime.value !== "russia") activateGtag();
    }

    function decline() {
        consentStatus.value = "declined";
        showBanner.value = false;
        if (import.meta.client) {
            localStorage.setItem(STORAGE_KEY, "declined");
            localStorage.setItem(COUNTRY_KEY, country.value);
        }
    }

    return {
        consentStatus,
        country,
        regime,
        showBanner,
        ready,
        initialize,
        accept,
        decline,
    };
}
