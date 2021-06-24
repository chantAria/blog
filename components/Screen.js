import {Image} from 'antd'

export default function Screen(){
    return (
        <div>
            <img 
            src='screen.jpg'
            className='img'></img>
            <style jsx>{`
                .img{
                    height:100vh;
                }
            `}</style>
        </div>
    )
}