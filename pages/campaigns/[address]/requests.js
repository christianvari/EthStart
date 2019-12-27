import React, { Component } from "react";
import Layout from "../../../components/Layout";
import Link from "next/link";
import { Button, Table } from "semantic-ui-react";
import Campaing from "../../../ethereum/campaign";

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const address = props.query.address;

        const campaign = Campaing(address);
        const requestsCount = await campaign.methods.getRequestsCount().call();
        const requests = await Promise.all(
            Array(parseInt(requestsCount))
                .fill()
                .map((element, index) => {
                    return campaign.methods.requests(index).call();
                })
        );

        return { address, requests };
    }
    render() {
        const { Header, Row, HeaderCell, Body } = Table;

        return (
            <Layout>
                <h3>Requests</h3>
                <Link href={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary>Add Request</Button>
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
                </Table>
            </Layout>
        );
    }
}

export default RequestIndex;
