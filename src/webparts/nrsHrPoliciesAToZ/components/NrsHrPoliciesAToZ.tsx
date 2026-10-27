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

        <div className="page-container">

          <div className="breadcrumb">
            <a href="#">Home</a>
            <span>/</span>
            <span>HR Policies A to Z</span>
          </div>

          <header className="page-header">
            <h1>HR Policies A to Z</h1>

            <p>
              Every NRS HR policy in alphabetical order. Filter by HR domain,
              search the list, or select a policy to open its page.
            </p>

            <div className="red-line"></div>
          </header>

          <div className="policy-card">

            <div className="toolbar">

              <div className="filter-section">
                <span className="filter-icon">&#9776;</span>

                <select id="domainFilter">
                  <option value="all">All HR domains</option>
                  <option value="Talent Acquisition">
                    Talent Acquisition
                  </option>
                  <option value="Hire & Onboarding">
                    Hire &amp; Onboarding
                  </option>
                  <option value="HR Operations">
                    HR Operations
                  </option>
                  <option value="Employee Data Management">
                    Employee Data Management
                  </option>
                  <option value="Oraganisation Design">
                    Organisation Design
                  </option>
                  <option value="Performance & Development">
                    Performance &amp; Development
                  </option>
                  <option value="Compensation & Benefits">
                    Compensation &amp; Benefits
                  </option>
                  <option value="Attendance & Absence Management">
                    Attendance &amp; Absence Management
                  </option>
                  <option value="Job Change">
                    Job Change
                  </option>
                  <option value="Staff Union & Conduct">
                    Staff Union &amp; Conduct
                  </option>
                  <option value="Diversity, Equity & Inclusion">
                    Diversity, Equity &amp; Inclusion
                  </option>
                  <option value="Exit & Separation">
                    Exit &amp; Separation
                  </option>
                </select>
              </div>

              <div className="search-box">
                <span className="search-icon">&#9906;</span>
                <input
                  type="text"
                  id="searchInput"
                  placeholder="Search this list"
                />
              </div>

            </div>

            <div className="table-wrapper">

              <table className="policy-table">

                <thead>
                  <tr>
                    <th className="policy-column">
                      Policy
                      <span className="sort-icon">&#9650;</span>
                    </th>
                    <th>HR domain</th>
                    <th>Type</th>
                  </tr>
                </thead>

                <tbody id="policyTableBody">

                  <tr className="alphabet-row" data-letter="A">
                    <td colSpan={3}>
                      <button className="toggle-btn" aria-expanded="true">
                        <span className="arrow">&#9662;</span>
                        A
                      </button>
                    </td>
                  </tr>

                  <tr className="policy-row" data-letter="A"
                    data-domain="Performance & Development">
                    <td>
                      <a href="#">Academy Governance (NRS Academy)</a>
                    </td>
                    <td>Performance &amp; Development</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="policy-row" data-letter="A"
                    data-domain="Attendance & Absence Management">
                    <td><a href="#">Adoption Leave</a></td>
                    <td>Attendance &amp; Absence Management</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="policy-row" data-letter="A"
                    data-domain="Talent Acquisition">
                    <td><a href="#">Advertising &amp; Sourcing</a></td>
                    <td>Talent Acquisition</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="policy-row" data-letter="A"
                    data-domain="Performance & Development">
                    <td><a href="#">Annual Learning Plan Governance</a></td>
                    <td>Performance &amp; Development</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="policy-row" data-letter="A"
                    data-domain="Attendance & Absence Management">
                    <td><a href="#" className="highlight-link">Annual Leave</a></td>
                    <td>Attendance &amp; Absence Management</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="policy-row" data-letter="A"
                    data-domain="Staff Union & Conduct">
                    <td><a href="#">Anti Bribery &amp; Corruption</a></td>
                    <td>Staff Union &amp; Conduct</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="policy-row" data-letter="A"
                    data-domain="Staff Union & Conduct">
                    <td><a href="#">Anti-Bullying &amp; Harassment</a></td>
                    <td>Staff Union &amp; Conduct</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="policy-row" data-letter="A"
                    data-domain="Talent Acquisition">
                    <td><a href="#">Assessment &amp; Interviewing</a></td>
                    <td>Talent Acquisition</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="policy-row" data-letter="A"
                    data-domain="Staff Union & Conduct">
                    <td><a href="#">Attendance &amp; Punctuality</a></td>
                    <td>Staff Union &amp; Conduct</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="alphabet-row" data-letter="B">
                    <td colSpan={3}>
                      <button className="toggle-btn" aria-expanded="false">
                        <span className="arrow">&#9656;</span>
                        B
                      </button>
                    </td>
                  </tr>

                  <tr className="policy-row" data-letter="B"
                    data-domain="Compensation & Benefits">
                    <td><a href="#">Benefits &amp; Allowances</a></td>
                    <td>Compensation &amp; Benefits</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="alphabet-row" data-letter="C">
                    <td colSpan={3}>
                      <button className="toggle-btn" aria-expanded="false">
                        <span className="arrow">&#9656;</span>
                        C
                      </button>
                    </td>
                  </tr>

                  <tr className="policy-row" data-letter="C"
                    data-domain="Job Change">
                    <td><a href="#">Career Path Policy</a></td>
                    <td>Job Change</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="policy-row" data-letter="C"
                    data-domain="Job Change">
                    <td><a href="#">Career Progression Policy</a></td>
                    <td>Job Change</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="policy-row" data-letter="C"
                    data-domain="Attendance & Absence Management">
                    <td><a href="#">Casual Leave</a></td>
                    <td>Attendance &amp; Absence Management</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="policy-row" data-letter="C"
                    data-domain="Performance & Development">
                    <td>
                      <a href="#">Coaching, Mentoring &amp; Leadership Development</a>
                    </td>
                    <td>Performance &amp; Development</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="policy-row" data-letter="C"
                    data-domain="Staff Union & Conduct">
                    <td><a href="#">Code of Conduct &amp; Ethics</a></td>
                    <td>Staff Union &amp; Conduct</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="policy-row" data-letter="C"
                    data-domain="Attendance & Absence Management">
                    <td><a href="#">Compassionate/Bereavement Leave</a></td>
                    <td>Attendance &amp; Absence Management</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="policy-row" data-letter="C"
                    data-domain="Compensation & Benefits">
                    <td><a href="#">Compensation Philosophy &amp; Structure</a></td>
                    <td>Compensation &amp; Benefits</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="policy-row" data-letter="C"
                    data-domain="Staff Union & Conduct">
                    <td><a href="#">Compliance Monitoring &amp; Policy Assurance</a></td>
                    <td>Staff Union &amp; Conduct</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="policy-row" data-letter="C"
                    data-domain="Employee Data Management">
                    <td><a href="#">Confidentiality &amp; Secrecy Obligations</a></td>
                    <td>Employee Data Management</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="policy-row" data-letter="C"
                    data-domain="Staff Union & Conduct">
                    <td><a href="#">Conflict of Interest</a></td>
                    <td>Staff Union &amp; Conduct</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="policy-row" data-letter="C"
                    data-domain="HR Operations">
                    <td><a href="#">Contingent Labour (Contractors/ Agency)</a></td>
                    <td>HR Operations</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="alphabet-row" data-letter="D">
                    <td colSpan={3}>
                      <button className="toggle-btn" aria-expanded="false">
                        <span className="arrow">&#9656;</span>
                        D
                      </button>
                    </td>
                  </tr>

                  <tr className="policy-row" data-letter="D"
                    data-domain="Compensation & Benefits">
                    <td><a href="#">Death-In-Service Support</a></td>
                    <td>Compensation &amp; Benefits</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="policy-row" data-letter="D"
                    data-domain="Staff Union & Conduct">
                    <td><a href="#">Declarations of Interest (Annual/Role-based)</a></td>
                    <td>Staff Union &amp; Conduct</td>
                    <td>Policy</td>
                  </tr>

                  <tr className="policy-row" data-letter="D"
                    data-domain="HR Operations">
                    <td><a href="#">Delegation of Authority for HR Decisions</a></td>
                    <td>HR Operations</td>
                    <td>Policy</td>
                  </tr>

                </tbody>
              </table>

              <div id="noResults" className="no-results" hidden>
                No matching policies found.
              </div>

            </div>
          </div>

        </div>

        <div className="hr-container">

          <p className="info-text">
            This behaves like a SharePoint list view, with the list search box and
            column filtering. In the live site each policy name links to its own page.
            In this prototype the built policies open, for example Performance
            Appraisal and Disciplinary.
          </p>

          <div className="cards-container">

            <a href="#" className="hr-card">

              <div className="icon-box">
               
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9"></circle>
                  <path d="M9.8 9a2.3 2.3 0 1 1 3.8 1.7c-1.1.9-1.6 1.2-1.6 2.8"></path>
                  <circle cx="12" cy="16.8" r="0.5"
                    fill="#e60000" stroke="none"></circle>
                </svg>
              </div>

              <div className="card-content">
                <h3 className="card-title">FAQs and Knowledge Base</h3>

                <p className="card-description">
                  Quick answers for this area of HR.
                </p>

                <span className="card-link">
                  Go to FAQs
                  <span className="arrow">&#9656;</span>
                </span>
              </div>

            </a>

            <a href="#" className="hr-card">

              <div className="icon-box">
              
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 4.5h14v12H9l-4 3v-15z"></path>
                  <path d="M9 9h6"></path>
                  <path d="M9 12h4"></path>
                </svg>
              </div>

              <div className="card-content">
                <h3 className="card-title">Ask HR</h3>

                <p className="card-description">
                  Raise a query through the People Service Portal.
                </p>

                <span className="card-link">
                  Ask HR
                  <span className="arrow">&#9656;</span>
                </span>
              </div>

            </a>

          </div>

        </div>

      </>

    );
  }
}
