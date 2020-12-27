import React from 'react';
// import { Button } from "@chakra-ui/react"
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

interface Props {
    url: string
}
// props: Props
export const ImageComponent = (props: Props) => {
    const [url, setUrl] = React.useState(props.url)
    // const [img, setImg] = React.useState(true)

    // function refreshComponent () { 
    //     window.location.reload();
    // }
    return (
        <div className='inner'>
            <div className='inner'>
                <img src={url} className='fade-in'/>
            </div>
            <div>
                <Button colorScheme='danger' className="changeImage" onClick={() => setUrl(props.url + '?' + new Date().getTime())}>
                    View Next Image
                </Button>
            </div>
        </div>
    )
}

// default export ImageComponent;