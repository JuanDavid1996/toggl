const request = require("supertest");

const app = require("../app");
const config = require("../config");
let server

beforeAll(async () => {
    await config.dbConnect()
    server = app.listen(3001)
})

describe('Session module', function () {
    it("Sign in should be a success", async () => {
        const credentials = {email: "judazuto@gmail.com", password: "12345678"}

        await request(server).post("/sessions/sign_in").send(credentials)
            .expect(200)
            .then(response => {
                expect(response.body.success).toBe(true);
                expect(response.body.data.user.email).toBe(credentials.email);
                expect(response.body.data.token).not.toBeUndefined();
            })
    })

    it("Sign in should be a error", async () => {
        const credentials = {email: "mail@gmail.com", password: "12345678"}

        await request(server).post("/sessions/sign_in").send(credentials)
            .expect(200)
            .then(response => {
                console.log(response.body)
                expect(response.body.success).toBe(false);
                expect(response.body.error).toBe("Wrong email or password");
            })
    })

    it("Sign in should be a error [no email and password]", async () => {
        const credentials = {}

        await request(server).post("/sessions/sign_in").send(credentials)
            .expect(200)
            .then(response => {
                expect(response.body.success).toBe(false);
                expect(response.body.error).toBe("Error: Please send a valid email address");
            })
    })

    it("Sign in should be a error [no password]", async () => {
        const credentials = {email: "test@test.co"}

        await request(server).post("/sessions/sign_in").send(credentials)
            .expect(200)
            .then(response => {
                expect(response.body.success).toBe(false);
                expect(response.body.error).toBe("Error: Please send a password");
            })
    })
});