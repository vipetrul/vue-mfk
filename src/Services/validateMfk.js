function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

let mfkDefinition = [
    { name: "Fund", length: 3 },
    { name: "Org", length: 2 },
    { name: "Dept", length: 4 },
    { name: "SubDept", length: 5 },
    { name: "Grant/Prg", length: 8 },
    { name: "IAcct", length: 4 },
    { name: "OAcct", length: 3 },
    { name: "DAcct", length: 5 },
    { name: "Fn", length: 2 },
    { name: "Cctr", length: 4 }
]

export default function ValidateMfk(mfk){
    console.log('Actually validating');
    let mfkParts = (mfk || '').split('-');
    
    if(mfkParts.length > mfkDefinition.length)
        return Promise.reject('MFK has too many parts.')

    for (let index = 0; index < mfkDefinition.length; index++) {
        if((mfkParts[index] || '').length != mfkDefinition[index].length )
            return Promise.reject(`${mfkDefinition[index].name} must be ${mfkDefinition[index].length} digits long.`)        
    }

    let mfkWithoutDashes = mfk.replace(/-/g,"");
    console.log("stripped",mfkWithoutDashes);
    let url = `https://apps.its.uiowa.edu/mfk/api-singleDesc.jsp?mfk=10%20%20%20${mfkWithoutDashes}`;
    console.log("Calling url:", url);
    return new Promise((resolve, reject) => {
        httpGetAsync(url, (result)=> {
            console.log("Validation result:", result);
            resolve();
        } );
    });
    

}

