import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import classNames from 'classnames';

import "react-tabs/style/react-tabs.css";
import VacancyService from "./../../services/api/VacancyService";

import hourIcon from "../../assets/icons/Icon_aantal_uren.png";
import travelTimeIcon from "../../assets/icons/Icon_reistijd.png";
import thinkLevelIcon from "../../assets/icons/Icon_denkniveau.png";
import salaryIconIcon from "../../assets/icons/Icon_beloning.png";
import branchIcon from "../../assets/icons/Icon_match.png";

require("./vacancy.scss");

class Vacancy extends Component{

    constructor(props){
        super(props);

        this.vacancyService = new VacancyService();
        this.getTalentMatch = this.getTalentMatch.bind(this);

        this.state = { 
            tabIndex: 0,
            loading: true,
            vacancy: null
         };
    }

    componentDidMount() {
        console.log(this.props.selectedTalents);
        this.vacancyService.getById(this.props.vacancyId).then(res => {
            if(res && res.vacancy){
                this.setState({
                    vacancy: res.vacancy,
                    loading: false
                });
            }
        })
      }

    getTalentMatch(){
        var vacancyTalentCount = this.state.vacancy.Skills.length;
        var matchCount = this.state.vacancy.Skills.filter(s => this.props.selectedTalents.some(t => t.Name == s)).length;

        return(
            <span>{matchCount}/{vacancyTalentCount}</span>
        );
    }


    render(){
        if(this.state.loading){
            return (<div>De vacature wordt geladen...</div>);
        }

        return (
            <div className="row">
                <div className="col-md-9">
                    <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                        <TabList>
                            <Tab>Werkzaamheden</Tab>
                            <Tab>Skillset</Tab>
                            {/* <Tab>Bijzonderheden</Tab> */}
                            <Tab>Team en Bedrijf</Tab>
                            <Tab>Voorwaarden</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="tab__content-title">Wat ga je doen?</div>
                            {this.state.vacancy.Description}</TabPanel>
                        <TabPanel>
                            <div className="tab__content-title">Talenten</div>
                            <ul className="talents-overview">{this.state.vacancy.Skills.map(s => (
                                <li key={s}>{s}</li>
                            ))}</ul>
                        </TabPanel>
                        {/* <TabPanel>Bijzonderheden... ?</TabPanel> */}
                        <TabPanel>
                            <div className="tab__content-title">Met wie?</div>
                            {this.state.vacancy.Employer.Description}
                        </TabPanel>
                        <TabPanel>
                            <div className="tab__content-title">What's in it for me?</div>
                            {this.state.vacancy.SalaryFrom}
                        </TabPanel>
                    </Tabs>
                </div>
                <div className="col-md-3">
                    <div className="highlight">
                        <div className="block-title">Highlights</div>
                        <div className="highlight__items">
                            <ul>
                                <li className="highlight__item">
                                    <div className="highlight__item-icon"><img src={hourIcon} /></div>
                                    <div className="highlight__item-description">2 uur</div>
                                </li>
                                <li className="highlight__item">
                                    <div className="highlight__item-icon"><img src={travelTimeIcon} /></div>
                                    <div className="highlight__item-description">{this.state.vacancy.City}</div>
                                </li>
                                <li className="highlight__item">
                                    <div className="highlight__item-icon"><img src={thinkLevelIcon} /></div>
                                    <div className="highlight__item-description">{this.state.vacancy.ThinkLevel}</div>
                                </li>
                                <li className="highlight__item">
                                    <div className="highlight__item-icon"><img src={salaryIconIcon} /></div>
                                    <div className="highlight__item-description">&euro;{this.state.vacancy.SalaryFrom} - &euro;{this.state.vacancy.SalaryTill}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                
                    <div className="divider"></div>

                    <div className="talents">
                        <div className="block-title">Talenten match ({this.getTalentMatch()})</div>
                        <div className="talent-overview">{
                                this.state.vacancy.Skills.map(s => {
                                    
                                var itemClass = classNames(
                                    'talent-overview__item',
                                    {
                                        'talent-overview__item-selected': this.props.selectedTalents.some(t => t.Name == s)
                                    }
                                );

                                console.log(itemClass);
                                
                                return(<div className={itemClass} key={s}>
                                    {s}
                                </div>);
                            })}
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="contactperson">
                        <div className="block-title">Vragen of opmerkingen</div>
                    </div>
                </div>
            </div>
            
        );
    };
}

export default Vacancy;