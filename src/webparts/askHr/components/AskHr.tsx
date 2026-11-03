import * as React from 'react';
import styles from './AskHr.module.scss';
import { IAskHrProps } from './IAskHrProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from '@pnp/sp';

require('../assets/style.css');

export interface IAskHrState {
}

export default class AskHr extends React.Component<IAskHrProps, IAskHrState> {

  constructor(props: IAskHrProps, state: IAskHrState) {
  
    super(props);

    this.state = {
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
                <span>▤</span>
              </div>

              <div className="banner-content">
                <h2>Ask HR</h2>
                <p>
                  Submit a question or request through the People Service Portal, the Service HR helpdesk, and track it to resolution.
                </p>
              </div>

              <a href="#" className="portal-button">
                Open the People Service Portal
                <span>↗</span>
              </a>
            </div>

            <section className="contact-section">
              <h2>Other ways to reach us</h2>

              <div className="contact-grid">

                <div className="contact-card">
                  <div className="card-icon">▤</div>
                  <h3>People Service Portal</h3>
                  <p>Log and track an HR request.</p>
                  <a href="#">Ask HR, above</a>
                </div>


                <div className="contact-card">
                  <div className="card-icon">▤</div>
                  <h3>Email HR</h3>
                  <p>For general queries and document requests.</p>
                  <a href="mailto:peopleservices@nrs.gov.ng">
                    peopleservices@nrs.gov.ng
                  </a>
                </div>

                <div className="contact-card">
                  <div className="card-icon">♧</div>
                  <h3>Call HR</h3>
                  <p>Monday to Friday, 8am to 5pm.</p>
                  <a href="tel:08006774264">0800 NRS HCMG</a>
                </div>

                <div className="contact-card">
                  <div className="card-icon">♧</div>
                  <h3>Visit in person</h3>
                  <p>People Services, NRS Corporate Headquarters.</p>
                  <a href="#">Revenue House, Abuja</a>
                </div>

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
                <tbody>
                  <tr>
                    <td><strong>Tier 1</strong> Transactional</td>
                    <td>Routine requests such as letters, records updates and policy queries.</td>
                    <td>
                      Acknowledged within 1 working day.<br />
                        Resolved within 3 working days.
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Tier 2</strong> Advisory</td>
                    <td>Case managed matters such as grievance intake and benefits queries.</td>
                    <td>Resolved within 10 working days, unless escalated.</td>
                  </tr>
                  <tr>
                    <td><strong>Tier 3</strong> Strategic</td>
                    <td>Complex or senior matters needing specialist HR input.</td>
                    <td>Managed individually with agreed timelines.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="escalation-box">
              <h3>Escalation</h3>
              <p>
                If your request is not resolved within the service standard above,
                ask for it to be escalated to the Director, Workforce Management
                through the People Service Portal.
              </p>
            </div>

            <div className="faq-banner">

              <div className="faq-icon">
                FAQ
              </div>

              <div className="faq-content">
                <h3>Looking for a quick answer?</h3>
                <p>
                  The FAQs and Knowledge Base cover the questions we are asked most across HR.
                </p>
              </div>

              <a href="#" className="faq-button">
                Browse the FAQs
              </a>

            </div>

          </div>

        </section>
      </>

    );
  }

}
