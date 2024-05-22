import * as supertest from 'supertest';
import { app } from '../index';
import server from '../index';
import { tokentest } from './UserController.test';
import { team_id } from './TeamController.test';
import { project_id, cdc_id } from './CdcController.test';
import { planning_id } from './PlanningController.test';
import datatest from './Datatest';
let ticket_id

describe('TicketController Tests', () => {
  test('Create Ticket', async () => {
    const res: supertest.Response = await supertest(app)
      .post('/api/ticket')
      .auth(tokentest, { type: 'bearer' })
      .send(datatest.ticket.data)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
    ticket_id = res.body.id || datatest.ticket.id
  });

  test('Get ticket by id', async () => {
    const res: supertest.Response = await supertest(app)
      .get('/api/ticket/' + ticket_id)
      .auth(tokentest, { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
  });

  test('Get ticket by planning', async () => {
    const res: supertest.Response = await supertest(app)
      .get('/api/ticket/planning/' + planning_id)
      .auth(tokentest, { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
  });

  test('Get ticket by project', async () => {
    const res: supertest.Response = await supertest(app)
      .get('/api/ticket/project/' + project_id)
      .auth(tokentest, { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
  });

  test('Get ticket by user', async () => {
    const res: supertest.Response = await supertest(app)
      .get('/api/ticket/user/' + datatest.user.id)
      .auth(tokentest, { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
  });

  test('Patch ticket', async () => {
    const res: supertest.Response = await supertest(app)
      .patch('/api/ticket/' + ticket_id)
      .auth(tokentest, { type: 'bearer' })
      .send(datatest.ticket.data)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
  });
});

// server.close()
export { ticket_id }
