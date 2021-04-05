import app from "../index";
import chai from "chai";
import chaiHttp from "chai-http";
import { expect } from "chai";

chai.use(chaiHttp);

describe("Questions Tests", () => {
  it("GET /questions/add/quiz/:id ", (done) => {
    chai
      .request(app)
      .get("/questions/add/quiz/:id ")
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
