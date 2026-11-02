import * as React from 'react';
import styles from './FormsAndResources.module.scss';
import { IFormsAndResourcesProps } from './IFormsAndResourcesProps';
import { escape } from '@microsoft/sp-lodash-subset';

require('../assets/style.css');

export default class FormsAndResources extends React.Component<IFormsAndResourcesProps, {}> {
  public render(): React.ReactElement<IFormsAndResourcesProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <>

        <section className="formsAndResources">

          <section className="nrsHrDomains">
            <div className="nrsHomePage">
              <div className="hr-red-shapes"></div>
              <div className="hr-hero-copy">
                <h1 className="hr-title">HR Policies and Procedures</h1>
              </div>
              <div className="hr-team-photo" role="img" aria-label="Human Capital Management Group team"></div>
            </div>
          </section>

        </section>

        <div className="container">

          <div className="breadcrumb">
            <a href="#">Home</a>
            <span>/</span>
            <span>Forms and Resources</span>
          </div>

          <div className="page-header">
            <h1>Forms and Resources</h1>
            <p>
              One place for every HR form, template and checklist.
              Filter by HR domain or type, search the list, and download what you need.
            </p>
            <div className="red-line"></div>
          </div>

          <div className="resource-container">

            <div className="toolbar">

              <div className="filters">
                <select>
                  <option>All HR domains</option>
                  <option>Attendance & Absence Management</option>
                  <option>Compensation & Benefits</option>
                  <option>Diversity, Equality & Inclusion</option>
                  <option>Employee Data Management</option>
                  <option>Exit & Separation</option>
                </select>

                <select className="type-filter">
                  <option>All types</option>
                  <option>Form</option>
                  <option>Checklist</option>
                </select>
              </div>

              <div className="search-box">
                <span className="search-icon">⌕</span>
                <input type="text" placeholder="Search this list" />
              </div>

            </div>

            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Form or resource</th>
                    <th>HR domain</th>
                    <th>Type</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Annual Leave Request Form</td>
                    <td>Attendance & Absence Management</td>
                    <td><a href="#">Form <span className="download">↓</span></a></td>
                  </tr>

                  <tr>
                    <td>Attendance & Absence Management Checklist</td>
                    <td>Attendance & Absence Management</td>
                    <td><a href="#">Checklist <span className="download">↓</span></a></td>
                  </tr>

                  <tr>
                    <td>Compensation & Benefits Checklist</td>
                    <td>Compensation & Benefits</td>
                    <td><a href="#">Checklist <span className="download">↓</span></a></td>
                  </tr>

                  <tr>
                    <td>Compensation & Benefits Request Form</td>
                    <td>Compensation & Benefits</td>
                    <td><a href="#">Form <span className="download">↓</span></a></td>
                  </tr>

                  <tr>
                    <td>Diversity, Equality & Inclusion Checklist</td>
                    <td>Diversity, Equality & Inclusion</td>
                    <td><a href="#">Checklist <span className="download">↓</span></a></td>
                  </tr>

                  <tr>
                    <td>Diversity, Equality & Inclusion Request Form</td>
                    <td>Diversity, Equality & Inclusion</td>
                    <td><a href="#">Form <span className="download">↓</span></a></td>
                  </tr>

                  <tr>
                    <td>Employee Data Management Checklist</td>
                    <td>Employee Data Management</td>
                    <td><a href="#">Checklist <span className="download">↓</span></a></td>
                  </tr>

                  <tr>
                    <td>Employee Data Management Request Form</td>
                    <td>Employee Data Management</td>
                    <td><a href="#">Form <span className="download">↓</span></a></td>
                  </tr>

                  <tr>
                    <td>Exit & Separation Checklist</td>
                    <td>Exit & Separation</td>
                    <td><a href="#">Checklist <span className="download">↓</span></a></td>
                  </tr>

                  <tr>
                    <td>Exit & Separation Request Form</td>
                    <td>Exit & Separation</td>
                    <td><a href="#">Form <span className="download">↓</span></a></td>
                  </tr>

                  <tr>
                    <td>Formal Grievance Form</td>
                    <td>Staff Union & Conduct</td>
                    <td><a href="#">Form <span className="download">↓</span></a></td>
                  </tr>

                </tbody>
              </table>
            </div>

          </div>

        </div>

      </>

    );
  }
}
