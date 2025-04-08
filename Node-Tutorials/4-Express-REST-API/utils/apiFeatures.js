class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = {...this.queryString};
        const excludeFields = ['page', 'sort', 'limit', 'fields'];

        excludeFields.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    sort() {
        // console.log(typeof this.queryString.sort)
        if(this.queryString.sort === 'true') {
            this.query = this.query.sort('price'); // default sort;
        }
        else if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('price'); // default sort;
        }
        return this;
    }

    limitFields(){
        if(this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v'); //- means it will not show
        }
        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 | 1  //choose page if present or default it will choose page 1
        const limit = this.queryString.limit * 1 | 100  //set limit of data in each page if present or default it will set limit to 1

        const skip = (page - 1) * limit; //if page no is choosen, how much data we have to skip;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

module.exports = APIFeatures