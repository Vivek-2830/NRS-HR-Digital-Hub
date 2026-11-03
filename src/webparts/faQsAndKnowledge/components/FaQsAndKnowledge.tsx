import * as React from 'react';
import styles from './FaQsAndKnowledge.module.scss';
import { IFaQsAndKnowledgeProps } from './IFaQsAndKnowledgeProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from '@pnp/sp';

require('../assets/style.css');

export interface IFaQsAndKnowledgeState {
  FAQsDetailsData : any;
}

export default class FaQsAndKnowledge extends React.Component<IFaQsAndKnowledgeProps,IFaQsAndKnowledgeState> {

  constructor(props: IFaQsAndKnowledgeProps, state: IFaQsAndKnowledgeState) {
    
    super(props);
    
    this.state = {
      FAQsDetailsData: ""
    }
  }

  public render(): React.ReactElement<IFaQsAndKnowledgeProps> {
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

        <div className="container">
          <section className="faQsAndKnowledge">

            <div className="faq-container">

              <div className="breadcrumb">
                <a href="#">Home</a>
                <span>/</span>
                <div>FAQs and Knowledge Base</div>
              </div>

              <div className="faq-heading">
                <h1>FAQs and Knowledge Base</h1>

                <p>
                  Quick answers to common questions, plain English definitions,
                  and short guides across HR. Select a category to open it.
                </p>

                <div className="heading-line"></div>
              </div>

              <div className="faq-list">

                <details className="faq-item">
                  <summary>
                    <div className="faq-title">
                      <svg className="faq-icon" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="1.8">
                        <path d="M6 2h9l5 5v15H6z" />
                        <path d="M14 2v6h6M9 13h8M9 17h8" />
                      </svg>
                      Using the Hub
                    </div>
                    <span className="faq-arrow">›</span>
                  </summary>

                  <div className="faq-content">
                    <p>Find answers about using the HR Hub and navigating its features.</p>
                    <ul>
                      <li>How do I access the HR Hub?</li>
                      <li>How can I find important HR information?</li>
                    </ul>
                  </div>
                </details>

                <details className="faq-item">
                  <summary>
                    <div className="faq-title">
                      <svg className="faq-icon" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="1.8">
                        <rect x="3" y="5" width="18" height="16" rx="2" />
                        <path d="M16 3v4M8 3v4M3 10h18" />
                      </svg>
                      Leave and absence
                    </div>
                    <span className="faq-arrow">›</span>
                  </summary>

                  <div className="faq-content">
                    <p>Information about annual leave, sick leave and other absences.</p>
                    <ul>
                      <li>How do I apply for annual leave?</li>
                      <li>How do I report sickness absence?</li>
                    </ul>
                  </div>
                </details>

                <details className="faq-item">
                  <summary>
                    <div className="faq-title">
                      <svg className="faq-icon" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="1.8">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9 9a3 3 0 0 1 5.8 1c0 2-2.8 2.5-2.8 4" />
                        <path d="M12 17h.01" />
                      </svg>
                      Pay and benefits
                    </div>
                    <span className="faq-arrow">›</span>
                  </summary>

                  <div className="faq-content">
                    <p>Learn about salary, payroll, pensions and employee benefits.</p>
                    <ul>
                      <li>When will I receive my salary?</li>
                      <li>Where can I view my payslip?</li>
                    </ul>
                  </div>
                </details>

                <details className="faq-item">
                  <summary>
                    <div className="faq-title">
                      <svg className="faq-icon" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="1.8">
                        <path d="M12 3v18M5 6h14M5 6l-3 7h6L5 6zM19 6l-3 7h6l-3-7zM8 21h8" />
                      </svg>
                      Conduct and grievances
                    </div>
                    <span className="faq-arrow">›</span>
                  </summary>

                  <div className="faq-content">
                    <p>Guidance on workplace conduct, policies and grievance procedures.</p>
                    <ul>
                      <li>How do I raise a grievance?</li>
                      <li>Where can I find workplace policies?</li>
                    </ul>
                  </div>
                </details>

                <details className="faq-item">
                  <summary>
                    <div className="faq-title">
                      <svg className="faq-icon" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="1.8">
                        <path d="M4 4h16v13H8l-4 4z" />
                        <path d="M8 9h8M8 13h5" />
                      </svg>
                      Getting support
                    </div>
                    <span className="faq-arrow">›</span>
                  </summary>

                  <div className="faq-content">
                    <p>Find out how to contact HR and get help with your questions.</p>
                    <ul>
                      <li>How can I contact the HR team?</li>
                      <li>Where can I get additional support?</li>
                    </ul>
                  </div>
                </details>

              </div>
            </div>

          </section>

          <div className="glossary-container">

            <div className="glossary-heading">
              <span className="question-icon">?</span>
              <h2>Definitions and glossary</h2>
            </div>

            <div className="glossary-card">

              <div className="glossary-item">
                <h3>Effective date</h3>
                <p>The date from which a policy formally applies.</p>
              </div>

              <div className="glossary-item">
                <h3>Review date</h3>
                <p>The date by which a policy must be reviewed to remain current.</p>
              </div>

              <div className="glossary-item">
                <h3>Procedure</h3>
                <p>The step by step how, sitting beneath a policy that sets out the what and the why.</p>
              </div>

              <div className="glossary-item">
                <h3>Grievance</h3>
                <p>A concern, problem or complaint an employee raises formally with the Service.</p>
              </div>

              <div className="glossary-item">
                <h3>Probation</h3>
                <p>The initial period in a role during which performance and suitability are assessed.</p>
              </div>

            </div>
          </div>

          <div className="knowledge-container">

            <div className="knowledge-heading">
              <svg className="heading-icon" viewBox="0 0 24 24">
                <path d="M6 2.5h8l4 4v15H6z"></path>
                <path d="M14 2.5v4h4M9 11h6M9 15h6"></path>
              </svg>
              <h2>Knowledge articles</h2>
            </div>

            <div className="knowledge-card">

              <div className="knowledge-item">
                <svg className="article-icon" viewBox="0 0 24 24">
                  <path d="M6 2.5h8l4 4v15H6z"></path>
                  <path d="M14 2.5v4h4M9 11h6M9 15h6"></path>
                </svg>

                <div className="article-content">
                  <h3>How to read an NRS HR policy</h3>
                  <p>A short guide to the structure of every policy and where to find what you need.</p>
                </div>
              </div>

              <div className="knowledge-item">
                <svg className="article-icon" viewBox="0 0 24 24">
                  <path d="M6 2.5h8l4 4v15H6z"></path>
                  <path d="M14 2.5v4h4M9 11h6M9 15h6"></path>
                </svg>

                <div className="article-content">
                  <h3>Understanding your leave entitlement</h3>
                  <p>What counts towards your annual leave and how carry over works.</p>
                </div>
              </div>

              <div className="knowledge-item">
                <svg className="article-icon" viewBox="0 0 24 24">
                  <path d="M6 2.5h8l4 4v15H6z"></path>
                  <path d="M14 2.5v4h4M9 11h6M9 15h6"></path>
                </svg>

                <div className="article-content">
                  <h3>Preparing for your performance appraisal</h3>
                  <p>Practical steps to get the most from the appraisal conversation.</p>
                </div>
              </div>

            </div>

            <div className="help-card">

              <div className="help-icon">
                ?
              </div>

              <div className="help-content">
                <h3>Still need help?</h3>
                <p>If your question is not answered here, raise a request through the People Service Portal.</p>
              </div>

              <a href="#" className="ask-hr-btn">Ask HR</a>

            </div>

          </div>

        </div>
      </>

    );
  }

   public async componentDidMount() {
    this.getFAQsRepository();
  }

  public async getFAQsRepository() {
    const response = await sp.web.lists.getByTitle("FAQs").items.select(
      "Question",
      "Answer",
      "FAQType"
    ).get().then((data) =>{
      let AllData = [];
      if(data.length > 0) {
        data.forEach((item) => {
          AllData.push({
            ID: item.ID ? item.ID : "",
            Question: item.Question ? item.Question : "",
            Answer: item.Answer ? item.Answer : "",
            FAQType: item.FAQType ? item.FAQType : ""
          });
        });
        this.setState({ FAQsDetailsData: AllData });
      }
    }).catch((error) => {
      console.log("Error fetching FAQs data: ", error);
    });
  }

}
