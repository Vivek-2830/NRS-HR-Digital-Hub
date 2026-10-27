import * as React from 'react';
import styles from './NrsHrPoliciesAToZ.module.scss';
import { INrsHrPoliciesAToZProps } from './INrsHrPoliciesAToZProps';
import { escape } from '@microsoft/sp-lodash-subset';

require('../assets/style.css');

export default class NrsHrPoliciesAToZ extends React.Component<INrsHrPoliciesAToZProps, {}> {
  public render(): React.ReactElement<INrsHrPoliciesAToZProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <>
        <div style={{ position: 'relative' }}>

          <section className="nrsHrPoliciesAToZ">

            <div className="nrsHomePage">

              <div className="hr-red-shapes"></div>

              <div className="hr-hero-copy">

                <h1 className="hr-title">
                  HR Policies and Procedures
                </h1>

              </div>

              <div
                className="hr-team-photo"
                role="img"
                aria-label="Human Capital Management Group team"
              ></div>

            </div>
          </section>
        </div>

        <main>

          <div className="container">

            <div className="breadcrumb">
              Home <span>/</span> HR Policies A to Z
            </div>

            <h1 className="page-heading">
              HR Policies A to Z
            </h1>

            <p className="page-description">
              Every NRS HR policy in alphabetical order. Filter by HR domain,
              search the list, or select a policy to open its page.
            </p>

            <div className="heading-underline"></div>

            <section className="policy-panel">

              <div className="policy-controls">

                <span className="filter-icon">☷</span>

                <select className="domain-select" id="domainFilter">
                  <option value="all">All HR Domains</option>
                  <option value="HR Operations" selected>
                    HR Operations
                  </option>
                  <option value="Employee Relations">
                    Employee Relations
                  </option>
                  <option value="Recruitment">
                    Recruitment
                  </option>
                  <option value="Learning & Development">
                    Learning &amp; Development
                  </option>
                  <option value="Compensation">
                    Compensation
                  </option>
                </select>

                <div className="list-search">
                  <span>⌕</span>
                  <input
                    type="text"
                    id="policySearch"
                    placeholder="Search this list"
                  />
                </div>

              </div>

              <table className="policy-table">

                <thead>
                  <tr>
                    <th>Policy ↑</th>
                    <th>HR domain</th>
                    <th>Type</th>
                  </tr>
                </thead>

                <tbody id="policyBody">

                  <tr className="letter-row" data-letter="C">
                    <td colSpan={3}>
                      <span className="letter">›</span>C
                    </td>
                  </tr>

                  <tr className="policy-item"
                    data-domain="HR Operations"
                    data-policy="Contingent Labour Contractors Agency">
                    <td>
                      <a href="#" className="policy-link">
                        Contingent Labour (Contractors/ Agency)
                      </a>
                    </td>
                    <td>HR Operations</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="letter-row" data-letter="D">
                    <td colSpan={3}>
                      <span className="letter">›</span>D
                    </td>
                  </tr>

                  <tr className="policy-item"
                    data-domain="HR Operations"
                    data-policy="Delegation of Authority for HR Decisions">
                    <td>
                      <a href="#" className="policy-link">
                        Delegation of Authority for HR Decisions
                      </a>
                    </td>
                    <td>HR Operations</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="letter-row" data-letter="E">
                    <td colSpan={3}>
                      <span className="letter">›</span>E
                    </td>
                  </tr>

                  <tr className="policy-item"
                    data-domain="HR Operations"
                    data-policy="Employment Categories Contracts">
                    <td>
                      <a href="#" className="policy-link">
                        Employment Categories &amp; Contracts
                      </a>
                    </td>
                    <td>HR Operations</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="letter-row" data-letter="F">
                    <td colSpan={3}>
                      <span className="letter">›</span>F
                    </td>
                  </tr>

                  <tr className="policy-item"
                    data-domain="HR Operations"
                    data-policy="Flexible Working Hybrid Working">
                    <td>
                      <a href="#" className="policy-link">
                        Flexible Working / Hybrid Working
                      </a>
                    </td>
                    <td>HR Operations</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="letter-row" data-letter="H">
                    <td colSpan={3}>
                      <span className="letter">›</span>H
                    </td>
                  </tr>

                  <tr className="policy-item"
                    data-domain="HR Operations"
                    data-policy="HR Case Management Escalations">
                    <td>
                      <a href="#" className="policy-link">
                        HR Case Management &amp; Escalations
                      </a>
                    </td>
                    <td>HR Operations</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="policy-item"
                    data-domain="HR Operations"
                    data-policy="HR Policy Governance Approval">
                    <td>
                      <a href="#" className="policy-link">
                        HR Policy Governance &amp; Approval
                      </a>
                    </td>
                    <td>HR Operations</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="policy-item"
                    data-domain="HR Operations"
                    data-policy="HR Policy Management Document Control">
                    <td>
                      <a href="#" className="policy-link">
                        HR Policy Management &amp; Document Control
                      </a>
                    </td>
                    <td>HR Operations</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="policy-item"
                    data-domain="HR Operations"
                    data-policy="HR Service Delivery Model Service Catalogue">
                    <td>
                      <a href="#" className="policy-link">
                        HR Service Delivery Model &amp; HR Service Catalogue
                      </a>
                    </td>
                    <td>HR Operations</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="letter-row" data-letter="O">
                    <td colSpan={3}>
                      <span className="letter">›</span>O
                    </td>
                  </tr>

                  <tr className="policy-item"
                    data-domain="HR Operations"
                    data-policy="Overtime Shift Work">
                    <td>
                      <a href="#" className="policy-link">
                        Overtime &amp; Shift Work
                      </a>
                    </td>
                    <td>HR Operations</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="letter-row" data-letter="R">
                    <td colSpan={3}>
                      <span className="letter">›</span>R
                    </td>
                  </tr>

                  <tr className="policy-item"
                    data-domain="HR Operations"
                    data-policy="Relocation Mobility">
                    <td>
                      <a href="#" className="policy-link">
                        Relocation &amp; Mobility
                      </a>
                    </td>
                    <td>HR Operations</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="policy-item"
                    data-domain="HR Operations"
                    data-policy="Remote Working Contractual Homeworking">
                    <td>
                      <a href="#" className="policy-link">
                        Remote Working (Contractual Homeworking)
                      </a>
                    </td>
                    <td>HR Operations</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="letter-row" data-letter="S">
                    <td colSpan={3}>
                      <span className="letter">›</span>S
                    </td>
                  </tr>

                  <tr className="policy-item"
                    data-domain="HR Operations"
                    data-policy="Secondment">
                    <td>
                      <a href="#" className="policy-link">
                        Secondment
                      </a>
                    </td>
                    <td>HR Operations</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="letter-row" data-letter="W">
                    <td colSpan={3}>
                      <span className="letter">›</span>W
                    </td>
                  </tr>

                  <tr className="policy-item"
                    data-domain="HR Operations"
                    data-policy="Working Hours Time Recording Policy">
                    <td>
                      <a href="#" className="policy-link">
                        Working Hours &amp; Time Recording Policy
                      </a>
                    </td>
                    <td>HR Operations</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="empty-row" id="emptyMessage" style={{ display: 'none' }}>
                    <td colSpan={3}>
                      No matching policies found.
                    </td>
                  </tr>

                </tbody>

              </table>

            </section>

            <p className="page-note">
              This behaves like a SharePoint list view, with the list search
              box and column filtering. In the live site each policy name
              links to its own page. In this prototype the built policies
              open, for example Performance Appraisal and Disciplinary.
            </p>

            <section className="info-cards">

              <a href="#" className="info-card">

                <div className="card-icon">ⓘ</div>

                <div className="card-content">

                  <h3>FAQs and Knowledge Base</h3>

                  <p>
                    Quick answers for this area of HR.
                  </p>

                  <span className="card-link">
                    Go to FAQs ›
                  </span>

                </div>

              </a>


              <a href="#" className="info-card">

                <div className="card-icon">▤</div>

                <div className="card-content">

                  <h3>Ask HR</h3>

                  <p>
                    Raise a query through the People Service Portal.
                  </p>

                  <span className="card-link">
                    Ask HR ›
                  </span>

                </div>

              </a>

            </section>

          </div>

        </main>
        
      </>

    );
  }
}
