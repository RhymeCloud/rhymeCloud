var User = require('../models/user');
var bodyParser = require('body-parser');

module.exports = function(app){
	
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));

    app.get('/api/setUpUsers', function(req, res){ 
        //seed data
        var starterUsers = [
            {
                email: 'user1@gmail.com',
                password: 'user1',
                firstName: 'userOne',
                lastName: 'userOne lastname',
                dob: '12-08-1983',
                city: 'mex',
                favorites: 'favorites one'
            },
            {
                email: 'user2@gmail.com',
                password: 'user2',
                firstName: 'user2',
                lastName: 'user2 lastname',
                dob: '12-08-1993',
                city: 'can',
                favorites: 'favorites two'
            },
            {
                email: 'user3@gmail.com',
                password: 'user3',
                firstName: 'userThree',
                lastName: 'userThree lastname',
                dob: '12-08-2003',
                city: 'us',
                favorites: 'favorites three'
            }
        ];
       
        User.create(starterUsers, function(err, results){
            res.send(results);
        });
    });

	app.get('/api/allUsers', (req, res) => {
        User.find({}, (err, usersList) => {
            if(err) throw err;
            res.json(usersList);
        });
    });

    app.get('/api/userById/:id', (req, res) => {  
       User.findById({ _id: req.params.id }, (err, user) => {
           if(err) throw err;
           res.json(user);
       });   
    });

    app.get('/api/userByName/:uname', (req, res) => {
        User.find({ firstName: req.params.uname },
           function(err, user){
               if(err) throw err;
               res.json(user);
        }); 
    });

    app.delete('/api/user/:id', (req, res) => { 
        User.findByIdAndRemove(req.params.id, (err, user) => {
            
            if(err) throw err;

            response = {
                message: "user successfully deleted",
                id: user._id
            }
            
            res.status(200).send(response);
        })        
    });


    app.post('/api/userPatch', function(req, res){
        
        if(req.body._id){
            
            User.findByIdAndUpdate( req.body._id, {
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                dob: req.body.dob,
                city: req.body.city,
                favourites: req.body.favourites
            }, function(err, course){
                if(err) throw err;
                res.send('Success');
            });
        
        }else{
            
            var newUs = new User(req.body);
            
            newUs.save( (err, createdObject) => {
                
                if(err) {
                    res.status(500).send(err);

                }
                
                res.status(200).send(createdObject);

            });
        }
    });
}