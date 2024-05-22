import * as supertest from 'supertest';
import { app } from '../index';
import server from '../index';
import { tokentest } from './UserController.test';
import { project_id, cdc_id } from './CdcController.test';
import { planning_id } from './PlanningController.test';
import datatest from './Datatest';
let rex_id

describe('RexController Tests', () => {
  test('Create Rex', async () => {
    const res: supertest.Response = await supertest(app)
      .post('/api/rex')
      .auth(tokentest, { type: 'bearer' })
      .send(datatest.rex.data)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
  });

  test('Get rex by project', async () => {
    const res: supertest.Response = await supertest(app)
      .get('/api/rex/project/' + project_id)
      .auth(tokentest, { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
    rex_id = res.body.id || datatest.rex.id
  });

  test('Get rex by id', async () => {
    const res: supertest.Response = await supertest(app)
      .get('/api/rex/' + rex_id)
      .auth(tokentest, { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
  });

  test('Patch rex', async () => {
    const res: supertest.Response = await supertest(app)
      .patch('/api/rex/' + rex_id)
      .auth(tokentest, { type: 'bearer' })
      .send(datatest.rex.data)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
  });
});

export { rex_id }
// server.close()
