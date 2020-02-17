import React, { Component } from "react";
import Layout from "../../../components/Layout";
import Link from "next/link";
import { Button, Table, Popup } from "semantic-ui-react";
import Campaing from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";
import web3 from "../../../ethereum/web3";
import isMetamaskInstalled from "../../../ethereum/metamaskCheck";

class RequestIndex extends Component {
    state = { isOwner: false };

    static async getInitialProps(props) {
        const address = props.query.address;

        const campaign = Campaing(address);
        const campaignOwner = await campaign.methods.manager().call();
        const requestsCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();
        const requests = await Promise.all(
            Array(parseInt(requestsCount))
                .fill()
                .map((element, index) => {
                    return campaign.methods.requests(index).call();
                })
        );
        return {
            address,
            requests,
            approversCount,
            requestsCount,
            campaignOwner
        };
    }

    async componentDidMount() {
        if (!isMetamaskInstalled()) return;

        await web3.currentProvider.enable();
        const account = await web3.eth.getAccounts();
        if (account[0] == this.props.campaignOwner) {
            this.setState({ isOwner: true });
        }
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return (
                <RequestRow
                    key={index}
                    id={index}
                    request={request}
                    address={this.props.address}
                    approversCount={this.props.approversCount}
                />
            );
        });
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;

        return (
            <Layout>
                <h3>Requests</h3>
                <Link href={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button
                            floated={"right"}
                            style={{ marginBottom: 10 }}
                            disabled={!this.state.isOwner}
                            primary
                        >
                            Add Request
                        </Button>
                    </a>
                </Link>

                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>{this.renderRows()}</Body>
                </Table>
                <div>Found {this.props.requestsCount} requests</div>
            </Layout>
        );
    }
}

export default RequestIndex;
