const request = require("supertest");

const app = require("../app");
const config = require("../config");
let server

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjBiNmNlYWRhOWVhOTcyZjJkMmU1ZWY3IiwiaWF0IjoxNjIyNjA1ODY2fQ.IUOFkQF4eJi5OfHzg0qn6g_hfm3CcG3tuv3twPS5Sik"
const projectId = "60b7043576f4c114bb6fb159";

beforeAll(async () => {
    await config.dbConnect()
    server = app.listen(3001)
})

describe('Tasks module', function () {
    it("List task [Unauthorized]", async () => {
        await request(server).get(`/projects/${projectId}/tasks/`).send()
            .expect(200)
            .then(response => {
                expect(response.body.success).toBe(false);
                expect(response.body.error).toBe("Unauthorized");
            })
    })

    it("List task [project not found]", async () => {
        await request(server)
            .get(`/projects/60b0000000f4c114bb6fb159/tasks/`)
            .set('Authorization', token)
            .send({})
            .expect(200)
            .then(response => {
                const {error} = response.body;
                expect(response.body.success).toBe(false);
                expect(error).toBe("Project not found");
            })
    })

    it("List task", async () => {
        await request(server)
            .get(`/projects/${projectId}/tasks/`)
            .set('Authorization', token)
            .send({})
            .expect(200)
            .then(response => {
                expect(response.body.success).toBe(true);
            })
    })

    it("Create a task [empty name]", async () => {
        const taskName = ``

        await request(server)
            .post(`/projects/${projectId}/tasks`)
            .set('Authorization', token)
            .send({
                name: ""
            })
            .expect(200)
            .then(response => {
                const data = response.body.data;
                expect(data.name).toContain(taskName);
                expect(response.body.success).toBe(true);
                expect(response.body.data.project).toBe(projectId);
            })
    })

    it("Find a task by id", async () => {
        const taskId = "60b71316abf6683251aacb40";
        await request(server)
            .get(`/projects/${projectId}/tasks/${taskId}`)
            .set('Authorization', token)
            .send()
            .expect(200)
            .then(response => {
                const {success, data} = response.body;
                expect(data._id).toBe(taskId);
                expect(success).toBe(true);
            })
    })

    it("Find a task by id [Task not found]", async () => {
        const taskId = "00b71316abf6683251aacb40";
        await request(server)
            .get(`/projects/${projectId}/tasks/${taskId}`)
            .set('Authorization', token)
            .send()
            .expect(200)
            .then(response => {
                const {success, error} = response.body;
                expect(success).toBe(false);
                expect(error).toBe("Task not found");
            })
    })


    it("Update task name", async () => {
        const taskName = `PROJECT ${new Date().getTime()}`

        await request(server)
            .put(`/projects/${projectId}/tasks/60b71316abf6683251aacb40`)
            .set('Authorization', token)
            .send({
                name: taskName
            })
            .expect(200)
            .then(response => {
                const {success, data} = response.body;
                expect(data.name).toContain(taskName);
                expect(success).toBe(true);
            })
    })

});