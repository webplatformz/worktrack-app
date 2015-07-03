/** @jsx React.DOM */

'use strict';
var Recordings = require('./../viewmodel/recordings');

var DayOverview = React.createClass({
    getInitialState: function () {
        return {date: Recordings.getActualDay() };
    },
    render: function () {
        return <div>
                <DaySwitch />
                <div>{this.state.date}</div>
                <DayNote />
            </div>;
    }
});

var DaySwitch = React.createClass({
    render: function () {
        return (
            <ul className="pagination">
                <li>
                    <a href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li>
                    <a href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        );
    }
});

var DayNote = React.createClass({
    getInitialState: function () {
        return { dayNote: Recordings.getActualDayNote() };
    },
    render: function () {
        return (
            <textarea>{this.state.dayNote}</textarea>
        );
    }
});

React.render(<DayOverview />, document.getElementById('dayView'));