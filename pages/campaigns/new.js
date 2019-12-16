import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Form, Button } from "semantic-ui-react";

class CampaignNew extends Component {
    render() {
        return (
            <Layout>
                <h3>Create a Campaign</h3>

                <Form>
                    <Form.Field>
                        <label>Minimum contribution</label>
                        <input />
                    </Form.Field>

                    <Button primary>Create!</Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;
