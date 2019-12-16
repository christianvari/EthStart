import React, { Component } from "react";
import { useRouter } from "next/router";

class CampaignShow extends Component {
    render() {
        return <h3>Campaign show {this.props.address}</h3>;
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
