import React,{useState} from 'react'
import { Link, useRouteMatch, Route,Switch } from 'react-router-dom';
import MainSection from '../mainSection/MainSection';
import Dashboard from '../dashboard/Dashboard';
import DashboardIcon from '../../Assets/images/dashboard.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine,faQrcode,faDumbbell,faUserFriends,faArchive } from '@fortawesome/free-solid-svg-icons'
import { faAddressBook,faqrc } from '@fortawesome/free-regular-svg-icons'

const LeftBar = () => {
    const [activeLink, setActiveLink] = useState("dashboard")
    let { path, url } = useRouteMatch()
    const activateLink = {
        color: 'blue'
    }

    return (
        <div>
            <div className="left-section">
                <div className="logo">
                    <h1>Logo</h1>
                </div>
                <div className="tabs">
                    <ul>
                        <li><Link to={`${url}/dashboard`}><h3 style={activeLink === 'dashboard' ? activateLink : null}><FontAwesomeIcon icon={faChartLine} /> Dashboard</h3></Link></li>
                        <li><Link to={`${url}/member`}><h3 style={activeLink === 'member' ? activateLink : null} ><FontAwesomeIcon icon={faUserFriends} /> Members</h3></Link></li>
                        <li><Link to={`${url}/package`}><h3 style={activeLink === 'package' ? activateLink : null}><FontAwesomeIcon icon={faArchive} /> Packages</h3></Link></li>
                        <li><Link to={`${url}/trainer`}><h3 style={activeLink === 'trainer' ? activateLink : null}><FontAwesomeIcon icon={faDumbbell} /> Trainer</h3></Link></li>
                        <li><Link to={`${url}/membership`}><h3 style={activeLink === 'membership' ? activateLink : null}> <FontAwesomeIcon icon={faAddressBook} /> Membership</h3></Link></li>
                    </ul>
                </div>  
            </div>
            <Switch>
                <Route path={`${path}`} exact>
                    <div className="main-section">
                        <Dashboard />
                    </div>
                </Route>
                <Route path={`${path}/:id`}>
                    <MainSection setActiveLink={setActiveLink}/>
                </Route>  
            </Switch>
            
        </div>
        
    )
    
}

export default LeftBar;