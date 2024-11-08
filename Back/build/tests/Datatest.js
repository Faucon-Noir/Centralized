"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var datatest = {
    user: {
        data: {
            lastname: "Doe",
            firstname: "John",
            mail: "john.doe@example.com",
            password: "password",
        },
        id: "ae4bb54f-7e80-4c19-a6c8-8c7d3f8ba85e",
    },
    user2: {
        data: {
            lastname: "Test",
            firstname: "Test",
            mail: "test.test@example.com",
            password: "password",
        },
        id: "96ebde90-7be7-438c-bd2a-7b86b603e8a4",
    },
    team: {
        data: {
            name: "New Test Team",
        },
        id: "72e46816-5ff4-42ef-a000-8c95e9c6c38b",
    },
    project: {
        data: {
            name: "KPI-Taux de service",
            description: "Calculer et afficher le taux de service des déploiements de matériels en magasin",
            functionality: "Cliquer sur un bouton de menu latéral pour afficher le taux de service pour les déploiements de la période selectionnée",
            forecast: "Centralisation de la date de planification CIF dans la source unique Synthèse des data 1 semaines; Réalisation de la maquette: 1 semaines, implémentation de la règle de calcul: 3 semaines,Tests: 3 jours, Création de l’accès au rapport dans le menu: 0,2 jours",
            start_date: "2023-11-15",
            end_date: "2024-02-15",
            budget: "2500 € = 5 x TJ moyen; 500€",
            technology: "Lookerstudio; Gsheet; BigQuery",
            constraints: "Règle de calcul: (100 - Nb de magasins déployés hors planning cif pour des raisons IT) / nb de magasins à déployer",
            validation: "Affichage dans le looker central: WIP - KPI IT Magasins - Synthèse Déploiements Ici et présentation à la direction",
            team_user: "Pilotage: Judith ETAME / Ressources Back-end et Front end To Be Defined",
            color: 1,
            status: true,
        },
        id: "24411468-8707-4773-9af0-0e483cbaa459",
    },
    cdc: {
        data: {
            cdc: "Ceci est mon example de cahier des charges",
        },
        id: "16005ed0-19bc-4969-a393-de7d09d21d4a",
    },
    planning: {
        data: {
            start_date: "02-02-2002",
            end_date: "03-03-2003",
            projectId: "",
        },
        id: "381aebb9-bdd6-4951-b87b-0de5d3506dab",
    },
    ticket: {
        data: {
            title: "test",
            description: "test string",
            urgenceId: 0,
            status: "en cours",
            planningId: "9d95d80f-7af9-405c-8a46-6006c7a59b2e",
            start_date: "19-03-2024",
            end_date: "19-03-2025",
        },
        id: "13a59846-03ab-45da-8bbd-fffff09c5dd5",
    },
    rex: {
        data: {
            answer1: "string",
            answer2: "string",
            answer3: "string",
            projectId: "24411468-8707-4773-9af0-0e483cbaa459",
        },
        id: "0239d3c0-1233-44df-96f0-782b7b72269e",
    },
};
exports.default = datatest;
//# sourceMappingURL=Datatest.js.map