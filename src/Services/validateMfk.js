function httpGetAsync(theUrl, callback)
{
    //https://apps.its.uiowa.edu/mfk/external-developer.html
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
        else if (xmlHttp.readyState == 4)
            callback(`0\nUnable to reach MFK validation service`); //simulate bad response
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
    let mfkParts = (mfk || '').split('-');
    
    if(mfkParts.length > mfkDefinition.length)
        return Promise.reject('MFK has too many parts.')

    for (let index = 0; index < mfkDefinition.length; index++) {
        if((mfkParts[index] || '').length != mfkDefinition[index].length )
            return Promise.reject(`${mfkDefinition[index].name} must be ${mfkDefinition[index].length} digits long.`)        
    }

    let mfkWithoutDashes = mfk.replace(/-/g,"");
    let url = `https://apps.its.uiowa.edu/mfk/api-singleDesc.jsp?mfk=10%20%20%20${mfkWithoutDashes}`;
    return new Promise((resolve, reject) => {
        httpGetAsync(url, (result)=> {
            let parts = result.split(/\n/); //split by new line
            if (parts[0] == 1)
                resolve();
            else
                reject(parts[1]);
        } );
    });
    

}

