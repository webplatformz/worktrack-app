'use strict';
var whatever = {
    getActualDay: function () {
        return new Date().toDateString();
    },
    getActualDayNote: function () {
        return "note";
    }
};

module.exports = whatever;