
const print = console.log;
const Nightmare = require('nightmare');


const assert = require('chai').assert
const expect = require('chai').expect

const { server } = require('../src/server');
const { MahasiswaData } = require('./objecttest')
const nightmare = Nightmare({ show: true });
// Mocha
describe('STMIK Bina Sarana Global - Testing', function (allDone) {
    this.timeout(500000)
    let baseUrl = '';    
    let serverPID = null;
    let previousData = null;
    before(function (done) {
        server.then(snap => {
            const { url, pid } = snap;            
            baseUrl = url
            serverPID = pid
            done()
        })
    })

    it("#1 : Web app harus running", function(done) {
        nightmare
            .goto(baseUrl)
            .wait('#wrapper')
            .evaluate(() => document.querySelectorAll('tr').length - 1)            
            .end()
            .then(jumlahData => {
                //     exists.should.be.true;
                expect(jumlahData).should.be.above(10)                                
                
                // previousData = jumlahData;    
                done()    
                
            })
    });

    // it("#2 : Add Mahasiswa", function (done) {

    //     print('2 IS RUNNING')
    //     nightmare
    //         .goto(baseUrl + '/mahasiswa/add')
    //         .wait('#wrapper')
    //         .type('form input[name="name"]', MahasiswaData.name)
    //         .type('form textarea[name="address"]', MahasiswaData.address)
    //         .type('form input[name="email"]', MahasiswaData.email)
    //         .type('form input[name="phone"]', MahasiswaData.phone)
    //         .click('form input[name="submit"]')
    //         .wait(2000)
    //         .evaluate(() => document.querySelectorAll('tr').length - 1)
    //         .end()
    //         .then(presentData => {
    //             // expect(presentData).to.equal(previousData + 1)
    //             done()
    //         })

    // });

    // It runs after each test
    afterEach(function (done) {
        // End the Nightmare instance        
        nightmare.end(done)
    });

});



// var should = require('chai').should();
// var Nightmare = require('nightmare');
// var server = require('../src/server');


// describe('Nightmare', function () {
//     var nightmare;
//     let baseUrl = '';
//     //before all of the tests,
//     before(async function (done) {
//         //have the test server listen on a given port
//         await server.then(snap=>{
//             baseUrl = snap.url
//             console.log(baseUrl)
//             done()
//         });
        
//     });

//     //before each test,
//     beforeEach(function () {
//         //create a new nightmare instance
//         nightmare = Nightmare({ show : true});
//     });

//     //after each test,
//     afterEach(function (done) {
//         //end the nightmare instance
//         nightmare.end(done);
//     })

//     it('WEB APP RUNNING', function (done) {
//         console.log('baseUrl ', baseUrl)
//         nightmare
//             //go to the test url
//             .goto(baseUrl)
//             .wait(10000)
//             //determine if the header with the title class exists
//             // .exists('h1.title')
//             // //execute the chain
//             // .then((exists) => {
//             //     //assert existence
//             //     exists.should.be.true;
//             // })
//             // .then(() => {
//             //     //return a nightmare-thennable to check if an anchor with the blahblahblah class exists
//             //     return nightmare.exists('a.blahblahblah')
//             // })
//             // .then((exists) => {
//             //     //assert nonexistence
//             //     exists.should.be.false;
//             // })
//             // //done
//             // .then(() => done());
//     });
// });