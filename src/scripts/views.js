const path = require('path');

class viewsController {
    constructor(){
        this.views = path.join(__dirname, '../views');
        this.url_index = path.join(this.views, 'index.html');
        this.url_loader = path.join(this.views, 'loader.html');
    }
};

module.exports = {viewsController};