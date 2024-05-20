const request = require('supertest');

//const {expect} =require('chai').expect



const app = require('../app');


let chai;
before(async () => {
    chai = await import('chai');
});

describe("Test suites", () => {
    it("Test Get ALL data", async () => {
        const response = await request(app).get('/getdata');
        chai.expect(response.status).to.equal(200);
        chai.expect(response.body).to.have.property('Response');
    });
    it("should add a new record when valid data is provided", (done) => {
        const data = {
            id: 2,
            name: "manas",
            email: "xyz@gma123.com",
            ph_number: 1234567891,
            address: "123 Street, City",
            birthdate: "1990-01-01", // Example date format, adjust according to your requirements
            gender: "male", // Example gender value, adjust according to your requirements
            status: "active", // Example status value, adjust according to your requirements
            password:"123.com",
        };
        request(app)
            .post('/addData')
            .send(data)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                chai.expect(res.body).to.have.property("message", "Added successfully");
                done();
            });
    });
    
    it("Test All field required ", async () => {
        const data = {
            name: "m panda",
            id: 111,
            email: "xyz@gma123.com"
        }
        const response = await request(app).post('/addData').send(data)


        if (response.status === 200) {
            chai.expect(response.body).to.have.property("message", "Added successfully");
        } else {
            chai.expect(response.status).to.equal(409, "All field required");
        }
    })
    it("should update a record when valid data is provided", (done) => {
        const id = 11;
        const data = {
            name: "manas panda",
            email: "mpanda12@gmail.com",
            ph_number: 2345876432,
            address: "123 Street, City", // New field: address
            birthdate: "1990-01-01",     // New field: birthdate
            gender: "male",               // New field: gender
            status: "active"             // New field: status
        };
        request(app)
            .put(`/update/${id}`)
            .send(data)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                chai.expect(res.body).to.have.property("message", "update sucessful");
                done();
            });
    });
    
    it("should return an error when data is missing", async () => {
        const id = 1;
        const data = {}; // Empty data object
        const response = await request(app).put(`/update/${id}`).send(data);
        chai.expect(response.status).to.equal(409);
        chai.expect(response.body).to.have.property("message", "All field required");
    });
    it("should return an error when attempting to update a non-existent record", async () => {
        const id = 9; // 9 is not a valid id
        const data = {
            name: "manas panda",
            email: "mpanda12@gmail.com",
            ph_number: 2345876432,
        };
        const response = await request(app).put(`/update/${id}`).send(data);
        chai.expect(response.status).to.equal(404);
        chai.expect(response.body).to.have.property("message", "id not found");
    });
    it("DELETE--Return Error as id not found",async ()=>{
        let id
        const response= await request(app).delete(`/delete/${id}`);
        chai.expect(response.status).to.equal(409);
        chai.expect(response.body).to.have.property("message","Id not register");
    })
    // it("DELETE -- return true delete sucessfully", (done)=>{
    //     const id = 11;
    //     request(app)
    //     .delete(`/delete/${id}`)
    //     .set('Accept', 'application/json')
    //     .end((err, response) => {
    //         if (err) return done(err);
    //         chai.expect(response.status).to.equal(200);
    //         chai.expect(response.body).to.have.property("message", "deleted sucessfully");
    //         done();
    //     });
    // })
});


 