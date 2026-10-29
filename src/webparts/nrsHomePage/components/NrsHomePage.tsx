import * as React from 'react';
import styles from './NrsHomePage.module.scss';
import { INrsHomePageProps } from './INrsHomePageProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from '@pnp/sp/presets/all';
import * as moment from 'moment';

export interface INrsHomePageState {
  ExploreQuickLinks: any;
  PolicyPortalFeautures: any;
  PolicyStageInfo: any;
  HRDomainHub: any;
  NewsAnnouncementsData: any;
  HRPolicieDoc: any;
}

require('../assets/style.css');

export default class NrsHomePage extends React.Component<INrsHomePageProps, INrsHomePageState> {

  constructor(props: INrsHomePageProps, state: INrsHomePageState) {

    super(props);

    this.state = {
      ExploreQuickLinks: "",
      PolicyPortalFeautures : "",
      PolicyStageInfo : "",
      HRDomainHub : "",
      NewsAnnouncementsData : "",
      HRPolicieDoc : ""
    };
  }

  public render(): React.ReactElement<INrsHomePageProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <div style={{ backgroundColor:'#faf9f8' }}>

        <div style={{ position: 'relative' }}>
  
          <div className="nrsHomePage">

            <div className="hr-red-shapes"></div>

            <div className="hr-hero-copy">
              <p className="hr-eyebrow">
                HUMAN CAPITAL MANAGEMENT GROUP
              </p>

              <h1 className="hr-title">
                Your home for every
                <br />
                HR policy, procedure
                <br />
                and form
              </h1>

              <p className="hr-description">
                Find what you need quickly. Search the Hub,
                <br />
                browse by HR domain, or open the full
                <br />
                A to Z of policies.
              </p>
            </div>

            <div className="hr-team-photo" role="img" aria-label="Human Capital Management Group team"></div>

          </div>

        </div>

        <div className="hr-hub-container">

          {/* ------------ Welcom Section ---------------- */}
          <section className="hr-hero-label">

            <div className="hr-welcome-label">
              WELCOME TO THE HR POLICY AND PROCEDURE DIGITAL HUB
            </div>

            <h1>
              Everything you need to know about working at the Service, in
              one place.
            </h1>

            <p className="hr-desc">
              From your first day to your next promotion, the Service has a clear
              policy for every stage of your career. The Hub brings all of it
              together, written in plain language and kept up to date. Take a few
              minutes to explore the policies that shape your working life, so
              you always know your rights, your responsibilities, and where to turn.
            </p>


            <div className="hr-button-group">

              <a href="#" className="hr-btn hr-btn-primary">
                Browse the HR domains
                <span className="hr-arrow">&#8250;</span>
              </a>

              <a href="#" className="hr-btn hr-btn-outline">
                Open the A to Z
              </a>

            </div>

          </section>

          {/* ------ Explore The Hub Link Section --------------- */}
          <section className="hr-explore-section">

            <h2>Explore the Hub</h2>

            <p className="hr-explore-description">Seven ways into the Hub, whatever you came to do.</p>

            <div className="hr-card-grid">

              {
                this.state.ExploreQuickLinks.length > 0 &&
                this.state.ExploreQuickLinks.map((item) => {
                  return (
                    <a href={item.Link.Url} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                      <div className="hr-card">

                        <div className="hr-card-icon">
                          <img src={item.Icon} />
                        </div>

                        <div className="hr-card-content">
                          <h3>{item.Title}</h3>
                          <p>{item.Description}</p>
                        </div>
                      </div>
                    </a>
                  );
                })
              }

              {/* <div className="hr-card">

                <div className="hr-card-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3v5"></path>
                    <path d="M6 8h12"></path>
                    <path d="M6 8v5"></path>
                    <path d="M18 8v5"></path>
                    <rect x="3" y="13" width="6" height="5" rx="1"></rect>
                    <rect x="9" y="3" width="6" height="5" rx="1"></rect>
                    <rect x="15" y="13" width="6" height="5" rx="1"></rect>
                  </svg>
                </div>

                <div className="hr-card-content">
                  <h3>HR Domains</h3>
                  <p>Browse policies by the twelve HR domains.</p>
                </div>

              </div>

              <div className="hr-card">

                <div className="hr-card-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M7 3h7l4 4v14H7z"></path>
                    <path d="M14 3v5h4"></path>
                    <path d="M10 12h5"></path>
                    <path d="M10 16h5"></path>
                  </svg>
                </div>

                <div className="hr-card-content">
                  <h3>HR Policies A to Z</h3>
                  <p>Every policy in one alphabetical list.</p>
                </div>

              </div>

              <div className="hr-card">

                <div className="hr-card-icon">
                  <svg viewBox="0 0 24 24">
                    <rect x="6" y="3" width="12" height="18" rx="1"></rect>
                    <path d="M9 8h6"></path>
                    <path d="M9 12h6"></path>
                    <path d="M9 16h4"></path>
                  </svg>
                </div>

                <div className="hr-card-content">
                  <h3>Forms and Resources</h3>
                  <p>Download HR forms, templates and checklists.</p>
                </div>

              </div>

              <div className="hr-card">

                <div className="hr-card-icon hr-question-icon">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M9.5 9a2.6 2.6 0 1 1 4.3 2c-1.2 1-1.8 1.4-1.8 3"></path>
                    <path d="M12 17.5h.01"></path>
                  </svg>
                </div>

                <div className="hr-card-content">
                  <h3>FAQs and Knowledge Base</h3>
                  <p>Quick answers, definitions and guidance.</p>
                </div>

              </div>

              <div className="hr-card">

                <div className="hr-card-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 4h14v12H10l-5 4z"></path>
                    <path d="M9 9h6"></path>
                    <path d="M9 12h4"></path>
                  </svg>
                </div>

                <div className="hr-card-content">
                  <h3>Ask HR</h3>
                  <p>Raise a query through the People Service Portal.</p>
                </div>

              </div>

              <div className="hr-card">

                <div className="hr-card-icon">
                  <svg viewBox="0 0 24 24">
                    <rect x="4" y="5" width="16" height="16" rx="1"></rect>
                    <path d="M8 3v4"></path>
                    <path d="M16 3v4"></path>
                    <path d="M4 10h16"></path>
                  </svg>
                </div>

                <div className="hr-card-content">
                  <h3>News and Announcements</h3>
                  <p>The latest HR updates and notices.</p>
                </div>

              </div>

              <div className="hr-card">

                <div className="hr-card-icon">
                  <svg viewBox="0 0 24 24">
                    <circle cx="10.5" cy="10.5" r="6.5"></circle>
                    <path d="m16 16 5 5"></path>
                  </svg>
                </div>

                <div className="hr-card-content">
                  <h3>Search</h3>
                  <p>Search across every policy, procedure and form.</p>
                </div>

              </div> */}

            </div>

          </section>

        </div>

        <div className="policy-container">

          {/* ----------- Feature Grid ----------- */}
          <div className="feature-grid">

            {
              this.state.PolicyPortalFeautures.length > 0 &&
                this.state.PolicyPortalFeautures.map((item) => {
                  return (
                    <div className="feature-card">
                      <div className="feature-icon">
                        <img src={item.Icon}/>
                      </div>
                      <h3>{item.Title}</h3>
                      <p>{item.Description}</p>
                    </div>
                  );
                })
            }

            {/* <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M12 3L5 6V11C5 16 8 19 12 21C16 19 19 16 19 11V6L12 3Z"></path>
                  <path d="M9 12L11 14L15 10"></path>
                </svg>
              </div>
              <h3>One trusted source</h3>
              <p>Every HR policy and procedure in one place, so you never have to guess which version is current.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24">
                  <rect x="4" y="6" width="16" height="15" rx="1"></rect>
                  <path d="M8 3V8M16 3V8M4 11H20"></path>
                </svg>
              </div>
              <h3>Always up to date</h3>
              <p>Policies are reviewed and versioned. What you read here is what applies today.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M4 19H20"></path>
                  <path d="M5 15L10 10L14 13L20 6"></path>
                  <path d="M16 6H20V10"></path>
                </svg>
              </div>
              <h3>Built around your career</h3>
              <p>Organised by the moments that matter, from joining the Service to moving on.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24">
                  <circle cx="10.5" cy="10.5" r="6.5"></circle>
                  <path d="M15.5 15.5L21 21"></path>
                </svg>
              </div>
              <h3>Found in two minutes</h3>
              <p>Search the Hub, browse by HR domain, or open the full A to Z of policies.</p>
            </div> */}

          </div>

          {/* ------- JOURNEY SECTION ------- */}
          <div className="journey-section">

            <div className="journey-header">
              <h2>A policy for every stage of your journey</h2>
              <p>
                Wherever you are in your career at the Service, there is guidance to help.
                Explore the stage that matters to you now.
              </p>
            </div>

            <div className="stage-grid">

              {
                this.state.PolicyStageInfo.length > 0 &&
                  this.state.PolicyStageInfo.map((item) => {
                    return (
                      <div className="stage-card">
                        <span className="stage-number">{item.Stage}</span>

                        <div className="stage-icon">
                          <img src={item.StageIcon} alt={item.Title} />
                        </div>

                        <h3>{item.Title}</h3>
                        <p>{item.Description}</p>
                      </div>
                    );
                })
              }

              {/* <div className="stage-card">
                <span className="stage-number">STAGE 01</span>

                <div className="stage-icon">
                  <svg viewBox="0 0 24 24">
                    <circle cx="10" cy="7" r="3"></circle>
                    <path d="M4 20V18C4 14.7 6.7 12 10 12C13.3 12 16 14.7 16 18V20"></path>
                    <path d="M17 6L19 8L22 4"></path>
                  </svg>
                </div>

                <h3>Join the Service</h3>
                <p>Recruitment, offers, checks and onboarding.</p>
              </div>

              <div className="stage-card">
                <span className="stage-number">STAGE 02</span>

                <div className="stage-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M6 3H15L19 7V21H6Z"></path>
                    <path d="M15 3V7H19"></path>
                    <path d="M9 12H15M9 16H15"></path>
                  </svg>
                </div>

                <h3>Do your job</h3>
                <p>Working arrangements, hours, records and day-to-day HR.</p>
              </div>

              <div className="stage-card">
                <span className="stage-number">STAGE 03</span>

                <div className="stage-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 18L9 12L13 15L21 6"></path>
                    <path d="M16 6H21V11"></path>
                    <path d="M3 21H21"></path>
                  </svg>
                </div>

                <h3>Perform and grow</h3>
                <p>Appraisals, learning, talent and development.</p>
              </div>

              <div className="stage-card">
                <span className="stage-number">STAGE 04</span>

                <div className="stage-icon">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M9.5 9.5C9.5 7.5 14.5 7.5 14.5 10C14.5 12 10 11.5 10 14"></path>
                    <path d="M12 17H12.01"></path>
                  </svg>
                </div>

                <h3>Be rewarded</h3>
                <p>Pay, allowances, benefits and recognition.</p>
              </div>

              <div className="stage-card">
                <span className="stage-number">STAGE 05</span>

                <div className="stage-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 8H20L16 4"></path>
                    <path d="M20 16H4L8 20"></path>
                  </svg>
                </div>

                <h3>Move and move on</h3>
                <p>Promotion, transfer, and leaving the Service well.</p>
              </div> */}

            </div>

            <div className="policy-notice">
              <svg viewBox="0 0 24 24">
                <path d="M12 3L5 6V11C5 16 8 19 12 21C16 19 19 16 19 11V6L12 3Z"></path>
                <path d="M9 12L11 14L15 10"></path>
              </svg>

              <span>
                Standards of conduct, fair treatment, leave and inclusion apply at every stage of your journey.
              </span>
            </div>

          </div>

        </div>

        
        <div className="hr-domain-container">

          {/* ------------- Browse Hr domain ------------------------  */}
          <section className="hr-domain-section">

            <div className="hr-section-header">
              <h2>Browse by HR domain</h2>
              <a href="#" className="hr-view-all">All domains <span>›</span></a>
            </div>

            <p className="hr-section-description">
              The twelve HR domains organise the Hub. Open a domain to see every policy it holds.
            </p>

            <div className="hr-domain-grid">

              {
                this.state.HRDomainHub.length > 0 &&
                  this.state.HRDomainHub.map((item) => {
                    return (
                      <a href={item.DomainLink.Url} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                        <div className="hr-domain-card">
                          <div className="hr-domain-box">
                            <img src={item.Icon}/>
                          </div>
                          <div className="hr-domian-content">
                            <h3>{item.Title}</h3>
                            <p>{item.PoliciesNumber}</p>
                          </div>
                        </div>
                      </a>
                    );
                  })
              }

              {/* <div className="hr-domain-card">
                <div className="hr-icon-box">
                  <svg viewBox="0 0 24 24">
                    <circle cx="10.5" cy="10.5" r="6"></circle>
                    <line x1="15" y1="15" x2="21" y2="21"></line>
                  </svg>
                </div>
                <div className="hr-card-content">
                  <h3>Talent Acquisition</h3>
                  <p>4 policies</p>
                </div>
              </div>

              <div className="hr-domain-card">
                <div className="hr-icon-box">
                  <svg viewBox="0 0 24 24">
                    <circle cx="10" cy="7" r="4"></circle>
                    <path d="M3 21v-2a7 7 0 0 1 14 0v2"></path>
                    <path d="M17 5l2 2 3-4"></path>
                  </svg>
                </div>
                <div className="hr-card-content">
                  <h3>Hire &amp; Onboarding</h3>
                  <p>6 policies</p>
                </div>
              </div>

              <div className="hr-domain-card">
                <div className="hr-icon-box">
                  <svg viewBox="0 0 24 24">
                    <path d="M6 3h9l4 4v14H6z"></path>
                    <path d="M15 3v5h4"></path>
                    <line x1="9" y1="12" x2="16" y2="12"></line>
                    <line x1="9" y1="16" x2="16" y2="16"></line>
                  </svg>
                </div>
                <div className="hr-card-content">
                  <h3>HR Operations</h3>
                  <p>13 policies</p>
                </div>
              </div>

              <div className="hr-domain-card">
                <div className="hr-icon-box">
                  <svg viewBox="0 0 24 24">
                    <ellipse cx="12" cy="5" rx="7" ry="3"></ellipse>
                    <path d="M5 5v14c0 1.7 14 1.7 14 0V5"></path>
                    <path d="M5 12c0 4 14 4 14 0"></path>
                  </svg>
                </div>
                <div className="hr-card-content">
                  <h3>Employee Data Management</h3>
                  <p>7 policies</p>
                </div>
              </div>

              <div className="hr-domain-card">
                <div className="hr-icon-box">
                  <svg viewBox="0 0 24 24">
                    <rect x="9" y="3" width="6" height="5" rx="1"></rect>
                    <rect x="3" y="16" width="6" height="5" rx="1"></rect>
                    <rect x="15" y="16" width="6" height="5" rx="1"></rect>
                    <path d="M12 8v4H6v4"></path>
                    <path d="M12 12h6v4"></path>
                  </svg>
                </div>
                <div className="hr-card-content">
                  <h3>Organisation Design</h3>
                  <p>6 policies</p>
                </div>
              </div>

              <div className="hr-domain-card">
                <div className="hr-icon-box">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 17l5-5 4 3 8-9"></path>
                    <path d="M15 6h5v5"></path>
                    <line x1="3" y1="21" x2="21" y2="21"></line>
                  </svg>
                </div>
                <div className="hr-card-content">
                  <h3>Performance &amp; Development</h3>
                  <p>14 policies</p>
                </div>
              </div>

              <div className="hr-domain-card">
                <div className="hr-icon-box">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 4"></path>
                    <circle cx="12" cy="17" r="0.7"></circle>
                  </svg>
                </div>
                <div className="hr-card-content">
                  <h3>Compensation &amp; Benefits</h3>
                  <p>9 policies</p>
                </div>
              </div>

              <div className="hr-domain-card">
                <div className="hr-icon-box">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="5" width="18" height="16" rx="1"></rect>
                    <line x1="7" y1="2" x2="7" y2="8"></line>
                    <line x1="17" y1="2" x2="17" y2="8"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div className="hr-card-content">
                  <h3>Attendance &amp; Absence Management</h3>
                  <p>12 policies</p>
                </div>
              </div>

              <div className="hr-domain-card">
                <div className="hr-icon-box">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 8h13l-3-3"></path>
                    <path d="M20 16H7l3 3"></path>
                  </svg>
                </div>
                <div className="hr-card-content">
                  <h3>Job Change</h3>
                  <p>5 policies</p>
                </div>
              </div>

              <div className="hr-domain-card">
                <div className="hr-icon-box">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 3v18"></path>
                    <path d="M5 6h14"></path>
                    <path d="M7 6l-4 8h8z"></path>
                    <path d="M17 6l-4 8h8z"></path>
                    <path d="M7 21h10"></path>
                  </svg>
                </div>
                <div className="hr-card-content">
                  <h3>Staff Union &amp; Conduct</h3>
                  <p>22 policies</p>
                </div>
              </div>

              <div className="hr-domain-card">
                <div className="hr-icon-box">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9"></circle>
                    <circle cx="12" cy="9" r="3"></circle>
                    <path d="M6.5 18a6 6 0 0 1 11 0"></path>
                  </svg>
                </div>
                <div className="hr-card-content">
                  <h3>Diversity, Equality &amp; Inclusion</h3>
                  <p>5 policies</p>
                </div>
              </div>

              <div className="hr-domain-card">
                <div className="hr-icon-box">
                  <svg viewBox="0 0 24 24">
                    <path d="M13 4h7v16h-7"></path>
                    <path d="M3 12h12"></path>
                    <path d="M11 8l4 4-4 4"></path>
                  </svg>
                </div>
                <div className="hr-card-content">
                  <h3>Exit &amp; Separation</h3>
                  <p>8 policies</p>
                </div>
              </div> */}

            </div>
          </section>

          {/* ---------- Recent Update Doc ------------------ */}
          <section className="hr-recent-section">

            <div className="hr-section-header">
              <h2>Recently updated policies</h2>
              <a href="#" className="hr-view-all">See all <span>›</span></a>
            </div>

            <p className="hr-section-description">
              The latest policies to be approved or revised on the Hub.
            </p>

            <div className="hr-recent-grid">

              {
                this.state.HRPolicieDoc.length > 0 &&
                  this.state.HRPolicieDoc.map((item) => {
                    return (
                      <a href={item.FileRef} target="_blank" rel="noopener noreferrer" data-interception="off" style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}>
                        <div className="hr-policy-card">
                          <div className="hr-icon-box">
                            <svg viewBox="0 0 24 24">
                              <path d="M6 3h9l4 4v14H6z"></path>
                              <path d="M15 3v5h4"></path>
                              <path d="M9 12h7M9 16h7"></path>
                            </svg>
                          </div>
                          <div className="hr-card-content">
                            <h3>{item.FileLeafRef}</h3>
                            <p>{item.HRDomain} · Updated {moment(new Date(item.Modified)).format("DD MMM YYYY")}</p>
                          </div>
                        </div>
                      </a>
                    );
                  })
              }

              {/* <div className="hr-policy-card">
                <div className="hr-icon-box">
                  <svg viewBox="0 0 24 24">
                    <path d="M6 3h9l4 4v14H6z"></path>
                    <path d="M15 3v5h4"></path>
                    <path d="M9 12h7M9 16h7"></path>
                  </svg>
                </div>
                <div className="hr-card-content">
                  <h3>Recruitment &amp; Selection</h3>
                  <p>Talent Acquisition · Updated 01 Aug 2026</p>
                </div>
              </div>

              <div className="hr-policy-card">
                <div className="hr-icon-box">
                  <svg viewBox="0 0 24 24">
                    <path d="M6 3h9l4 4v14H6z"></path>
                    <path d="M15 3v5h4"></path>
                    <path d="M9 12h7M9 16h7"></path>
                  </svg>
                </div>
                <div className="hr-card-content">
                  <h3>Performance Appraisal Policy</h3>
                  <p>Performance &amp; Development · Updated 01 Aug 2026</p>
                </div>
              </div>

              <div className="hr-policy-card">
                <div className="hr-icon-box">
                  <svg viewBox="0 0 24 24">
                    <path d="M6 3h9l4 4v14H6z"></path>
                    <path d="M15 3v5h4"></path>
                    <path d="M9 12h7M9 16h7"></path>
                  </svg>
                </div>
                <div className="hr-card-content">
                  <h3>Annual Leave</h3>
                  <p>Attendance &amp; Absence Management · Updated 01 Aug 2026</p>
                </div>
              </div>

              <div className="hr-policy-card">
                <div className="hr-icon-box">
                  <svg viewBox="0 0 24 24">
                    <path d="M6 3h9l4 4v14H6z"></path>
                    <path d="M15 3v5h4"></path>
                    <path d="M9 12h7M9 16h7"></path>
                  </svg>
                </div>
                <div className="hr-card-content">
                  <h3>Disciplinary Policy &amp; Procedure</h3>
                  <p>Staff Union &amp; Conduct · Updated 01 Aug 2026</p>
                </div>
              </div>

              <div className="hr-policy-card">
                <div className="hr-icon-box">
                  <svg viewBox="0 0 24 24">
                    <path d="M6 3h9l4 4v14H6z"></path>
                    <path d="M15 3v5h4"></path>
                    <path d="M9 12h7M9 16h7"></path>
                  </svg>
                </div>
                <div className="hr-card-content">
                  <h3>Grievance Policy &amp; Procedure</h3>
                  <p>Staff Union &amp; Conduct · Updated 01 Aug 2026</p>
                </div>
              </div> */}

            </div>
          </section>

        </div>

        <div className="hr-portal">

          <div className="policy-banner">
            <div className="policy-left">
              <div className="policy-icon">A–Z</div>

              <div className="policy-content">
                <h3>HR Policies A to Z</h3>
                <p>
                  Every NRS HR policy in one alphabetical list,
                  each linking straight to its policy page.
                </p>
              </div>
            </div>

            <a href="#" className="primary-button">Open the A to Z</a>
          </div>

          {/* ----------------- News and Announcement Section ----------------- */}
          <section className="news-section">

            <div className="section-header">
              <h2>Latest news and announcements</h2>
              <a href="#" className="see-all">See all <span>›</span></a>
            </div>

            <div className="news-grid">

              {
                this.state.NewsAnnouncementsData.length > 0 &&
                  this.state.NewsAnnouncementsData.map((item) => {
                    return (
                      <div className="news-card">

                        <div className="news-image">
                          <img
                            src={item.NewsImage}
                            alt="NRS team"
                          />
                        </div>

                        <div className="news-content">
                          <h3>{item.NewsTitle}</h3>

                          <p className="news-meta">
                            {item.NewsSource} · {moment(new Date(item.NewsDate)).format("MMMM DD, YYYY")}
                          </p>

                          <p className="news-description">
                            {item.NewsDescription}
                          </p>
                        </div>

                      </div>
                    );
                  })
              }

              {/* <div className="news-card">

                <div className="news-image">
                  <img
                    src={(require('../assets/download.jpg'))}
                    alt="NRS team"
                  />
                </div>

                <div className="news-content">
                  <h3>Disciplinary Policy and Procedure now published</h3>

                  <p className="news-meta">
                    Human Capital Management Group · 3 June 2026
                  </p>

                  <p className="news-description">
                    The revised Disciplinary Policy and Procedure is now
                    live on the Hub, with clearer investigation, hearing
                    and appeal standards.
                  </p>
                </div>

              </div>

              <div className="news-card">

                <div className="leave-image">
                  <div className="leave-circle"></div>

                  <div className="calendar-icon">
                    <div className="calendar-top"></div>
                    <div className="calendar-rings">
                      <span></span>
                      <span></span>
                    </div>
                    <div className="calendar-check">✓</div>
                  </div>
                </div>

                <div className="news-content">
                  <h3>Annual leave: plan your 2027 entitlement</h3>

                  <p className="news-meta">
                    People Services · 28 May 2026
                  </p>

                  <p className="news-description">
                    Requests are submitted through the HR system and
                    approved by your line manager. See the Annual Leave
                    policy for carry over rules.
                  </p>
                </div>

              </div>

              <div className="news-card">

                <div className="az-image">
                  <div className="az-title">A–Z</div>

                  <div className="az-lines">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <div className="az-dots"></div>
                </div>

                <div className="news-content">
                  <h3>New A to Z index makes every policy easier to find</h3>

                  <p className="news-meta">
                    Human Capital Management Group · 20 May 2026
                  </p>

                  <p className="news-description">
                    Every NRS HR policy is now listed in one alphabetical
                    index, with a link straight to each policy page.
                  </p>
                </div>

              </div> */}

            </div>

          </section>

          <div className="quick-links">

            <div className="quick-card">

              <div className="quick-icon">
                <span className="question-icon">?</span>
              </div>

              <div className="quick-content">
                <h3>FAQs and Knowledge Base</h3>

                <p>Quick answers, definitions and guidance across HR.</p>

                <a href="#" className="quick-link">
                  Go to FAQs <span>›</span>
                </a>
              </div>

            </div>

            <div className="quick-card">

              <div className="quick-icon">
                <span className="message-icon"><img src={require('../assets/Ask.png')} /></span>
              </div>

              <div className="quick-content">
                <h3>Ask HR</h3>

                <p>Raise a query through the People Service Portal.</p>

                <a href="#" className="quick-link">
                  Ask HR <span>›</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    );
  }

  public async componentDidMount() {
    this.getExploreQuickLink();
    this.getPolicyPortalFeautures();
    this.getPolicyStageInfo();
    this.getHRDomain();
    this.getNewsAnnouncements();
    this.getPoliciesData();
  }

  public async getExploreQuickLink() {
    const quick = await sp.web.lists.getByTitle("Explore the Hub").items.select(
      "Title",
      "Description",
      "Icon",
      "Link"
    ).expand("AttachmentFiles").get().then((data) => {
      let AllData = [];
      if (data.length > 0) {
        data.forEach((item) => {
          AllData.push({
            ID: item.ID ? item.ID : "",
            Title: item.Title ? item.Title : "",
            Description: item.Description ? item.Description : "",
            Icon: item.AttachmentFiles.length > 0 ? item.AttachmentFiles[0].ServerRelativeUrl : item.Icon ? JSON.parse(item.Icon).serverRelativeUrl : require(`../assets/HRDomin.png`),
            Link: item.Link ? item.Link : ""
          });
        });
        this.setState({ ExploreQuickLinks: AllData });
      }
    }).catch((error) => {
      console.log("Error fetching Explore Quick Links: ", error);
    });
  }

  public async getPolicyPortalFeautures() {
    const plicyportal = await sp.web.lists.getByTitle("NRS Portal Features").items.select(
      "Title",
      "Description",
      "Icon",
    ).expand("AttachmentFiles").get().then((data) => {
      let AllData = [];
      if (data.length > 0) {
        data.forEach((item) => {
          AllData.push({
            ID: item.ID ? item.ID : "",
            Title: item.Title ? item.Title : "",
            Description: item.Description ? item.Description : "",
            Icon: item.AttachmentFiles.length > 0 ? item.AttachmentFiles[0].ServerRelativeUrl : item.Icon ? JSON.parse(item.Icon).serverRelativeUrl : require(`../assets/HRDomin.png`)
          });
        });
        this.setState({ PolicyPortalFeautures: AllData });
      }
    }).catch((error) => {
      console.log("Error fetching Policy Portal Features: ", error);
    });
  }

  public async getPolicyStageInfo() {
    const policy = await sp.web.lists.getByTitle("Policy Stage").items.select(
      "Stage",
      "Title",
      "Description",
      "StageIcon",
    ).expand("AttachmentFiles").get().then((data) => {
      let AllData = [];
      if (data.length > 0) {
        data.forEach((item) => {
          AllData.push({
            ID: item.ID ? item.ID : "",
            Stage: item.Stage ? item.Stage : "",
            Title: item.Title ? item.Title : "",
            Description: item.Description ? item.Description : "",
            StageIcon: item.AttachmentFiles.length > 0 ? item.AttachmentFiles[0].ServerRelativeUrl : item.StageIcon ? JSON.parse(item.StageIcon).serverRelativeUrl : require(`../assets/HRDomin.png`)
          });
        });
        this.setState({ PolicyStageInfo: AllData });
      }
    }).catch((error) => {
      console.log("Error fetching Policy Stage Info: ", error);
    });
  }

  public async getHRDomain() {
    const hrdomain = await sp.web.lists.getByTitle("HR Domain Hub").items.select(
      "Title",
      "PoliciesNumber",
      "Icon",
      "DomainLink"
    ).expand("AttachmentFiles").get().then((data) => {
      let AllData = [];
      if (data.length > 0) {
        data.forEach((item) => {
          AllData.push({
            ID: item.ID ? item.ID : "",
            Title: item.Title ? item.Title : "",
            PoliciesNumber: item.PoliciesNumber ? item.PoliciesNumber : "",
            Icon: item.AttachmentFiles.length > 0 ? item.AttachmentFiles[0].ServerRelativeUrl : item.Icon ? JSON.parse(item.Icon).serverRelativeUrl : require(`../assets/HRDomin.png`),
            DomainLink: item.DomainLink ? item.DomainLink : ""
          });
        });
        this.setState({ HRDomainHub: AllData });
      }
    }).catch((error) => {
      console.log("Error fetching HR Domain Hub Info: ", error);
    });
  }

  public async getNewsAnnouncements() {
    const news = await sp.web.lists.getByTitle("News and Announcements").items.select(
      "NewsTitle",
      "NewsSource",
      "NewsDate",
      "NewsDescription",
      "NewsImage"
    ).expand("AttachmentFiles").get().then((data) => {
      let AllData = [];
      if (data.length > 0) {
        data.forEach((item) => {
          AllData.push({
            ID: item.ID ? item.ID : "",
            NewsTitle: item.NewsTitle ? item.NewsTitle : "",
            NewsSource: item.NewsSource ? item.NewsSource : "",
            NewsDescription: item.NewsDescription ? item.NewsDescription : "",
            NewsImage: item.AttachmentFiles.length > 0 ? item.AttachmentFiles[0].ServerRelativeUrl : item.NewsImage ? JSON.parse(item.NewsImage).serverRelativeUrl : require(`../assets/HRDomin.png`),
            NewsDate: item.NewsDate ? item.NewsDate : ""
          });
        });
        this.setState({ NewsAnnouncementsData: AllData });
      }
    }).catch((error) => {
      console.log("Error fetching NewsAnnouncementsData Info: ", error);
    });
  }

  public async getPoliciesData() {
  const data = await sp.web.lists
    .getByTitle("HR Policies")
    .items
    .select(
        "Id", "FileLeafRef", "FileRef", "Modified", "Editor/Title", "File_x0020_Type",  "File",
        "EncodedAbsUrl", "File/ServerRelativeUrl","HRDomain/Title",
      "HRDomain/Id"
    )
    .expand("Editor,File","HRDomain")
    .filter("FSObjType eq 0")
    .orderBy("Modified", false)
    .top(10)
    .get();

  let AllData: any[] = [];

  console.log(data);

  if (data.length > 0) {
    data.forEach((item) => {
      AllData.push({
        ID: item.ID ? item.ID : "",
        FileLeafRef: item.FileLeafRef ? item.FileLeafRef : "",
        FileRef: item.FileRef ? item.FileRef : "",
        Modified: item.Modified ? item.Modified : "",
        HRDomain: item.HRDomain ? item.HRDomain.Title : "",
        HRDomainID: item.HRDomain ? item.HRDomain.Id : ""
      });
    });

    this.setState({
      HRPolicieDoc: AllData
    });
  }
}

}
