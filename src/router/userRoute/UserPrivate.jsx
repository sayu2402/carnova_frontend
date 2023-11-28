import {Navigate} from 'react-router-dom'

function UserPrivate(props){
    if(localStorage.getItem('authTokens')){
        return props.children;
    }else{
        return <Navigate to='/user/dashboard' />
    }
}

export default UserPrivate;