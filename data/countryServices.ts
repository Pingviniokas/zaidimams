export interface CountryService {
    description: string;
    features?: string[];
    seoDescription?: string;  // For meta tags
    seoKeywords?: string[];   // For meta tags
}

export interface CountryContent {
    [key: string]: {
        fullName: string;
        services: CountryService;
    };
}

export const countryServices: CountryContent = {
    "AT": {
        fullName: "Austrija",
        services: {
            description: "Teikiame perkraustymo į Austriją paslaugas...",
            features: [],
            seoKeywords: ["perkraustymas į austriją"]
        }
    },
    "BE": {
        fullName: "Belgija",
        services: {
            description: "Perkraustymo į Belgiją paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į belgiją"]
        }
    },
    "CH": {
        fullName: "Šveicarija",
        services: {
            description: "Perkraustymo į Šveicariją paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į šveicariją"]
        }
    },
    "CZ": {
        fullName: "Čekija",
        services: {
            description: "Perkraustymo į Čekiją paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į čekiją"]
        }
    },
    "DE": {
        fullName: "Vokietija",
        services: {
            description: "Teikiame pilną perkraustymo į Vokietiją paslaugų paketą, įskaitant baldų pervežimą, pakavimą ir sandėliavimą. Mūsų patyrusi komanda užtikrina saugų ir greitą Jūsų daiktų transportavimą į bet kurį Vokietijos miestą.",
            features: [
                "Tiesioginis pervežimas be perkrovimų",
                "Profesionalus pakavimas",
                "Krovinių draudimas",
                "Sandėliavimo galimybės"
            ],
            seoKeywords: ["perkraustymas į vokietiją", "baldų pervežimas", "krovinių gabenimas"]
        }
    },
    "DK": {
        fullName: "Danija",
        services: {
            description: "Perkraustymo į Daniją paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į daniją"]
        }
    },
    "EE": {
        fullName: "Estija",
        services: {
            description: "Perkraustymo į Estiją paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į estiją"]
        }
    },
    "ES": {
        fullName: "Ispanija",
        services: {
            description: "Perkraustymo į Ispaniją paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į ispaniją"]
        }
    },
    "FI": {
        fullName: "Suomija",
        services: {
            description: "Perkraustymo į Suomiją paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į suomiją"]
        }
    },
    "FR": {
        fullName: "Prancūzija",
        services: {
            description: "Perkraustymo į Prancūziją paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į prancūziją"]
        }
    },
    "GB": {
        fullName: "Didžioji Britanija",
        services: {
            description: "Perkraustymo į Didžiąją Britaniją paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į angliją", "perkraustymas į britaniją"]
        }
    },
    "HR": {
        fullName: "Kroatija",
        services: {
            description: "Perkraustymo į Kroatiją paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į kroatiją"]
        }
    },
    "HU": {
        fullName: "Vengrija",
        services: {
            description: "Perkraustymo į Vengriją paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į vengriją"]
        }
    },
    "IE": {
        fullName: "Airija",
        services: {
            description: "Perkraustymo į Airiją paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į airiją"]
        }
    },
    "IS": {
        fullName: "Islandija",
        services: {
            description: "Perkraustymo į Islandiją paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į islandiją"]
        }
    },
    "IT": {
        fullName: "Italija",
        services: {
            description: "Perkraustymo į Italiją paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į italiją"]
        }
    },
    "LT": {
        fullName: "Lietuva",
        services: {
            description: "Vietinio perkraustymo paslaugos Lietuvoje...",
            features: [],
            seoKeywords: ["perkraustymas lietuvoje"]
        }
    },
    "LU": {
        fullName: "Liuksemburgas",
        services: {
            description: "Perkraustymo į Liuksemburgą paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į liuksemburgą"]
        }
    },
    "LV": {
        fullName: "Latvija",
        services: {
            description: "Perkraustymo į Latviją paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į latviją"]
        }
    },
    "MD": {
        fullName: "Moldova",
        services: {
            description: "Perkraustymo į Moldovą paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į moldovą"]
        }
    },
    "NL": {
        fullName: "Nyderlandai",
        services: {
            description: "Perkraustymo į Nyderlandus paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į nyderlandus", "perkraustymas į olandiją"]
        }
    },
    "NO": {
        fullName: "Norvegija",
        services: {
            description: "Perkraustymo į Norvegiją paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į norvegiją"]
        }
    },
    "PL": {
        fullName: "Lenkija",
        services: {
            description: "Siūlome patikimas perkraustymo paslaugas į Lenkiją...",
            features: [
                "24/7 krovinių sekimas",
                "Dokumentų tvarkymas",
                "Asmeninis vadybininkas",
                "Greitas pristatymas"
            ],
            seoKeywords: ["perkraustymas į lenkiją", "krovinių pervežimas"]
        }
    },
    "PT.001": {
        fullName: "Portugalija",
        services: {
            description: "Perkraustymo į Portugaliją paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į portugaliją"]
        }
    },
    "RO": {
        fullName: "Rumunija",
        services: {
            description: "Perkraustymo į Rumuniją paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į rumuniją"]
        }
    },
    "RS": {
        fullName: "Serbija",
        services: {
            description: "Perkraustymo į Serbiją paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į serbiją"]
        }
    },
    "SE": {
        fullName: "Švedija",
        services: {
            description: "Perkraustymo į Švediją paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į švediją"]
        }
    },
    "SI": {
        fullName: "Slovėnija",
        services: {
            description: "Perkraustymo į Slovėniją paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į slovėniją"]
        }
    },
    "SK": {
        fullName: "Slovakija",
        services: {
            description: "Perkraustymo į Slovakiją paslaugos...",
            features: [],
            seoKeywords: ["perkraustymas į slovakiją"]
        }
    }
}; 