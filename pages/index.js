import React, { Component } from "react";
import factory from "../ethereum/factory";
import Campaign from "../ethereum/campaign";
import Layout from "../components/Layout";
import { Card, Button, Grid } from "semantic-ui-react";
import Link from "next/link";

class CampaignIndex extends Component {
    static async getInitialProps() {
        // This is a NEXT.js method used to fetching information during server rendering
        const campaignsAddresses = await factory.methods
            .getDeployedCampaigns()
            .call();
        const campaigns = campaignsAddresses.map(async address => {
            const campaign = Campaign(address);
            const title = campaign.methods.title().call();
            return { address, title };
        });

        return { campaigns };
    }

    renderCampaigns() {
        const items = this.props.campaigns.map((address, title) => {
            return {
                header: title,
                description: (
                    <Link href={`/campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true,
                style: { overflowWrap: "break-word" }
            };
        });

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h3>Open Campaigns</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCampaigns()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Link href="/campaigns/new">
                                <a>
                                    <Button
                                        floated="right"
                                        content="Create Campaign"
                                        icon="add circle"
                                        primary
                                    />
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default CampaignIndex;
