import * as supertest from 'supertest';
import { app } from '../index';
import server from '../index';
import { tokentest } from './UserController.test';
let team_id
import datatest from './Datatest';


describe('TeamController Tests', () => {

  test('Create Team', async () => {
    const res: supertest.Response = await supertest(app)
      .post('/api/team/' + datatest.user.id)
      .auth(tokentest, { type: 'bearer' })
      .send(datatest.team.data)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
    team_id = res.body.team.id || datatest.team.id
  });

  test('Add user to team', async () => {
    const res: supertest.Response = await supertest(app)
      .post('/api/teamuser')
      .auth(tokentest, { type: 'bearer' })
      .send({ user: datatest.user.id, team: team_id })
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
  });

  test('Get team by user', async () => {
    const res: supertest.Response = await supertest(app)
      .get('/api/teamuser/user/' + datatest.user.id)
      .auth(tokentest, { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      console.log(res.body[0].id);
  });

  test('Get user by team', async () => {
    const res: supertest.Response = await supertest(app)
      .get('/api/teamuser/' + team_id)
      .auth(tokentest, { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
  });

  test('Get team by id', async () => {
    const res: supertest.Response = await supertest(app)
      .get('/api/team/' + team_id)
      .auth(tokentest, { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
  });

  test('Patch team', async () => {
    const res: supertest.Response = await supertest(app)
      .patch('/api/team/' + team_id)
      .auth(tokentest, { type: 'bearer' })
      .send(datatest.team.data)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
  });
});

// server.close()
export {team_id}
