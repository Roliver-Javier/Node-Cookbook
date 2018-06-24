//Converting an object to xml

var profiles = require('./profiles_enhanced'),
    xml2js = require('xml2js');

var builder = new xml2js.Builder({rootName: 'profiles'});
profiles = builder.buildObject(profiles);

profiles = profiles.replace(/name/g, 'fullname');
console.log(profiles);

//Parsing xml to object
xml2js.parseString(profiles,{
    explicitArray: false,
    explicitRoot: false
}, function(err, obj){
    profiles = obj;
    profiles.felix.fullname = "Felix Geisendorfer";
    console.log(profiles);
});