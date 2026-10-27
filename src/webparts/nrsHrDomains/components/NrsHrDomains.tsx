import * as React from 'react';
import styles from './NrsHrDomains.module.scss';
import { INrsHrDomainsProps } from './INrsHrDomainsProps';
import { escape } from '@microsoft/sp-lodash-subset';

require('../assets/style.css');

export default class NrsHrDomains extends React.Component<INrsHrDomainsProps, {}> {
  public render(): React.ReactElement<INrsHrDomainsProps> {
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

          <section className="nrsHrDomains">

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

        {/* ------------------------------------------------------ */}

        <main className="container">

          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="#">Home</a>
            <span className="separator">/</span>
            <a href="#">HR Domains</a>
            <span className="separator">/</span>
            <a href="#">Talent Acquisition</a>
          </nav>

          <header>
            <h1 className="page-title">Talent Acquisition</h1>
            <div className="title-underline"></div>
          </header>

          <section className="overview-section">

            <h2 className="section-heading">

              <svg className="section-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8">
                <circle cx="12" cy="12" r="9"></circle>
                <path d="M9.6 9a2.5 2.5 0 0 1 4.8 1
                             c0 1.7-2.4 2-2.4 3.5"></path>
                <circle cx="12" cy="17" r=".6" fill="currentColor"></circle>
              </svg>

              <span>Overview</span>
            </h2>

            <div className="overview-box">
              <p>
                Covers the recruitment and selection processes used to
                attract and hire new employees.
              </p>

              <p>
                This domain holds 4 policies. Use the sections below to
                reach the policies, procedures, forms and guidance for
                Talent Acquisition.
              </p>
            </div>

          </section>

          <section className="policies-section">

            <h2 className="section-heading">

              <svg className="section-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8">
                <path d="M6 3h8l4 4v14H6z"></path>
                <path d="M14 3v5h4"></path>
                <path d="M9 12h6"></path>
                <path d="M9 16h6"></path>
              </svg>

              <span>Policies</span>
            </h2>

            <div className="policies-grid">

              <a href="#" className="policy-card">

                <div className="document-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M6 3h8l4 4v14H6z"></path>
                    <path d="M14 3v5h4"></path>
                    <path d="M9 12h6"></path>
                    <path d="M9 16h6"></path>
                  </svg>
                </div>

                <div className="policy-content">
                  <h3 className="policy-title">
                    Advertising &amp; Sourcing
                  </h3>

                  <p className="policy-description">
                    Policy page (built in the live site)
                  </p>
                </div>

              </a>

              <a href="#" className="policy-card">

                <div className="document-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M6 3h8l4 4v14H6z"></path>
                    <path d="M14 3v5h4"></path>
                    <path d="M9 12h6"></path>
                    <path d="M9 16h6"></path>
                  </svg>
                </div>

                <div className="policy-content">
                  <h3 className="policy-title">
                    Assessment &amp; Interviewing
                  </h3>

                  <p className="policy-description">
                    Policy page (built in the live site)
                  </p>
                </div>

              </a>

              <a href="#" className="policy-card">

                <div className="document-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M6 3h8l4 4v14H6z"></path>
                    <path d="M14 3v5h4"></path>
                    <path d="M9 12h6"></path>
                    <path d="M9 16h6"></path>
                  </svg>
                </div>

                <div className="policy-content">
                  <h3 className="policy-title">
                    Interview Panel Conduct &amp; Bias Mitigation
                  </h3>

                  <p className="policy-description">
                    Policy page (built in the live site)
                  </p>
                </div>

              </a>

              <a href="#" className="policy-card">

                <div className="document-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M6 3h8l4 4v14H6z"></path>
                    <path d="M14 3v5h4"></path>
                    <path d="M9 12h6"></path>
                    <path d="M9 16h6"></path>
                  </svg>
                </div>

                <div className="policy-content">
                  <h3 className="policy-title">
                    Recruitment &amp; Selection
                  </h3>

                  <span className="open-policy">
                    Open policy

                    <svg viewBox="0 0 10 10">
                      <path d="M3 1L8 5L3 9Z"></path>
                    </svg>
                  </span>
                </div>

              </a>

            </div>

          </section>

        </main>

        {/* ---------------------------------------- */}

        <div className="resources-container">

          <section className="resource-section">
            <h2 className="section-title">
              <svg className="heading-icon" viewBox="0 0 24 24" fill="none">
                <path d="M6 2.5H14L18 6.5V21.5H6V2.5Z"
                  stroke="currentColor" stroke-width="1.7" />
                <path d="M14 2.5V6.5H18"
                  stroke="currentColor" stroke-width="1.7" />
                <path d="M9 11H15M9 14.5H15M9 18H13"
                  stroke="currentColor" stroke-width="1.5" />
              </svg>
              Procedures
            </h2>

            <div className="resource-list">

              <div className="resource-item">
                <a href="#" className="resource-name">
                  <svg className="file-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M6 2.5H14L18 6.5V21.5H6V2.5Z"
                      stroke="currentColor" stroke-width="1.7" />
                    <path d="M14 2.5V6.5H18"
                      stroke="currentColor" stroke-width="1.7" />
                    <path d="M9 11H15M9 14.5H15M9 18H13"
                      stroke="currentColor" stroke-width="1.5" />
                  </svg>
                  Advertising &amp; Sourcing Procedure
                </a>
                <div className="resource-actions">
                  <span className="badge">Procedure</span>
                  <a href="#" className="download-btn" aria-label="Download Advertising and Sourcing Procedure">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 3V15M7 10L12 15L17 10"
                        stroke="currentColor" stroke-width="1.8"
                        stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M5 19H19"
                        stroke="currentColor" stroke-width="1.8"
                        stroke-linecap="round" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="resource-item">
                <a href="#" className="resource-name">
                  <svg className="file-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M6 2.5H14L18 6.5V21.5H6V2.5Z"
                      stroke="currentColor" stroke-width="1.7" />
                    <path d="M14 2.5V6.5H18"
                      stroke="currentColor" stroke-width="1.7" />
                    <path d="M9 11H15M9 14.5H15M9 18H13"
                      stroke="currentColor" stroke-width="1.5" />
                  </svg>
                  Assessment &amp; Interviewing Procedure
                </a>
                <div className="resource-actions">
                  <span className="badge">Procedure</span>
                  <a href="#" className="download-btn" aria-label="Download Assessment and Interviewing Procedure">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 3V15M7 10L12 15L17 10"
                        stroke="currentColor" stroke-width="1.8"
                        stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M5 19H19"
                        stroke="currentColor" stroke-width="1.8"
                        stroke-linecap="round" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="resource-item">
                <a href="#" className="resource-name">
                  <svg className="file-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M6 2.5H14L18 6.5V21.5H6V2.5Z"
                      stroke="currentColor" stroke-width="1.7" />
                    <path d="M14 2.5V6.5H18"
                      stroke="currentColor" stroke-width="1.7" />
                    <path d="M9 11H15M9 14.5H15M9 18H13"
                      stroke="currentColor" stroke-width="1.5" />
                  </svg>
                  Interview Panel Conduct &amp; Bias Mitigation Procedure
                </a>
                <div className="resource-actions">
                  <span className="badge">Procedure</span>
                  <a href="#" className="download-btn" aria-label="Download Interview Panel Procedure">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 3V15M7 10L12 15L17 10"
                        stroke="currentColor" stroke-width="1.8"
                        stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M5 19H19"
                        stroke="currentColor" stroke-width="1.8"
                        stroke-linecap="round" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="resource-item">
                <a href="#" className="resource-name">
                  <svg className="file-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M6 2.5H14L18 6.5V21.5H6V2.5Z"
                      stroke="currentColor" stroke-width="1.7" />
                    <path d="M14 2.5V6.5H18"
                      stroke="currentColor" stroke-width="1.7" />
                    <path d="M9 11H15M9 14.5H15M9 18H13"
                      stroke="currentColor" stroke-width="1.5" />
                  </svg>
                  Recruitment &amp; Selection Procedure
                </a>
                <div className="resource-actions">
                  <span className="badge">Procedure</span>
                  <a href="#" className="download-btn" aria-label="Download Recruitment and Selection Procedure">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 3V15M7 10L12 15L17 10"
                        stroke="currentColor" stroke-width="1.8"
                        stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M5 19H19"
                        stroke="currentColor" stroke-width="1.8"
                        stroke-linecap="round" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </section>

          <section className="resource-section">
            <h2 className="section-title">
              <svg className="heading-icon" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="2.5" width="14" height="19" rx="1"
                  stroke="currentColor" stroke-width="1.7" />
                <path d="M9 8H15M9 12H15M9 16H13"
                  stroke="currentColor" stroke-width="1.5" />
              </svg>
              Forms
            </h2>

            <div className="resource-list">

              <div className="resource-item">
                <a href="#" className="resource-name">
                  <svg className="file-icon" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="2.5" width="14" height="19" rx="1"
                      stroke="currentColor" stroke-width="1.7" />
                    <path d="M9 8H15M9 12H15M9 16H13"
                      stroke="currentColor" stroke-width="1.5" />
                  </svg>
                  Manpower Requisition Form
                </a>
                <div className="resource-actions">
                  <span className="badge">Form</span>
                  <a href="#" className="download-btn" aria-label="Download Manpower Requisition Form">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 3V15M7 10L12 15L17 10"
                        stroke="currentColor" stroke-width="1.8"
                        stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M5 19H19"
                        stroke="currentColor" stroke-width="1.8"
                        stroke-linecap="round" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="resource-item">
                <a href="#" className="resource-name">
                  <svg className="file-icon" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="2.5" width="14" height="19" rx="1"
                      stroke="currentColor" stroke-width="1.7" />
                    <path d="M9 8H15M9 12H15M9 16H13"
                      stroke="currentColor" stroke-width="1.5" />
                  </svg>
                  Interview Assessment Scoresheet
                </a>
                <div className="resource-actions">
                  <span className="badge">Template</span>
                  <a href="#" className="download-btn" aria-label="Download Interview Assessment Scoresheet">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 3V15M7 10L12 15L17 10"
                        stroke="currentColor" stroke-width="1.8"
                        stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M5 19H19"
                        stroke="currentColor" stroke-width="1.8"
                        stroke-linecap="round" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="resource-item">
                <a href="#" className="resource-name">
                  <svg className="file-icon" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="2.5" width="14" height="19" rx="1"
                      stroke="currentColor" stroke-width="1.7" />
                    <path d="M9 8H15M9 12H15M9 16H13"
                      stroke="currentColor" stroke-width="1.5" />
                  </svg>
                  Talent Acquisition Checklist
                </a>
                <div className="resource-actions">
                  <span className="badge">Checklist</span>
                  <a href="#" className="download-btn" aria-label="Download Talent Acquisition Checklist">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 3V15M7 10L12 15L17 10"
                        stroke="currentColor" stroke-width="1.8"
                        stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M5 19H19"
                        stroke="currentColor" stroke-width="1.8"
                        stroke-linecap="round" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </section>

          <section className="resource-section">
            <h2 className="section-title">
              <svg className="heading-icon" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="2.5" width="14" height="19" rx="1"
                  stroke="currentColor" stroke-width="1.7" />
                <path d="M9 7H15M9 10.5H15M9 14H15M9 17.5H13"
                  stroke="currentColor" stroke-width="1.5" />
              </svg>
              Guides and checklists
            </h2>

            <div className="resource-list">

              <div className="resource-item">
                <a href="#" className="resource-name">
                  <svg className="file-icon" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="2.5" width="14" height="19" rx="1"
                      stroke="currentColor" stroke-width="1.7" />
                    <path d="M9 8H15M9 12H15M9 16H13"
                      stroke="currentColor" stroke-width="1.5" />
                  </svg>
                  Talent Acquisition Quick Reference Guide
                </a>
                <div className="resource-actions">
                  <span className="badge">Guide</span>
                  <a href="#" className="download-btn" aria-label="Download Talent Acquisition Quick Reference Guide">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 3V15M7 10L12 15L17 10"
                        stroke="currentColor" stroke-width="1.8"
                        stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M5 19H19"
                        stroke="currentColor" stroke-width="1.8"
                        stroke-linecap="round" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </section>

        </div>

        {/* ---------------------------------------- */}

        <main className="Faqcontainer">

          <section className="faq-section">

            <h2 className="section-title">
              <i className="fa-regular fa-circle-question red-icon"></i>
              FAQs
            </h2>

            <div className="faq-box">

              <div className="faq-item">
                <h3>Where do I find the Talent Acquisition policies?</h3>
                <p>
                  They are listed in the Policies section above, and in the HR Policies A to Z.
                </p>
              </div>

              <div className="faq-item">
                <h3>Who do I contact about Talent Acquisition?</h3>
                <p>
                  Use Ask HR at the foot of this page to reach the People Service Portal.
                </p>
              </div>

              <a href="#" className="red-link">
                See all FAQs and the knowledge base
                <i className="fa-solid fa-caret-right"></i>
              </a>

            </div>
          </section>

          <section className="related-section">

            <h2 className="section-title">
              <i className="fa-solid fa-arrow-right-arrow-left red-icon"></i>
              Related HR processes
            </h2>

            <div className="process-grid">

              <div className="process-card">
                <div className="icon-box">
                  <i className="fa-solid fa-user-plus"></i>
                </div>

                <div className="card-content">
                  <h3>Hire &amp; Onboarding</h3>
                  <a href="#" className="red-link">
                    Open domain
                    <i className="fa-solid fa-caret-right"></i>
                  </a>
                </div>
              </div>


              <div className="process-card">
                <div className="icon-box">
                  <i className="fa-regular fa-file-lines"></i>
                </div>

                <div className="card-content">
                  <h3>HR Operations</h3>
                  <a href="#" className="red-link">
                    Open domain
                    <i className="fa-solid fa-caret-right"></i>
                  </a>
                </div>
              </div>


              <div className="process-card">
                <div className="icon-box">
                  <i className="fa-solid fa-database"></i>
                </div>

                <div className="card-content">
                  <h3>Employee Data Management</h3>
                  <a href="#" className="red-link">
                    Open domain
                    <i className="fa-solid fa-caret-right"></i>
                  </a>
                </div>
              </div>

            </div>
          </section>

          <section className="ask-hr-banner">

            <div className="banner-left">

              <div className="banner-icon">
                <i className="fa-regular fa-message"></i>
              </div>

              <div className="banner-content">
                <h2>Ask HR about Talent Acquisition</h2>
                <p>
                  Have a question this domain does not answer?
                  Raise it through the People Service Portal.
                </p>
              </div>

            </div>

            <a href="#" className="portal-button">
              Open the People Service Portal
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>

          </section>

          <section className="bottom-grid">

            <div className="bottom-card">

              <div className="icon-box">
                <i className="fa-regular fa-circle-question"></i>
              </div>

              <div className="bottom-content">
                <h3>FAQs and Knowledge Base</h3>
                <p>Quick answers for this area of HR.</p>

                <a href="#" className="bottom-link">
                  Go to FAQs
                  <i className="fa-solid fa-caret-right"></i>
                </a>
              </div>

            </div>


            <div className="bottom-card">

              <div className="icon-box">
                <i className="fa-regular fa-message"></i>
              </div>

              <div className="bottom-content">
                <h3>Ask HR</h3>
                <p>Raise a query through the People Service Portal.</p>

                <a href="#" className="bottom-link">
                  Ask HR
                  <i className="fa-solid fa-caret-right"></i>
                </a>
              </div>

            </div>

          </section>

        </main>

      </>
    );
  }
}
