import React, { Component } from "react";
import Layout from "../../components/Layout";

class CampaignShow extends Component {
    static async getInitialProps(props) {
        let address = props.query.address;
        return { address };
    }

    render() {
        return (
            <Layout>
                <h3>Campaign show {this.props.address}</h3>
            </Layout>
        );
    }
}

export default CampaignShow;
