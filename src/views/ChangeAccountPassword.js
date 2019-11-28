import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import ChangePassword from "../components/change-password/ChangePassword";

const ChangeAccountPassword = () => (
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle title="Change Password" subtitle="Account" md="12" className="ml-sm-auto mr-sm-auto" />
    </Row>
    <Row>
      <Col lg="12">
        <ChangePassword />
      </Col>
    </Row>
  </Container>
);

export default ChangeAccountPassword;