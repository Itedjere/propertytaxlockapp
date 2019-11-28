import React, { Fragment } from 'react';
import { CustomerContext } from '../contexts/PDProvider';

export default class GoToTop extends React.Component {
    static contextType = CustomerContext;

    constructor(props) {
        super(props);
    
        this.state = {
            intervalId: 0,
            showScroller: false,
        }
    }

    componentDidMount() {
        document.addEventListener('scroll', () => {
            if (window.pageYOffset > 170) {
                this.setState({ showScroller: true })
            } else {
                this.setState({ showScroller: false })
            }
        })
    }

    scrollStep = () => {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    }
      
    scrollToTop = () => {
        let intervalId = setInterval(this.scrollStep, this.props.delayInMs);
        this.setState({ intervalId: intervalId });
    }

    render() {
        const { styles } = this.context;
        return (
            <Fragment>
                <div className={`${styles.gototop} js-top ${this.state.showScroller && styles.active}`}>
                    <button 
                        type="button" 
                        className={styles.jsGotop}
                        onClick={this.scrollToTop}
                    >
                        <i className="icon-arrow-up2"></i>
                    </button>
                </div>
            </Fragment>
        )
    }

}
