import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { ProductConsumer } from '../../../../contexts/PDProvider';


const SearchButtons = props => {
    return (
        <div className="d-flex flex-column">
            <ProductConsumer>
                {value => {
                    const { styles } = value;
                    return (
                        <ButtonGroup size="lg">
                            <Button 
                                onClick={() => props.handleSeachType('address')}
                                className={props.searchType === "address" ? `${styles.active}` : ""}
                            >Property Address</Button>
                            <Button 
                                onClick={() => props.handleSeachType('ownerName')}
                                className={props.searchType === "ownerName" ? `${styles.active}` : ""}
                            >Owner Name</Button>
                            <Button 
                                onClick={() => props.handleSeachType('accountNumber')}
                                className={props.searchType === "accountNumber" ? `${styles.active}` : ""}
                            >Account Number</Button>
                        </ButtonGroup>
                    );
                }}
            </ProductConsumer>
        </div>
    );
};


export default SearchButtons;