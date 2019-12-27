import React, { Component } from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import Link from "next/link";

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const address = props.query.address;
        const campaign = Campaign(address);

        const summary = await campaign.methods.getSummary().call();

        return {
            address: address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards() {
        const {
            minimumContribution,
            balance,
            requestsCount,
            approversCount,
            manager
        } = this.props;

        const items = [
            {
                header: manager,
                meta: "Address of manager",
                description:
                    "The manager created this campaign and can create requests to withdraw money",
                style: { overflowWrap: "break-word" }
            },
            {
                header: minimumContribution,
                meta: "Minimum Contribution (wei)",
                description:
                    "You must contribute at least this much wei to become an approuver",
                style: { overflowWrap: "break-word" }
            },
            {
                header: requestsCount,
                meta: "Number of requests",
                description:
                    "A request tries to withdraw money from the contract. Request must be approved by approvers",
                style: { overflowWrap: "break-word" }
            },
            {
                header: approversCount,
                meta: "Number of approvers",
                description:
                    "Number of people who have altredy donated to this campaign"
            },
            {
                header: web3.utils.fromWei(balance, "ether"),
                meta: "Campaign balance",
                description:
                    "The balance is how much money this campaign has left to spend"
            }
        ];

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <h3>Campaign details</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link
                                href={`/campaigns/${this.props.address}/requests`}
                            >
                                <a>
                                    <Button primary>View requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;
