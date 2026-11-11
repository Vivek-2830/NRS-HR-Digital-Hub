import * as React from 'react';
import styles from './NrsHrDomainSubpage.module.scss';
import { INrsHrDomainSubpageProps } from './INrsHrDomainSubpageProps';
import { escape } from '@microsoft/sp-lodash-subset';

require('../assets/style.css');

export default class NrsHrDomainSubpage extends React.Component<INrsHrDomainSubpageProps, {}> {
  public render(): React.ReactElement<INrsHrDomainSubpageProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <div id='nrsHrDomainssubpage'>
    <section className="nrsHrDomains">
        <div className="nrsHomePage">
          <div className="hr-red-shapes"></div>
          <div className="hr-hero-copy">
            <h1 className="hr-title">HR Policies and Procedures</h1>
          </div>
          <div className="hr-team-photo" role="img" aria-label="Human Capital Management Group team"></div>
        </div>
      </section>

<div className="page">

  <nav className="breadcrumb" aria-label="Breadcrumb">
    <a href="#">Home</a><span className="sep">/</span>
    <a href="#">Talent Acquisition</a><span className="sep">/</span>
    <span aria-current="page">Recruitment &amp; Selection</span>
  </nav>

  <h2 className="title">Recruitment &amp; Selection</h2>
  <span className="chip">Talent Acquisition</span>
  <div className="rule"></div>

  <p className="lead">
    Establishes merit based recruitment from requisition through to offer. It incorporates the eight stages from manpower
    requisition to offer, the sixty working day standard timeline, the Staff Committee route from the Officers' Recruitment
    Committee to the Board, and the decision logs retained for each hire.
  </p>

  <div className="layout">

    <div className="main">

      <section>
        <h3 className="section-title">Download</h3>
        <div className="downloads">
          <a href="#" className="dl primary">
            <span className="icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 20h16"/></svg>
            </span>
            <span><span className="name" style={{display:"block"}}>Policy</span><span className="type">PDF</span></span>
          </a>
          <a href="#" className="dl">
            <span className="icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 20h16"/></svg>
            </span>
            <span><span className="name" style={{display:"block"}}>Procedure</span><span className="type">PDF</span></span>
          </a>
        </div>
      </section>

      <section>
        <h3 className="section-title">Resources</h3>
        <div className="list">
          <a href="#" className="row">
            <svg className="doc" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2h9l5 5v15H6z"/><path d="M9 12h8M9 16h8M9 8h3"/></svg>
            <span className="label">Manpower Requisition Form</span>
            <span className="tag">Form</span>
            <svg className="dl-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 20h16"/></svg>
          </a>
          <a href="#" className="row">
            <svg className="doc" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2h9l5 5v15H6z"/><path d="M9 12h8M9 16h8M9 8h3"/></svg>
            <span className="label">Interview Assessment Scoresheet</span>
            <span className="tag">Template</span>
            <svg className="dl-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 20h16"/></svg>
          </a>
          <a href="#" className="row">
            <svg className="doc" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2h9l5 5v15H6z"/><path d="M9 12h8M9 16h8M9 8h3"/></svg>
            <span className="label">Candidate Offer Letter Template</span>
            <span className="tag">Letter</span>
            <svg className="dl-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 20h16"/></svg>
          </a>
        </div>
      </section>

      <section>
        <h3 className="section-title">Related policies</h3>
        <div className="related">
          <a href="#">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/></svg>
            Advertising &amp; Sourcing
          </a>
          <a href="#">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/></svg>
            Assessment &amp; Interviewing
          </a>
          <a href="#">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/></svg>
            Interview Panel Conduct &amp; Bias Mitigation
          </a>
        </div>
        <p className="note">In the live site every related policy links to its own page. Here, only the policies we have built open. The others are shown but not clickable.</p>
      </section>

      <section>
        <h3 className="section-title">Need help</h3>
        <div className="help">
          <a href="#">
            <span className="icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 114 2c-.8.6-1.5 1-1.5 2M12 17h.01"/></svg>
            </span>
            <span>
              <span className="name" style={{display:"block"}}>FAQs and Knowledge Base</span>
              <span className="desc" style={{display:"block"}}>Quick answers on this policy.</span>
            </span>
          </a>
          <a href="#">
            <span className="icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v12H8l-4 4z"/><path d="M8 9h8M8 12h5"/></svg>
            </span>
            <span>
              <span className="name" style={{display:"block"}}>Ask HR</span>
              <span className="desc" style={{display:"block"}}>Raise a query through the People Service Portal.</span>
            </span>
          </a>
        </div>
      </section>

    </div>

    <aside className="control" aria-label="Document control">
      <h2>Document control</h2>
      <dl>
        <div className="item"><dt>Reference</dt><dd>NRS-HRPP-TA-004</dd></div>
        <div className="item"><dt>HR domain</dt><dd>Talent Acquisition</dd></div>
        <div className="item"><dt>Document type</dt><dd>Policy and Procedure</dd></div>
        <div className="item"><dt>Version</dt><dd>1.0</dd></div>
        <div className="item"><dt>Approval date</dt><dd>25 July 2026</dd></div>
        <div className="item"><dt>Effective date</dt><dd>01 August 2026</dd></div>
        <div className="item"><dt>Next review</dt><dd>01 August 2027</dd></div>
        <div className="item"><dt>Owner</dt><dd>Workforce Management</dd></div>
      </dl>
      <a href="#" className="history">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
        Version history
      </a>
    </aside>

  </div>
</div>
      </div>
    );
  }
}
