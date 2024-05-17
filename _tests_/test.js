const chai = import("chai");
const app = require("../src/app");
const chaiHttp = require("chai-http");
const subscribers = require("../src/models/subscribers");

const expect = chai.expect;
chai.use(chaiHttp);

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
