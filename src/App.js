import React,{useEffect} from 'react';
import './App.css';
import {Switch,Route} from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Waitverif from './pages/waitverif'
import Verified from './pages/verified'
import AdminHome from './pages/admin/admin-home'
import AdmModels from './pages/admin/admin-models'
import AdmFabrics from './pages/admin/admin-fabrics'
import MyComponent from './pages/admin/slide'
import Coba from './pages/admin/coba'
import Profile from './pages/user/user-profile'
import Models from './pages/models'
import Main from './pages/admin/main'
import Editmodel from './pages/admin/editmodel'
import Ordering from './pages/user/ordering'

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
          <Route path={'/verified'} exact component={Verified}/>
          <Route path={'/profile'} exact component={Profile}/>
          <Route path={'/models'} exact component={Models}/>
          <Route path={'/ordering'} exact component={Ordering}/>
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
          <Route path={'/models'} exact component={Models}/>
          <Route path={'/admmodels'} exact component={AdmModels}/>
          <Route path={'/admfabrics'} exact component={AdmFabrics}/>
          <Route path={'/slide'} exact component={MyComponent}/>
          <Route path={'/coba'} exact component={Coba}/>
          <Route path={'/main'} exact component={Main}/>
          <Route path={'/editmodel'} exact component={Editmodel}/>
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
          <Route path={'/models'} exact component={Models}/>
        </Switch>
      </div>
    );
  }
}

export default App;
