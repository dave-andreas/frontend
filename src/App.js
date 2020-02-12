import React,{useEffect} from 'react';
import './App.css';
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Waitverif from './pages/waitverif'
import Verified from './pages/verified'
import AdminHome from './pages/admin/admin-home'
import Profile from './pages/user/user-profile'
import {Switch,Route} from 'react-router-dom'
import {getuser} from './redux/action'
import {useDispatch,useSelector} from 'react-redux'

function App () {
  const dispatch = useDispatch()
  const checked = useSelector(state=>state.auth.checked)
  const role = useSelector(state=>state.auth.role)
  
  console.log(checked)
  console.log(role)

  // window.location.reload
  useEffect(()=>{
    var id = localStorage.getItem('id')
    if(id){
      dispatch(getuser())
    }
  },[])

  if(role==='user'){
    return (
      <div>
        <Switch>
          <Route path={'/'} exact component={Home}/>
          <Route path={'/login'} exact component={Login}/>
          <Route path={'/profile'} exact component={Profile}/>
        </Switch>
      </div>
    );
  }else if(role==='admin'){
    return (
      <div>
        <Switch>
          <Route path={'/'} exact component={Home}/>
          <Route path={'/admin'} exact component={AdminHome}/>
          <Route path={'/login'} exact component={Login}/>
        </Switch>
      </div>
    );
  }else{
    return (
      <div>
        <Switch>
          <Route path={'/'} exact component={Home}/>
          <Route path={'/login'} exact component={Login}/>
          <Route path={'/register'} exact component={Register}/>
          <Route path={'/waitverif'} exact component={Waitverif}/>
          <Route path={'/verified'} exact component={Verified}/>
        </Switch>
      </div>
    );
  }
}

export default App;
