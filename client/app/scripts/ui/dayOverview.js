'use strict'

var DayOverview = React.createClass({
    render: function () {
        return (
            <div>
                <DaySwitch />

                <h1>Day Overview</h1>
            </div>
        );
    }
});

var DaySwitch = React.createClass({
    render: function () {
        return (
            <div>
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
            </div>
        );
    }
});

React.render(<DayOverview />, document.getElementById('content'));