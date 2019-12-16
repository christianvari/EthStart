import React, { Component } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

class CampaignShow extends Component {
    render() {
        return (
            <Layout>
                <h3>Campaign show {this.props.address}</h3>
            </Layout>
        );
    }
}

export default () => {
    const router = useRouter();
    const address = router.query.address;
    return (
        <div>
            <CampaignShow address={address} />
        </div>
    );
};
