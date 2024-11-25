import * as supertest from "supertest";
import { app } from "../index";
import server from "../index";
import { tokentest } from "./UserController.test";
import datatest from "./Datatest";
import { team_id } from "./TeamController.test";
import { parseDurations, sendMessage } from "../controller/SpecificationController";
import { AppDataSource } from "../db/data-source";
import { Ticket } from "../entity/Ticket";
import { Cdc } from "../entity/Specification";
import { Project } from "../entity/Project";

describe('Test function parseDurations', () => {
	it('must return empty, bad date', async () => {
        await expect(parseDurations("I am a test: 3 days", "2024-11-0")).toEqual([])
    })

	it('must return empty, no period', async () => {
        await expect(parseDurations("I am a test; You can't parse me", "2024-11-0")).toEqual([])
    })

	it('must return one date', async () => {
        await expect(parseDurations("I am a test: 3 days", "2024-11-08")).toEqual([new Date("2024-11-11T00:00:00.000Z")])
    })

	it('must return 2 dates', async () => {
        await expect(parseDurations("I am a test: 3 days, I am the second test: 1 month", "2024-11-08")).toEqual([new Date("2024-11-11T00:00:00.000Z"), new Date("2024-12-08T00:00:00.000Z")])
    })

	it('can use english single string', async () => {
        await expect(parseDurations("I am a test: 1 day, I am the second test: 1 month; I am hour: 1 hour, it work time: 1 week", "2024-11-08")).toEqual([new Date("2024-11-09T00:00:00.000Z"), new Date("2024-12-08T00:00:00.000Z"), new Date("2024-11-08T01:00:00.000Z"), new Date("2024-11-15T00:00:00.000Z")])
    })

	it('can use french single string', async () => {
        await expect(parseDurations("Je suis un test: 1 jour, Je suis le deuxieme test: 1 mois; je suis une heure: 1 heure, c'est l'heure de travailler: 1 semaine", "2022-02-28")).toEqual([new Date("2022-03-01T00:00:00.000Z"), new Date("2022-03-27T23:00:00.000Z"), new Date("2022-02-28T01:00:00.000Z"), new Date("2022-03-07T00:00:00.000Z")])
    })

	it('can use english plurial string', async () => {
        await expect(parseDurations("I am a test: 3 days, I am the second test: 2 months; I am hour: 3 hours, it work time: 2 weeks", "2024-11-08")).toEqual([new Date("2024-11-11T00:00:00.000Z"), new Date("2025-01-08T00:00:00.000Z"), new Date("2024-11-08T03:00:00.000Z"), new Date("2024-11-22T00:00:00.000Z")])
    })

	it('can use french plurial string', async () => {
        await expect(parseDurations("Je suis un test: 3 jours, Je suis le deuxieme test: 2 mois; je suis une heure: 3 heures, c'est l'heure de travailler: 2 semaines", "2025-12-08")).toEqual([new Date("2025-12-11T00:00:00.000Z"), new Date("2026-02-08T00:00:00.000Z"), new Date("2025-12-08T03:00:00.000Z"), new Date("2025-12-22T00:00:00.000Z")])
    })

	it('can use english blend string', async () => {
        await expect(parseDurations(
			"I am a test: 1 days, I am the second test: 1 months; I am hour: 1 hours, it work time: 1 weeks, I am a test: 2 day, I am the second test: 12 month; I am hour: 4 hour, it work time: 2 week", "2024-08-16"

		)).toEqual([new Date("2024-08-17T00:00:00.000Z"), new Date("2024-09-16T00:00:00.000Z"), new Date("2024-08-16T01:00:00.000Z"), new Date("2024-08-23T00:00:00.000Z"), new Date("2024-08-18T00:00:00.000Z"), new Date("2025-08-16T00:00:00.000Z"), new Date("2024-08-16T04:00:00.000Z"), new Date("2024-08-30T00:00:00.000Z")])
    })

	it('can use french blend string', async () => {
        await expect(parseDurations(
			"Je suis un test: 3 jour, Je suis le deuxieme test: 2 mois; je suis une heure: 12 heure, Je suis un test: 1 jours, Je suis le deuxieme test: 1 mois; je suis une heure: 1 heure", "2021-06-08"
		)).toEqual([new Date("2021-06-11T00:00:00.000Z"), new Date("2021-08-08T00:00:00.000Z"), new Date("2021-06-08T12:00:00.000Z"), new Date("2021-06-09T00:00:00.000Z"), new Date("2021-07-08T00:00:00.000Z"), new Date("2021-06-08T01:00:00.000Z")])
    })

	it('can create message', async () => {
        let cdcRepository = AppDataSource.getRepository(Cdc);
        let cdc = new Cdc('test');
        let project = new Project('name', 'description', 'functionality', 'forecast', new Date, new Date,
            'budget', 'technology', 'constraints', 'validation', 'template', false, 'teamRole', 0);
        await expect(sendMessage("je suis un test", "hello", cdc, cdcRepository, project)).toBeDefined();
    })
});

// server.close();
