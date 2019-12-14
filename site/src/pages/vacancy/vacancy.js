import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import classNames from 'classnames';
import queryString from "query-string";
import HeaderImage from "../../components/header-image/HeaderImage";
import "react-tabs/style/react-tabs.css";
import VacancyService from "./../../services/api/VacancyService";

import hourIcon from "../../assets/icons/Icon_aantal_uren.png";
import travelTimeIcon from "../../assets/icons/Icon_reistijd.png";
import thinkLevelIcon from "../../assets/icons/Icon_denkniveau.png";
import salaryIconIcon from "../../assets/icons/Icon_beloning.png";
import branchIcon from "../../assets/icons/Icon_match.png";

import headerImg from "../../assets/img/vacancy-detail-header.png";

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
        const that = this;
        const queryParams = queryString.parse(this.props.location.search);

        this.vacancyService.getById(queryParams.id).then(res => {
            if(res && res.vacancy){
                console.log(res.vacancy);
                this.setState({
                    vacancy: res.vacancy,
                    loading: false
                });
            }
        })
      }

    getTalentMatch(){
        // var vacancyTalentCount = this.state.vacancy.Skills.length;
        // var matchCount = this.state.vacancy.Skills.filter(s => this.props.selectedTalents.some(t => t.Name == s)).length;

        // return(
        //     <span>{matchCount}/{vacancyTalentCount}</span>
        // );
    }


    render(){
        if(this.state.loading){
            return (<div>De vacature wordt geladen...</div>);
        }

        return (
            <div>
                <React.Fragment>
                    <HeaderImage image={headerImg} />
                </React.Fragment>
                <div className="row">
                    <div className="col-md-9">
                        <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                            <TabList>
                                <Tab>Werkzaamheden</Tab>
                                <Tab>Skillset</Tab>
                                <Tab>Team &amp; Bedrijf</Tab>
                                <Tab>Voorwaarden</Tab>
                                <Tab>De Match</Tab>
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
                            <TabPanel>
                                <div className="tab__content-title">Met wie?</div>
                                {this.state.vacancy.Employer.Description}
                            </TabPanel>
                            <TabPanel>
                                <div className="tab__content-title">What's in it for me?</div>
                                {this.state.vacancy.SalaryFrom}
                            </TabPanel>
                            <TabPanel>
                                <div className="tab__content-title">De match</div>
                                {this.state.vacancy.SalaryFrom}
                            </TabPanel>
                        </Tabs>
                    </div>
                    <div className="col-md-3">
                        <div className="feature-block">
                            <div className="feature-logo">
                                <img src={this.state.vacancy.CompanyLogoUrl} />
                            </div>
                            <div className="feature-job-title">
                                {this.state.vacancy.Title}
                            </div>
                            <div className="feature-job-subline">
                            {this.state.vacancy.Employer.Name} | {this.state.vacancy.City} | {this.state.vacancy.ThinkLevel}
                            </div>
                            <div className="feature-cta">
                                <button className="btn" value="">Solliciteer nu ></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default Vacancy;