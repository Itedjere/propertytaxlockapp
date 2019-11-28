import React, { Fragment } from 'react';
import { ProductConsumer } from '../../contexts/PDProvider';

const StepsToReduction = props => {
    const { steps, children } = props;
    return (
        <ProductConsumer>
            {value => {
                const { styles } = value;
                return (
                    <Fragment>
                        <div className={`${styles.progress} ${styles.progressStacked_2}`}>
                            <div className={styles.progressBar} role="progressbar">
                                <span className={`${styles.progressBarStep} ${styles.progressBarStepCurrent}`}>1</span>
                                <span className={`${styles.progressBarDesc} ${styles.whiteText}`}>{ steps.step1 }</span>
                            </div>
                            <div className={styles.progressBar} role="progressbar">
                                <span className={styles.progressBarStep}>2</span>
                                <span className={`${styles.progressBarDesc} ${styles.whiteText}`}>{ steps.step2 }</span>
                                <span className={`${styles.progressBarStep}  ${styles.progressBarStepLast}`}>3</span>
                                <span className={`${styles.progressBarDesc} ${styles.whiteText} ${styles.progressBarDescLast}`}>{ steps.step3 }</span>
                            </div>
                        </div>
                        { children }
                    </Fragment>
                );
            }}
        </ProductConsumer>
    );
};

export default StepsToReduction;