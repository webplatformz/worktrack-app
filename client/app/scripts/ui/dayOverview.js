/** @jsx React.DOM */

'use strict';
var Recordings = require('./../viewmodel/recordings');
var Rest = require('./../rest');

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
        return { dayNote: '' };
    },
    componentDidMount: function() {
        var that = this;
        console.log('getInitialState');

        var options = {
            host: 'localhost',
            port: 8080,
            path: '/worktimeitems/1',
            method: 'GET',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        Rest.getJSON(options,
            function(statusCode, result)
            {
                var json = JSON.stringify(result);
                console.log(json);
                that.setState({ dayNote: 'response received' });
            });
    },
    render: function () {
        return <div>{this.state.dayNote}</div>;
    }
});

React.render(<DayOverview />, document.getElementById('dayView'));