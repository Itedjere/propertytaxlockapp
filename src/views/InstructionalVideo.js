import React, {Component, Fragment} from "react";
import axios from "axios";
import ReactPlayer from 'react-player'
import { CustomerContext } from "../contexts/PDProvider";
import { Alert, Badge, Card, CardHeader, CardBody, Container, Row, Col } from "shards-react";
import ListGroup from "react-bootstrap/ListGroup";

import "../assets/css/video-player.css";
import PageTitle from "../components/common/PageTitle";

class InstructionalVideo extends Component {
  static contextType = CustomerContext;

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    // Pull All The Documents For This Account
    const appCredentials = JSON.parse(localStorage.getItem("appState"));
    if (appCredentials) {
      const jwt = appCredentials.jwt;

      if (this.context.videos.length === 0) {

        const formData = new FormData();
        formData.append("jwt", jwt);

        axios.post(`${this.context.baseUrl}/videos/GetVideos.php`, formData)
        .then(response => {
            if (response.data.code === undefined) {
                // console.log(response.data);
                let allVideos = response.data.videos;
                // Add The Documents To Context
                this.context.setVideos(allVideos);

                // Check For Parameters From The Url
                if (this.props.match.params.videoid) {
                  this.makeVideoActive(this.props.match.params.videoid);
                }
                
            } else {
                // show an modal box
                let errorPayload = { 
                    code: response.data.code, 
                    message: response.data.message
                };
                console.log(errorPayload);
                // JWT Error
                this.setState({
                    errorModalOpened: true
                })
            }
        })
        .catch(error => {
            console.log(error);
        }) 
      } else {
        // Check For Parameters From The Url
        if (this.props.match.params.videoid) {
          this.makeVideoActive(this.props.match.params.videoid);
        }
      }
    }
  }

  makeVideoActive = (videoid) => {
    const { setActiveVideo } = this.context;
    setActiveVideo(videoid);
  }

  render() {
    console.log(this.props);
    const { videos, activeVideo } = this.context;
    // console.log(this.props);
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Instructional Videos" subtitle="Videos" className="text-sm-left" />
        </Row>

        <Row>
          {/* Editor */}
          <Col>
            <Card small className="mb-0">
              {
                videos.length > 0 ?
                (
                  <Fragment>
                    <CardHeader className="border-bottom">
                      <h5 className="mb-3">Click On A Video To Watch</h5>
                      <ListGroup>
                        {
                          videos.map((video, index) => (
                            <ListGroup.Item 
                              key={index}
                              action 
                              active={video.video_id === activeVideo.video_id}
                              className="flex-container"
                              onClick={() => this.makeVideoActive(video.video_id)}>
                              <span>
                                {
                                  video.video_id === activeVideo.video_id ? 
                                  (<i className="material-icons">play_arrow</i>) :
                                  null
                                }
                                { video.video_title }
                              </span>
                              <Badge theme="secondary">05:45</Badge>
                            </ListGroup.Item>
                          ))
                        }
                      </ListGroup>
                    </CardHeader>
                    <CardBody className="p-0 pb-3">
                      <div className="player-wrapper">
                        <ReactPlayer
                          className='react-player'
                          url={activeVideo.video_url}
                          width='100%'
                          height='100%'
                        />
                      </div>
                    </CardBody>
                  </Fragment>

                ) :
                (
                  <CardBody className="p-0 pb-3">
                    <Alert theme="primary">Sorry We Do Not Have Any Video Now</Alert>
                  </CardBody>
                )
              }
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default InstructionalVideo;
