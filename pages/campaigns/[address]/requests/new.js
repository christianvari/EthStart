import React, { Component } from "react";
import Campaign from "../../../../ethereum/campaign";
import { Form, Input, Button, Message } from "semantic-ui-react";
import Layout from "../../../../components/Layout";
import web3 from "../../../../ethereum/web3";
import Router from "next/router";
import Link from "next/link";

class RequestNew extends Component {
    state = {
        value: "",
        description: "",
        recipient: "",
        loading: false,
        errorMessage: ""
    };

    static async getInitialProps(props) {
        const address = props.query.address;
        return { address };
    }

    onSubmit = async event => {
        event.preventDefault();

        const campaign = Campaign(this.props.address);
        const { description, value, recipient } = this.state;

        this.setState({ loading: true, errorMessage: "" });
        try {
            const accounts = await web3.eth.getAccounts();

            await campaign.methods
                .createRequest(
                    description,
                    web3.utils.toWei(value, "ether"),
                    recipient
                )
                .send({ from: accounts[0] });

            Router.push(`/campaigns/${this.props.address}/requests`);
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }
        this.setState({ loading: false });
    };

    render() {
        return (
            <Layout>
                <Link href={`/campaigns/${this.props.address}/requests`}>
                    <a>
                        <Button primary>Back</Button>
                    </a>
                </Link>
                <h3>Create a Request</h3>
                <Form
                    onSubmit={this.onSubmit}
                    error={!!this.state.errorMessage}
                >
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={this.state.description}
                            onChange={event => {
                                this.setState({
                                    description: event.target.value
                                });
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Value</label>
                        <Input
                            value={this.state.value}
                            onChange={event => {
                                this.setState({ value: event.target.value });
                            }}
                            label="ether"
                            labelPosition="right"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            value={this.state.recipient}
                            onChange={event => {
                                this.setState({
                                    recipient: event.target.value
                                });
                            }}
                        />
                    </Form.Field>

                    <Message
                        error
                        header={"Oops!"}
                        content={this.state.errorMessage}
                    />

                    <Button loading={this.state.loading} primary>
                        Create!
                    </Button>
                </Form>
            </Layout>
        );
    }
}

export default RequestNew;
