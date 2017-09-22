var Poem = require('../models/poem');
var bodyParser = require('body-parser');

module.exports = function(app){
	
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));

	app.get('/api/setUpPoem', function(req, res){

        //seed data
        var starterPoem = [
            {
                userId : '59c56c3558b3550616dccccb',
                numberOfReads : 15, 
                title : 'poem title 1', 
                description : 'poem description', 
                poet : 'poet', 
                language : 'eng', 
                coverArt : 'covertArt', 
                releaseDate : 'releaseDate', 
                explicitContent : false
            }
        ];
       
        Poem.create(starterPoem, function(err, results){
            res.send(results);
        });
    });

	app.get('/api/allPoems', (req, res) => {
        Poem.find({}, (err, poemList) => {
            if(err) throw err;
            res.json(poemList);
        });
    });

    app.get('/api/poemById/:id', (req, res) => {  
       Poem.findById({ _id: req.params.id }, (err, user) => {
           if(err) throw err;
           res.json(user);
       });   
    });

    app.get('/api/poemByUserId/:uid', (req, res) => {
        Poem.find({ userId: req.params.uid },
           function(err, user){
               if(err) throw err;
               res.json(user);
        }); 
    });

    app.delete('/api/poem/:id', (req, res) => { 
        Poem.findByIdAndRemove(req.params.id, (err, poem) => {
            
            if(err) throw err;

            response = {
                message: "poem successfully deleted",
                id: poem._id
            }
            
            res.status(200).send('Success');
        })        
    });


    app.post('/api/poemPatch', function(req, res){
        
        if(req.body._id){
           
            Poem.findByIdAndUpdate( req.body._id, {
                userId : req.body.userId,
                numberOfReads : req.body.numberOfReads, 
                title : req.body.title, 
                description : req.body.description, 
                poet : req.body.description, 
                language : req.body.language, 
                coverArt : req.body.coverArt, 
                releaseDate : req.body.releaseDate, 
                explicitContent : req.body.explicitContent
            }, function(err, course){
                if(err) throw err;
                res.send('Success');
            });
        
        }else{
            
            var newPoem = new Poem(req.body);
            
            newPoem.save( (err, createdObject) => {
                
                if(err) {
                    res.status(500).send(err);

                }
                
                res.status(200).send(createdObject);

            });
        }
    });
}