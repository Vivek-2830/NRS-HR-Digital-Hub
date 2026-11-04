import * as React from 'react';
import styles from './AskHr.module.scss';
import { IAskHrProps } from './IAskHrProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from '@pnp/sp';

require('../assets/style.css');

export interface IAskHrState {
  ReachOutDetails: any;
  WhatToExpectDetails: any;
}

export default class AskHr extends React.Component<IAskHrProps, IAskHrState> {

  constructor(props: IAskHrProps, state: IAskHrState) {
  
    super(props);

    this.state = {
      ReachOutDetails: "",
      WhatToExpectDetails: ""
    }

  }

  public render(): React.ReactElement<IAskHrProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <>
        <section className="nrsHrDomains">
          <div className="nrsHomePage">
            <div className="hr-red-shapes"></div>
            <div className="hr-hero-copy">
              <h1 className="hr-title">HR Policies and Procedures</h1>
            </div>
            <div className="hr-team-photo" role="img" aria-label="Human Capital Management Group team"></div>
          </div>
        </section>

        <section className="askHr">

          <div className="ask-hr-container">

            <div className="breadcrumb">
              <a href="#">Home</a>
              <span>/</span>
              <span>Ask HR, Help and Support</span>
            </div>

            <div className="page-header">
              <h1>Ask HR, Help and Support</h1>
              <p>
                The Human Capital Management Group is here to help. Raise a question through the People Service Portal, or use the channels below.
              </p>
              <div className="header-line"></div>
            </div>

            <div className="ask-hr-banner">
              <div className="banner-icon">
                <span><img src={require('../assets/Ask.png')}/></span>
              </div>

              <div className="banner-content">
                <h2>{this.props.AskHRTitle || "Ask HR"}</h2>
                <p>
                  {this.props.AskHRDescription || "Submit a question or request through the People Service Portal, the Service HR helpdesk, and track it to resolution."}
                </p>
              </div>

              <a href={this.props.ServicePortalLink || "#"} className="portal-button">
                Open the People Service Portal
                <span><img src={require('../assets/Next.png')}/></span>
              </a>
            </div>

            <section className="contact-section">
              <h2>Other ways to reach us</h2>

              <div className="contact-grid">

                {
                  this.state.ReachOutDetails.length > 0 && this.state.ReachOutDetails.map((item: any) => {
                    return (
                      <div className="contact-card">
                        <div className="card-icon"><img src={item.Icon} /></div>
                        <h3>{item.Title}</h3>
                        <p>{item.Description}</p>
                        <a href="#">{item.ContactType}</a>
                      </div>
                    )
                  })
                }

              </div>
            </section>

          </div>

          <div className="hr-expect-container">

            <h2 className="expect-title">What to expect</h2>

            <div className="service-table-wrapper">
              <table className="service-table">
                <thead>
                  <tr>
                    <th>Service tier</th>
                    <th>What it covers</th>
                    <th>Response standard</th>
                  </tr>
                </thead>
                {
                  this.state.WhatToExpectDetails.length > 0 &&
                  this.state.WhatToExpectDetails.map((item: any) => {
                    return (
                      <tbody>
                        <tr>
                          <td>{item.Servicetier}</td>
                          <td>{item.Whatitcovers}</td>
                          <td>
                            {item.Responsestandard}
                          </td>
                        </tr>
                      </tbody>
                    )
                  })
                }
              </table>
            </div>

            <div className="escalation-box">
              <h3>{this.props.EscalationHeading || "Escalation"}</h3>
              <p>
                {this.props.EscalationDescription || "If your request is not resolved within the service standard above, ask for it to be escalated to the Director, Workforce Management through the People Service Portal."}
              </p>
            </div>

            <div className="faq-banner">

              <div className="faq-icon">
                FAQ
              </div>

              <div className="faq-content">
                <h3>{this.props.quickAnswer || "Looking for a quick answer?"}</h3>
                <p>{this.props.FAQsBaseQuestions || "The FAQs and Knowledge Base cover the questions we are asked most across HR."}</p>
              </div>

              <a href={this.props.BrowseFAQsLink || "#"} className="faq-button">
                Browse the FAQs
              </a>

            </div>

          </div>

        </section>
      </>

    );
  }

  public async componentDidMount() {
    this.getReachOutDetails();
    this.getWhatToExpactDetails();
  }

  public async getReachOutDetails() {
    const waysout = await sp.web.lists.getByTitle("Other Ways to Ask HR").items.select(
      "ID","Title","Description","ContactType","Icon"
    ).expand("AttachmentFiles").get();

    const AllData = waysout.map((item: any) => ({
      ID: item.ID || "",
      Title: item.Title || "",
      Description: item.Description || "",
      ContactType: item.ContactType || "",
      Icon: item.AttachmentFiles.length > 0 ? item.AttachmentFiles[0].ServerRelativeUrl : item.Icon ? JSON.parse(item.Icon).serverRelativeUrl : require(`../assets/Ask.png`)
    }));

    this.setState({ ReachOutDetails: AllData });
  }

  public async getWhatToExpactDetails() {
    const response = await sp.web.lists.getByTitle("What to expect").items.select(
      "ID","Servicetier","Whatitcovers","Responsestandard"
    ).get();

    const AllData = response.map((item: any) => ({
      ID: item.ID || "",
      Servicetier: item.Servicetier || "",
      Whatitcovers: item.Whatitcovers || "",
      Responsestandard: item.Responsestandard || ""
    }));

    this.setState({ WhatToExpectDetails: AllData });
  }

}
