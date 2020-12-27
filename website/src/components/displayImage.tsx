import React, { useEffect } from 'react';
// import AwesomeButton from 'react-awesome-button/src/components/AwesomeButton';
// import AwesomeButtonProgress from 'react-awesome-button/src/components/AwesomeButtonProgress';
// import AwesomeButtonSocial from 'react-awesome-button/src/components/AwesomeButtonSocial';

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
                <button className="changeImage" onClick={() => setUrl(props.url + '?' + new Date().getTime())}>
                    View Next Image
                </button>
                {/* <AwesomeButton type="primary" onClick={() => setUrl(props.url + '?' + new Date().getTime())}>
                    Primary
                </AwesomeButton> */}
                {/* <button className="changeImage" onClick={() => refreshComponent() }>
                    View Next Image
                </button> */}
            </div>
        </div>
    )
}

// default export ImageComponent;