import React, { useEffect } from 'react';

interface Props {
    url: string
}
// props: Props
export const ImageComponent = (props: Props) => {
    const [url, getUrl] = React.useState(props.url)
    // function refreshComponent () { 
    //     window.location.reload();
    // }
    return (
        <div className='inner'>
            <img src={url} className='image-fade'/>
            <button className="changeImage" onClick={() => getUrl(url + '?' + new Date().getTime())}>
                View Next Image
            </button>
        </div>
    )
}

// default export ImageComponent;