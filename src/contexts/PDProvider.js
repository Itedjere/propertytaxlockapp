import React, {Component} from 'react';
import States from '../utils/States';
import Months from '../utils/Months';
import styles from '../assets/css/style.module.css';

const CustomerContext = React.createContext();


class PDProvider extends Component {

   state = {
       customer: {},
       orders: [],
       properties: [],
       documents: [],
       videos: [],
       activeVideo: {},
       notifications: [],
       USStates: States(),
       Months: Months,
       styles: styles,
       baseUrl: process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_SERVER_SANDBOX_URL : process.env.REACT_APP_SERVER_PRODUCTION_URL,
   }

   setNotifications = (notifications) => {
       this.setState({ notifications })
   }

   setVideos = (videos) => {
       this.setState({ videos });
       //   Also Set Active Video
       this.setActiveVideo();
   }

   setActiveVideo = (videoid="") => {
        this.setState(state => ({
            activeVideo: videoid === "" ? state.videos[0] : state.videos.find(video => video.video_id === videoid)
        }));
   }

   setCustomer = (customer) => {
       this.setState({ customer })
   }

   setOrder = (orders) => {
       this.setState({ orders })
   }

   setProperties = (properties) => {
        this.setState({ properties })
   }

   setDocuments = (documents) => {
       this.setState({ documents })
   }

   setSingleDocument = (document) => {
       this.setState({ documents: [...this.state.documents, document]})
   }

   emptyState = () => {
       this.setState({ 
           customer: {}, 
           orders: [], 
           properties: [],
           documents: [],
           videos: [],
           activeVideo: {},
           notifications: [],
        })
   }

    render() {
        return (
            <CustomerContext.Provider value={{
                ...this.state,
                setCustomer: this.setCustomer,
                setOrder: this.setOrder,
                emptyState: this.emptyState,
                setProperties: this.setProperties,
                setDocuments: this.setDocuments,
                setSingleDocument: this.setSingleDocument,
                setVideos: this.setVideos,
                setActiveVideo: this.setActiveVideo,
                setNotifications: this.setNotifications,
            }}>
               {this.props.children}
            </CustomerContext.Provider>
        )
    }
}

// Use this one for Functional Components
const ProductConsumer = CustomerContext.Consumer;

export {CustomerContext, PDProvider, ProductConsumer};