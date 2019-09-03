const request = require('request');
const Users = require('../models/users');

/**
 * callback function for request method
 *
 * @param {*} req
 * @param {*} res
 * @param {*} error
 * @param {*} response
 * @param {*} body
 */
function callback(req, res, error, response, body) {
  if (!error && response.statusCode === 200) {
    const info = JSON.parse(body);
    const searchTerm = req.params.name;
    const searchResult = info.result.filter(user => {
      return user.first_name.includes(searchTerm) || user.last_name.includes(searchTerm);
    });

    return res.status(200).json(searchResult);
  }
  return res.status(200).json({});
}

module.exports = {
  find: async (req, res) => {
    try {
      const searchTerm = req.params.name;
      if (!searchTerm) {
        return res.status(400).json({
          message: 'search trem required'
        });
      }

      const searchedResultfromDb = await Users.find({ name: new RegExp(searchTerm) });
      if (searchedResultfromDb.length) {
        return res.status(200).json(searchedResultfromDb);
      }

      /**
       * options object for fetching the
       * data from external api
       */
      const options = {
        url: 'https://gorest.co.in/public-api/users',
        headers: {
          Authorization: 'Bearer UMbMtaQZUXjQTPYnFFdtXFcu_TAge23B2rVp'
        },
        rejectUnauthorized: false
      };
      return request(options, callback.bind(this, req, res));
    } catch (err) {
      return res.status(500).json({
        error: err
      });
    }
  }
};
