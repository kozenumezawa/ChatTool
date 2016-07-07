import React from 'react'

import { Grid } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { Tabs } from 'react-bootstrap'
import { Tab } from 'react-bootstrap'

import Header from './navbar/header'
import SideMenu from './navbar/sidemenu'
import Members from './members'

export default class main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="wrap">
        <Header />

        <Grid>
          <Row>
            <Col md={3}>
              <SideMenu />
            </Col>
            <Col md={9}>
              <Tabs defaultActiveKey={1}>
                <Tab eventKey={1} title="Start">
                  <Members />
                </Tab>
                <Tab eventKey={2} title="Sub"></Tab>
                <Tab eventKey={3} title="Other"></Tab>
              </Tabs>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}