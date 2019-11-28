import React, { Fragment } from 'react';
import { ProductConsumer } from '../../../contexts/PDProvider';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
 
const Component = () => (
  <Fragment>
    <ProductConsumer>
      {value => {
        const { styles } = value;
        return (
          <GooglePlacesAutocomplete
            onSelect={console.log}
            placeholder="Enter Your Street Number and Street Name"
            autocompletionRequest={{
              componentRestrictions: {
                country: 'us'
              }
            }}    
            inputClassName={`${styles.name} form-control ${styles.formControl}`}
          />
        );
      }}
    </ProductConsumer>
  </Fragment>
);
 
export default Component;