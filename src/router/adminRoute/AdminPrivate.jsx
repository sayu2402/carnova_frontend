import {Navigate} from 'react-router-dom'

function AdminPrivate(props){
    if(localStorage.getItem('authTokens')){
        return props.children;
    }else{
        return <Navigate to='/admin/dashboard' />
    }
}

export default AdminPrivate;