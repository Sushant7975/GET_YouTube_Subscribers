const chai = import('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);

const app = require("../src/app");
// const chaiHttp = require("chai-http");
const subscribers = require("../src/models/subscribers");

describe("API Testing", () => {
  describe("/", () => {
    it("should render html file", (done) => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
