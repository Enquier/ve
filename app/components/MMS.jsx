import {Component} from 'react';


class MMS extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projId: null,
            orgid: null,
            url: null,
            error: null,
            admin: false
        };
    }

    componentDidMount() {
        const orgId = this.props.match.params.orgid;
        this.setState({orgid: orgId});
        const projId = this.props.match.params.projectid;
        this.setState({projid: projId});
    }

    render() {
        return (
            <div><a href="http://localhost:9000/#/login/select">View Editor</a></div>
        );
    }
}

// Export component
ReactDOM.render(<BrowserRouter>
    <Route path={'/#/:orgid/:projectid'} component={MMS} />
</BrowserRouter>, document.getElementById('mms'));
}