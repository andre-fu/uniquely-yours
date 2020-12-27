import React, { useEffect } from 'react';

interface Props {
    url: string
}
// props: Props
export const ImageComponent = (props: Props) => {
    const [url, setUrl] = React.useState(props.url)
    // function refreshComponent () { 
    //     window.location.reload();
    // }
    return (
        <div className='inner'>
            <div className='inner'>
                <img src={url} className='image-fade'/>
            </div>
            <div>
            <button className="changeImage" onClick={() => setUrl(url + '?' + new Date().getTime())}>
                View Next Image
            </button>
            </div>
        </div>
    )
}

// default export ImageComponent;