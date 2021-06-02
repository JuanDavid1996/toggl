const request = require("supertest");

const app = require("../app");
const config = require("../config");
let server

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjBiNmNlYWRhOWVhOTcyZjJkMmU1ZWY3IiwiaWF0IjoxNjIyNjA1ODY2fQ.IUOFkQF4eJi5OfHzg0qn6g_hfm3CcG3tuv3twPS5Sik"

beforeAll(async () => {
    await config.dbConnect()
    server = app.listen(3001)
})

describe('Project module', function () {
    it("List project [Unauthorized]", async () => {
        await request(server).get("/projects").send()
            .expect(200)
            .then(response => {
                expect(response.body.success).toBe(false);
                expect(response.body.error).toBe("Unauthorized");
            })
    })

    it("List project", async () => {
        await request(server)
            .get("/projects")
            .set('Authorization', token)
            .send({})
            .expect(200)
            .then(response => {
                const data = response.body.data;
                const projectNames = data.map(pn => pn.name);
                expect(projectNames).toContain("(NO PROJECT)");
                expect(response.body.success).toBe(true);
            })
    })

    it("Create a project", async () => {
        const projectName = `PROJECT ${new Date().getTime()}`

        await request(server)
            .post("/projects")
            .set('Authorization', token)
            .send({
                name: projectName
            })
            .expect(200)
            .then(response => {
                const data = response.body.data;
                expect(data.name).toContain(projectName);
                expect(response.body.success).toBe(true);
                expect(response.body.data.owner).not.toBe(undefined);
            })
    })

    it("Update a project", async () => {
        const projectName = `PROJECT ${new Date().getTime()}`

        await request(server)
            .put("/projects/60b7043576f4c114bb6fb159")
            .set('Authorization', token)
            .send({
                name: projectName
            })
            .expect(200)
            .then(response => {
                const {success, data} = response.body;
                expect(data.name).toContain(projectName);
                expect(success).toBe(true);
            })
    })

});