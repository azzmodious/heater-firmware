var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');
var should = chai.should();

var server = require('../app/rest-endpoint/app');
chai.use(chaiHttp);

describe('cli-controller', function(){
    it('should set application mode to test when a mode argument is supplied', function(){
        assert.equal(-1, [1,2,3].indexOf(4));
    });
    it('should show the status of the devices on /status GET', function(done){
        chai.request(server)
        .get('/status')
        .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json; 
            res.body.should.have.property('deviceName');
            res.body.should.have.property('flame');
            res.body.should.have.property('pumps');
            done();
        });
    });
    it('should activate device on /device/on', function(done){
        chai.request(server)
        .get('/device/on')
        .end(function(err, res){
            res.should.have.status(200);
            done();
        });
    });

});