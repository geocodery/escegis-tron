const path = require('path');

class viewsController {
    constructor(){
        this.views = path.join(__dirname, '../views');
        this.url_index = path.join(this.views, 'index.html');
    }
};

module.exports = {viewsController};