module.exports = (template, data) => {
    let result = template.replace(/{%PRODUCTNAME%}/g, data.productName);
    result = result.replace(/{%DESCRIPTION%}/g, data.description);
    result = result.replace(/{%PRICE%}/g, data.price);
    result = result.replace(/{%IMAGE%}/g, data.image);
    result = result.replace(/{%ID%}/g, data.id);
    result = result.replace(/{%FROM%}/g, data.from);
    result = result.replace(/{%NUTRIENTS}/g, data.nutrients);
    result = result.replace(/{%QUANTITY%}/g, data.quantity);

    if(!data.organic){
        result = result.replace(/{%ORGANIC%}/g, 'not-organic');
    }
    // console.log(typeof result)
    return result;
}