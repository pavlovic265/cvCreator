var moment = require('moment');

module.exports = {
    customValidators: {
      regexFirstLastName: function(value){
        return /^[A-Z][a-z]{1,}$/.test(value);
      },
      regexFirstLastNameSearch: function(value){
        return /^[A-Za-z]{1,}$/.test(value);
      },
      regexUsername: function(value, type) {
        return /^[\w\d\-\_]{3,}$/.test(value);
      },
      regexPassword: function(value) {
        return /^[a-zA-Z0-9\_\.\-]{8,}$/.test(value);
      },
      regexTitle: function(value){
        return /^[A-Za-z0-9\s]{2,}$/.test(value);
      },
      regexLink: function(value) {
        return /^((http(s)?\:\/\/)|([w]{3}\.))[A-Za-z]{1,}\.[a-z]{2,3}(\.[a-z]{2,3})?([\/a-zA-Z0-9\.\&\?\?\=\+\-]*)?$/.test(value);
      },
      regexDescription: function(value){
        return /^[A-Za-z\s0-9\!\?\-\_\;\'\:\\\/\,\.\=\+\*\n]*$/.test(value);
      },
      isFileType: function(value, type) {
        return ('.jpg' === type || '.jpeg' === type || '.png' === type);
      },
      isDate: function(value){
        value = moment(value).format('MM/DD/YYYY');
        return moment(value, 'MM/DD/YYYY').isValid();
      },
      isContact: function(value){
        return /^[\d]{3}\/[\d]{7}$/.test(value);
      }
    }
};