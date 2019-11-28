import React, { Fragment, Component } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import ScrollAnimation from 'react-animate-on-scroll';
import Spinners from './Spinners';

export default class PropertyStatistics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statistics: [],
            Loading: true,
            baseUrl: process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_SERVER_SANDBOX_URL : process.env.REACT_APP_SERVER_PRODUCTION_URL,
        }
    }

    componentDidMount() {
        console.log('Props ComponentDidMount', this.props);
        if (this.props.property.accountNumber) {
            this.getPropertyStatistics();
        }
    }

    componentDidUpdate(prevProps) {
        console.log('Props ComponentDidUpdate', this.props);
        if (this.props.property.accountNumber !== prevProps.property.accountNumber) {
            this.getPropertyStatistics();
        }
    }

    getPropertyStatistics = () => {
        const { accountNumber } = this.props.property;
        axios.post(`${this.state.baseUrl}/getaddresses/fetchpercentagevalues.php`, {
            accountNum: accountNumber
        })
        .then(response => {
            if (response.data.code === "success") {
                const { statistics } = response.data;
                this.setState({ statistics, Loading: false })
            } else {
                this.setState({ statistics: [], Loading: false })
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    displayPropertyLineChart = () => {
        const { Loading, statistics } = this.state;

        if (Loading && statistics.length === 0) {
            return (
                <Fragment>
                    <Spinners />
                </Fragment>
            );
        }

        if (!Loading && statistics.length === 0) {
            return (<p>This Property Has No History Values Yet!!!</p>);
        }

        if (!Loading && statistics.length > 0) {
            let labels = [];
            let dataValue = [];
            // const labels = statistics.map(stat => stat.year);

            // const dataValue = statistics.map(stat => parseInt(stat.totalValue, 10));
            

            statistics.forEach(stat => {
                labels.push(stat.year);
                dataValue.push(parseInt(stat.TValue, 10));
            });

            console.log(dataValue);

            const data = {
                labels: labels,
                datasets: [
                    {
                        label: 'Tax Year / Market Value',
                        fill: 'origin',
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        // data: ['65', '59', '80', '81', '56', '55', '40']
                        data: dataValue
                    }
                ]
            };

            const options = {
                responsive: true,
                title: {
                    display: true,
                    text: 'VALUE HISTORY',
                    fontSize: 16
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Tax Year'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Market Value'
                        }
                    }]
                }
            };

            return (
                <Line 
                    data={data} 
                    options={options} 
                    height={220}
                />
            )
        }
    }

    displayPropertyTableValueChange = () => {
        const { Loading, statistics } = this.state;

        if (Loading && statistics.length === 0) {
            return (
                <Fragment>
                    <Spinners />
                </Fragment>
            );
        }

        if (!Loading && statistics.length === 0) {
            return (<p>This Property Has No History Values Yet!!!</p>);
        }

        if (!Loading && statistics.length > 0) {
            return (
                <Fragment>
                    <h5>Market Value Change</h5>
                    <table className="table table-striped table-sm table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Year</th>
                                <th scope="col" className="text-right">Market Value</th>
                                <th scope="col" className="text-right">% Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statistics.map((stat, index) => (
                                <tr key={index}>
                                    <td>{stat.year}</td>
                                    <td className="text-right">
                                        <span>{stat.FormattedTValue}</span>
                                    </td>
                                    <td className="text-right">
                                        <span>{stat.PercentageChange}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3">
                                    <small>(P) = Proposed, or preliminary, value </small>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </Fragment>
            )
        }
    }

    render() {

        const { styles } = this.props;

        return (
            <div className={styles.colorlibWork}>
                <div className="container">
                    <div className="row">
                        <div className={`col-md-6 ${styles.animateBox}`}>
                            <ScrollAnimation animateIn="fadeInUp">
                                <div className={`${styles.workGrid} bg-white py-3 text-center`}>
                                    {this.displayPropertyLineChart()}
                                </div>
                            </ScrollAnimation>
                        </div>
                        <div className={`col-md-6 ${styles.animateBox}`}>
                            <ScrollAnimation animateIn="fadeInUp" delay={500}>
                                <div className={`${styles.workGrid} bg-white p-3 text-center`}>
                                    {this.displayPropertyTableValueChange()}
                                </div>
                            </ScrollAnimation>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
