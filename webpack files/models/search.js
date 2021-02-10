import axios from 'axios';
//import { key, id } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    
    async getResults() {
    try {
        const key = '589dba958e9e9aa7e1fb4327eee4a0fd';
        const id = '75350927';
        var url = 'https://api.edamam.com/search?app_id=' +id+'&app_key='+key+'&q='+this.query+'&to=30';
        const res = await axios(url);
        this.result = res.data.hits;
//        console.log(this.result);
        } catch(error) {
            alert(error);
        }
    }
}

