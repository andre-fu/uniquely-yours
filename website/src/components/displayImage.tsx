import React, { useState, useEffect } from 'react';
// import { Button } from "@chakra-ui/react"
import { Button, Spinner } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useImage } from './useImage';
import { v4 as uuidv4 } from 'uuid';


interface Props {
    url: string
}
// props: Props
export const ImageComponent = (props: Props) => {
    const [url, setUrl] = React.useState(props.url +'/' + uuidv4());
    const [uuidVal, setUuidVal] = React.useState( uuidv4());

    const { hasLoaded, hasError } = useImage(url);
    if (hasError) {
        return null;
    }
    // console.log(url);
    return (
        <div className='inner'>
            <div className='inner'>
                {!hasLoaded && <Spinner color="dark"/>}
                {hasLoaded && <img src={url} className='fade-in'/>}
            </div>
            <div style={{ marginTop: '50px' }}>
            </div>
            <div>
                <Button color='info' onClick={() => {
                            setUuidVal(uuidv4());
                            setUrl(props.url +'/' + uuidVal + '?' + new Date().getTime())
                        }
                    }>
                    View Next Image
                </Button>
            </div>
        </div>
    )
}

// default export ImageComponent;