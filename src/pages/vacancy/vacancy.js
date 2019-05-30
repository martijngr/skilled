import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import "react-tabs/style/react-tabs.css";
import VacancyService from "./../../services/api/VacancyService";

require("./vacancy.scss");

class Vacancy extends Component{

    constructor(props){
        super(props);

        this.vacancyService = new VacancyService();

        this.state = { tabIndex: 0 };
    }

    componentDidMount() {
        console.log(this.props.vacancyId);
      }

    render(){
        return (
            <div className="row">
                <div className="col-md-9">
                    <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                        <TabList>
                            <Tab>Werkzaamheden</Tab>
                            <Tab>Skillset</Tab>
                            <Tab>Bijzonderheden</Tab>
                            <Tab>Team en Bedrijf</Tab>
                            <Tab>Voorwaarden</Tab>
                        </TabList>
                        <TabPanel>panel 1</TabPanel>
                        <TabPanel>panel 2</TabPanel>
                    </Tabs>
                </div>
                <div className="col-md-3">
                </div>
            </div>
            
        );
        // return(
        //     <div className="row">
        //         <div className="col-md-9">
        //         <ul className="nav nav-tabs nav-fill">
        //             <li className="nav-item ">
        //             <a className="nav-link" id="work-tab" data-toggle="tab" href="#work" role="tab" aria-controls="home" aria-selected="true">Werkzaamheden</a>
        //             </li>
        //             <li className="nav-item">
        //             <a className="nav-link" id="skills-tab" data-toggle="tab" href="#skills" role="tab" aria-controls="home" aria-selected="true">Skillset</a>
        //             </li>
        //             <li className="nav-item">
        //             <a className="nav-link" id="remarks-tab" data-toggle="tab" href="#remarks" role="tab" aria-controls="home" aria-selected="true">Bijzonderheden</a>
        //             </li>
        //             <li className="nav-item">
        //             <a className="nav-link" id="team-tab" data-toggle="tab" href="#team" role="tab" aria-controls="home" aria-selected="true">Team en bedrijf</a>
        //             </li>
        //             <li className="nav-item">
        //             <a className="nav-link" id="conditions-tab" data-toggle="tab" href="#conditions" role="tab" aria-controls="home" aria-selected="true">Voorwaarden</a>
        //             </li>
        //         </ul>

        //         <div className="tab-content" id="myTabContent">
        //             <div className="tab-pane fade show active" id="work" role="tabpanel" aria-labelledby="home-tab">work</div>
        //             <div className="tab-pane fade" id="skills" role="tabpanel" aria-labelledby="profile-tab">skills</div>
        //             <div className="tab-pane fade" id="remarks" role="tabpanel" aria-labelledby="contact-tab">remarks</div>
        //             <div className="tab-pane fade" id="team" role="tabpanel" aria-labelledby="profile-tab">team</div>
        //             <div className="tab-pane fade" id="conditions" role="tabpanel" aria-labelledby="contact-tab">conditions</div>
        //         </div>
                    
        //         </div>
        //         <div className="col-md-3">
        //             Metadata
        //         </div>
        //     </div>
        // );
    };
}

export default Vacancy;