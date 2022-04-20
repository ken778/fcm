const { response } = require('express');
var express = require('express');
var FCM = require('fcm-node');

 //server key
 const SERVER_KEY = 'AAAAUrb7gns:APA91bHx_bbNaNKzEcPP0xdtJDiU3VWCHPf71DR2VDU88crGEbEYP-foxRu8kaOmMXVn5pZvsFZlMJRkIfl720Nba1h8lgr3OPVbEdQKAtWIoST8B203fdBSc1-DsSFRHZujhdJgoK9k';
  

var app = express();

var port = process.env.PORT || 3000;

app.listen(port , ()=>{
    console.log('listening on port ', port);
});

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//fcm end point
app.post('/fcm',async(req, res, next)=>{
    try{
        let fcm = new FCM(SERVER_KEY);
        //notification
        let message = {
            to : '/topics/ ' + req.body.topic,
            Notification : {
                title : req.body.title,
                body : req.body.body,
                sound : 'default',
                "click_action" : "FCM_PLUGIN_ACTIVITY",
                "icon" : "fcm_push_icon",
            },
            data : req.body.data

        }
        console.log("data", message)
        //send message
        fcm.send(message, (err, response)=>{
            if(err){
                next(err);
            }else{
                res.json(response);
            }
        })
    } catch(error){
        next(error)
    }
}) 