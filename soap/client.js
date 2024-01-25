
import soap from 'soap';
var url = 'http://localhost:8000/wsdl?wsdl';

// Create client
soap.createClient(url, function (err, client) {
    if (err) {
        throw err;
    }
    /* 
    * Parameters of the service call: they need to be called as specified
    * in the WSDL file
    */
    var args = {
        message: 0,
        splitter: ":"
    };
    // call the service
    client.TrainMessage(args, function (err, res) {
        if (err)
            throw err;
        // print the service returned result
        console.log(`121111`);


        console.log(res);
    });
});