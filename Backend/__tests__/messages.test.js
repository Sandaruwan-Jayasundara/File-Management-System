// const request = require("supertest");
// const app = require("../server");
// const datetime = new Date();
// const token = "ssad123212sad";
// const fs = require("fs");
// const request = require("../routes/message.route");

// describe("Post Endpoints", () => {
//   test("should unAthuroized", async () => {
//     const res = await request
//       .post("messages/")
//       .send({
//         subject: "Test",
//         message: "Testing Message",
//         user_email: "testing@gmail.com",
//         user_role: "Worker",
//         created_date: datetime,
//       })
//       .set("Authorizaiation", `Bearer ${token}`)
//       .expect(400);

//     console.log(res.body);
//   });
// });

const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("../routes/message.route");
const connectDB = require("../connection");
const jwt_decode = require("jwt-decode");

const datetime = new Date();
const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Inc5LWpyVC1FR013V19iWkE4Z1V1SCJ9.eyJpc3MiOiJodHRwczovL2Rldi1wMG9kaGt0Ym94MmdsMHhtLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJWN2NaM0J4cllJWXIyZWhQR3llNkFmbE0zTVNjZWtsTUBjbGllbnRzIiwiYXVkIjoidW5pcXVlIGlkZW50aWZpZXIiLCJpYXQiOjE2Njg2NzQ4OTYsImV4cCI6MTY2ODc2MTI5NiwiYXpwIjoiVjdjWjNCeHJZSVlyMmVoUEd5ZTZBZmxNM01TY2VrbE0iLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJwZXJtaXNzaW9ucyI6W119.pscFonM32yLYuOOqjQ9Gsw79GlBVkn6B-JZnb1F_3L90_AsdC7CG_hbaDJs0dtiQTvLrXTt91OyQPmXK5cCXNPwzMsUQrd-SwVDpAumzHd8Lr4LjAWfNeHSVZB2XkZ0SNPXQYnprNxVIFsA0d-gJtWngOvmwi6x8LNbt8CUwWP0_iMGEi7RsqvK9ADcKHeKhDLwjosJ2K_9ubW73WonPFGKz6cLhcxyLkq1hqT74QTL36BcMWktP7GQrHWpwOy1-IFGDM0_8MaPqfwY-MuR01Z9-zrN9D0LHU-pe6KUtm7AW19RmyzgGhgcwdlAdR6ZT1OAbBPIMaV7_KxSmJNq61A";
const message = {
  subject: "Test",
  message: "Testing Message",
  user_email: "testing@gmail.com",
  user_role: "Worker",
  created_date: datetime,
};

// Test root path
describe("Message services", () => {
  connectDB();

  let result;
  test("POST a message", (done) => {
    request(app)
      .post("/")
      .send(message)
      .set("Authorization", "abc123")
      .then((res) => {
        result = res.body;
        expect(res.statusCode).toBe(401);
        done();
      });
  });
});
