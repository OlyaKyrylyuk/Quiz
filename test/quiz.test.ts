//const request = require("supertest");
//import request from "supertest";
import app from "../index";
//const app = require("../index.ts");
import chai from "chai";
import chaiHttp from "chai-http";
import { expect } from "chai";

chai.use(chaiHttp);

describe("Quizes Tests", () => {
  it("GET /admin/quizes", (done) => {
    chai
      .request(app)
      .get("/admin/quizes")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.header("bearer");
        //expect(res.body).to.be.an('array');
        //cannot see data because of res.render in controller
        // with res.send everything is correct
        done();
      });
  });
  it("GET /quizes", (done) => {
    chai
      .request(app)
      .get("/quizes")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).not.to.have.header("bearer");
        //expect(res.body).to.be.an('array');
        //cannot see data because of res.render in controller
        // with res.send everything is correct
        done();
      });
  });

  it("GET /admin/quizes/add", (done) => {
    chai
      .request(app)
      .get("/admin/quizes/add")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.header("bearer");
        done();
      });
  });

  it("POST /admin/quizes/add", (done) => {
    let quiz = {
      name: "TestQuiz",
    };
    chai
      .request(app)
      .post("/admin/quizes/add")
      .send(quiz)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });
  it("GET /statistics", (done) => {
    chai
      .request(app)
      .get("/statistics")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.header("bearer");
        //expect(res.body).to.be.an('array');
        //cannot see data because of res.render in controller
        // with res.send everything is correct
        done();
      });
  });
});
