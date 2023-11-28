import {Navigate} from 'react-router-dom'

function VendorPrivate(props){
    if(localStorage.getItem('authTokens')){
        return props.children;
    }else{
        return <Navigate to='/vendor/dashboard' />
    }
}

export default VendorPrivate;