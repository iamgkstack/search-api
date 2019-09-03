const searchController = require('../controllers/searchController');

module.exports = [
  {
    version: 'v1',
    path: 'search/users/:name',
    method: 'get',
    action: searchController.find
  }
];
