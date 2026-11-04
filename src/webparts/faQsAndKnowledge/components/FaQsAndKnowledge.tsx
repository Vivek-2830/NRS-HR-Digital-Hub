import * as React from 'react';
import styles from './FaQsAndKnowledge.module.scss';
import { IFaQsAndKnowledgeProps } from './IFaQsAndKnowledgeProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp/presets/all";

require('../assets/style.css');

export interface IFaQsAndKnowledgeState {
  FAQsDetailsData: any;
  DefinitionsData: any;
}

export default class FaQsAndKnowledge extends React.Component<IFaQsAndKnowledgeProps, IFaQsAndKnowledgeState> {

  constructor(props: IFaQsAndKnowledgeProps, state: IFaQsAndKnowledgeState) {

    super(props);

    this.state = {
      FAQsDetailsData: "",
      DefinitionsData: ""
    }
  }

  private getGroupedFAQs() {

    const groupedFAQs: { [key: string]: any[] } = {};

    const faqData = Array.isArray(this.state.FAQsDetailsData)
      ? this.state.FAQsDetailsData
      : [];

    faqData.forEach((item: any) => {

      const faqType = item.FAQType || "Other";

      if (!groupedFAQs[faqType]) {
        groupedFAQs[faqType] = [];
      }

      groupedFAQs[faqType].push(item);

    });

    return groupedFAQs;
  }

  public render(): React.ReactElement<IFaQsAndKnowledgeProps> {

    const {
      HelpTitle,
      HelpDescription,
      HRPortalLink
    } = this.props;

    const groupedFAQs = this.getGroupedFAQs();

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

                {Object.keys(groupedFAQs).map((faqType, index) => (

                  <details className="faq-item" key={faqType}>

                    <summary>

                      <div className="faq-title">

                        <svg
                          className="faq-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M6 2h9l5 5v15H6z" />
                          <path d="M14 2v6h6M9 13h8M9 17h8" />
                        </svg>

                        {faqType}

                      </div>

                      <span className="faq-arrow">›</span>

                    </summary>

                    {/* Questions and Answers display together */}
                    <div className="faq-content">

                      {groupedFAQs[faqType].map((faq: any) => (

                        <div className="faq-question-answer" key={faq.ID}>

                          <h4 className="faq-question">
                            {faq.Question}
                          </h4>

                          <p className="faq-answer">
                            {faq.Answer}
                          </p>

                        </div>

                      ))}

                    </div>

                  </details>

                ))}

              </div>
            </div>

          </section>

          <div className="glossary-container">

            <div className="glossary-heading">
              <span className="question-icon">?</span>
              <h2>Definitions and glossary</h2>
            </div>

            <div className="glossary-card">

              {
                this.state.DefinitionsData && this.state.DefinitionsData.map((item : any) => (
                  <div className="glossary-item" key={item.ID}>
                    <h3>{item.Title}</h3>
                    <p>{item.Description}</p>
                  </div>
                ))
              }

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
                <h3>{this.props.HelpTitle || 'Still need help?'}</h3>
                <p>{this.props.HelpDescription || 'If your question is not answered here, raise a request through the People Service Portal.'}</p>
              </div>

              <a href={this.props.HRPortalLink || '#'} className="ask-hr-btn">Ask HR</a>

            </div>

          </div>

        </div>
      </>

    );
  }

  public async componentDidMount() {
    this.getFAQsRepository();
    this.getDefinitionsData();
  }

  public async getFAQsRepository() {
    try {
      const response = await sp.web.lists
        .getByTitle("FAQs")
        .items
        .select("ID", "Question", "Answer", "FAQType")
        .get();

      const AllData = response.map((item: any) => ({
        ID: item.ID || "",
        Question: item.Question || "",
        Answer: item.Answer || "",
        FAQType: item.FAQType || ""
      }));

      this.setState({
        FAQsDetailsData: AllData
      });

      console.log("FAQs Data:", AllData);

    } catch (error) {
      console.log("Error fetching FAQs:", error);
    }
  }

  public async getDefinitionsData() {
    const glossary = await sp.web.lists.getByTitle("Definitions and glossary").items.select(
      "ID","Title", "Description"
    ).get();

    const AllData = glossary.map((item: any) => ({
      ID: item.ID || "",
      Title: item.Title || "",
      Description: item.Description || ""
    }));

    this.setState({
      DefinitionsData: AllData
    });

    console.log("Definitions Data:", AllData);
  }

}
