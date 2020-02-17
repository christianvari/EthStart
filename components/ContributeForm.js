import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import isMetamaskInstalled from "../ethereum/metamaskCheck";
import Router from "next/router";

class ContributeForm extends Component {
    state = {
        value: "",
        errorMessage: "",
        loading: false,
        isMetamaskInstalled: false
    };

    async componentDidMount() {
        if (isMetamaskInstalled()) {
            this.setState({ isMetamaskInstalled: true });
        }
    }

    onSubmit = async event => {
        event.preventDefault();

        const campaign = Campaign(this.props.address);

        this.setState({ loading: true, errorMessage: "" });

        try {
            await web3.currentProvider.enable();
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value)
            });
            Router.replace(`/campaigns/${this.props.address}`);
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }

        this.setState({ loading: false, value: "" });
    };

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to contribute</label>
                    <Input
                        onChange={event => {
                            this.setState({ value: event.target.value });
                        }}
                        value={this.state.value}
                        label="ether"
                        labelPosition="right"
                    />
                </Form.Field>
                <Message
                    error
                    header="Oops"
                    content={this.state.errorMessage}
                />
                <Button
                    primary
                    disabled={!this.state.isMetamaskInstalled}
                    loading={this.state.loading}
                >
                    Contribute!
                </Button>
            </Form>
        );
    }
}

export default ContributeForm;
