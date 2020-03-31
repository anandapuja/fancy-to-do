const axios = require('axios');

class OngkirController {
    static getProvince(req,res){

        axios({
            "method": "GET",
            "url": `https://api.rajaongkir.com/starter/province?id=${req.query.id}`,
            "headers": {
                "key": "5ce68d6e5d1c59a68aaee22fe8eb8fe9"
            }
          }).then( data => {
              console.log(data.data);
              res.status(200).json({ data: data.data });
          }).catch( err => {
              res.status(400).json({ message: 'Data not found' });
          });

    }
    static postProvince(req,res){
        axios({
            method: 'post',
            url: 'http://   api.rajaongkir.com/user/12345',
            data: {
              firstName: 'Fred',
              lastName: 'Flintstone'
            }
        });
    }
}

module.exports = OngkirController;