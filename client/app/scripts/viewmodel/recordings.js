'use strict';
var whatever = {
    getActualDay: function () {
        return new Day().toDateString();
    },
    getActualDayNote: function () {
        return "note";
    }
};