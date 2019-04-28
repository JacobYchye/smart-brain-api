const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'ab06fb70d3914f3ba70ab2e4f76c7d3e'
   });

   const handleApiCall = (req,res) =>{
       app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
       .then(data=> res.json(data))
       .catch(err=>res.status(400).json('unable to work with api'))
   }
const imageHundler = (req, res, db)=> {
    const {id} =  req.body;
    db('users').where('id','=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0]))
    .catch(err => res.status(400).json('enable to get entries'))
}

module.exports = {
    imageHundler,
    handleApiCall
}