const request = require("supertest");

const app = require("../app");
const config = require("../config");
let server

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjBiNmNlYWRhOWVhOTcyZjJkMmU1ZWY3IiwiaWF0IjoxNjIyNjA1ODY2fQ.IUOFkQF4eJi5OfHzg0qn6g_hfm3CcG3tuv3twPS5Sik"
const projectId = "60b7043576f4c114bb6fb159";
const taskId = "60b71316abf6683251aacb40";

beforeAll(async () => {
    await config.dbConnect()
    server = app.listen(3001)
})

describe('Tracker module', function () {
    it("List tracker [Unauthorized]", async () => {
        await request(server).get(`/projects/${projectId}/tasks/${taskId}`).send()
            .expect(200)
            .then(response => {
                expect(response.body.success).toBe(false);
                expect(response.body.error).toBe("Unauthorized");
            })
    })

    it("List task", async () => {
        await request(server)
            .get(`/projects/${projectId}/tasks/${taskId}/trackers`)
            .set('Authorization', token)
            .send({})
            .expect(200)
            .then(response => {
                expect(response.body.success).toBe(true);
            })
    })

    it("Create a tracker", async () => {
        await request(server)
            .post(`/projects/${projectId}/tasks/${taskId}/trackers/`)
            .set('Authorization', token)
            .send({
                startAt: new Date("2021/01/01 7:00:00"),
                finishedAt: new Date("2021/01/01 19:00:00"),
            })
            .expect(200)
            .then(response => {
                const {success, data} = response.body;
                expect(success).toBe(true);
                expect(data.task).toBe(taskId);
                expect(data.time).toBe(43200);
            })
    })

    it("Update task name", async () => {
        const trackerId = "60b71df1d5e40c42540d7a4c";

        await request(server)
            .put(`/projects/${projectId}/tasks/${taskId}/trackers/${trackerId}`)
            .set('Authorization', token)
            .send({
                startAt: new Date("2021/03/15 12:25"),
                finishedAt: new Date(),
            })
            .expect(200)
            .then(response => {
                const {success, data} = response.body;
                expect(success).toBe(true);
                expect(data.task).toBe(taskId);
                expect(data.time).toBeGreaterThan(43200);
            })
    })

});