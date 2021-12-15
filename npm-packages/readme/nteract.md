<img src="https://cloud.githubusercontent.com/assets/836375/15271096/98e4c102-19fe-11e6-999a-a74ffe6e2000.gif" alt="nteract animated logo" style="text-align:center"/>

<h1>the interactive computing suite for you</h1>

<p>
<a href="https://codecov.io/github/nteract/nteract?branch=master"><img src="https://codecov.io/github/nteract/nteract/coverage.svg?branch=master"/></a>
<a href="https://slack.nteract.io"><img src="https://slack.nteract.io/badge.svg"/></a>
<a href="https://lerna.js.org/"><img src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg"/></a>
<a href="https://circleci.com/gh/nteract/nteract/tree/master"><img src="https://circleci.com/gh/nteract/nteract/tree/master.svg?style=shield"/></a>
</p>

nteract is an open-source organization committed to creating fantastic interactive computing experiences that allow people to collaborate with ease.

We build SDKs, applications, and libraries that help you and your team make the most of interactive (particularly Jupyter) notebooks and REPLs.

To learn more about the nteract open source organization and the rest of our projects, please visit [our website](https://nteract.io/).

## What's in this repo?

This repo is a monorepo. It contains the code for the nteract core SDK and nteract's desktop and web applications. It also contains the documentation for the SDK and the applications. Here's a quick guide to the contents of the monorepo.

| Folder                         | Description                                                                                                                                                                                          |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| applications/desktop           | This folder contains the source code for the nteract desktop application. The desktop application is a cross-platform app built using [Electron](https://electronjs.org/).                           |
| applications/jupyter-extension | This folder contains the source code the nteract Jupyter extension. This extension can be installed alongside Jupyter classic and JupyterLab in your Jupyter deployments or personal Jupyter server. |
| changelogs                     | This folder contains the changelogs for each release of the nteract core SDK and applications.                                                                                                       |
| packages                       | This folder contains the JavaScript packages that are part of the nteract core SDK.                                                                                                                  |

## How do I contribute to this repo?

If you are interested in contributing to nteract, please read the [contribution guidelines](./CONTRIBUTING.md) for information on how to set up your nteract repo for development, how to write tests and validate changes, how to update documentation, and how to submit your code changes for review on GitHub.

## How do I use the nteract core SDK?

If you are a developer who wants to build an nteract-based notebook application, check out the following documentation resources for more info.

| Link                                                    | What's in it?                                                                                                                                                           |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [docs.nteract.io](https://docs.nteract.io/)             | This page contains our how-to and tutorial style documentation. Get started learning about the nteract core SDK here. |
| [packages.nteract.io](https://packages.nteract.io/)     | This page contains the API documentation for packages in our core SDK. Bookmark this and use it as a reference when building your nteract-based UI.                     |
| [components.nteract.io](https://components.nteract.io/) | This page contains the documentation for our suite of composable React components. It contains code samples that you can reference when building your nteract-based UI. |

Our documentation is living. We are always making changes and adding more content. If you have feedback about the documentation, please open an issue in this repo. If you are interested in submitting a change to our documentation page, please review the [contribution guidelines](./CONTRIBUTING.md) and submit a pull request.

## How do I use the nteract desktop application?

To get started with the nteract desktop app, head over to the [nteract homepage](https://nteract.io/) to download the application for your operating system.

Once you've download the app, head over to our [documentation page](https://docs.nteract.io/) for tutorials and guides on using the app for your data analysis and science workflows.

## Supporting nteract

nteract is a non-profit open-source organization fiscally sponsored by [NumFOCUS](https://numfocus.org/). **If you are interested in supporting development on nteract, please consider [making a recurring donation](https://numfocus.salsalabs.org/donate-to-nteract/index.html).**

Development on nteract is also supported by the following organizations.

<table>
<tr>
<td>
<a href="https://netflix.github.io/"><img src="https://netflix.github.io/images/Netflix-OSS-Logo.png" alt="Netflix Logo"width="400px"/></a>
</td>
<td>
<a href="https://opensource.microsoft.com"><img src="https://user-images.githubusercontent.com/1857993/68797361-4f1d1600-0609-11ea-9421-24148b6d2b5a.png" alt="Microsoft Logo" width="400px"/></a>
</td>
</tr>
<tr>
<td><a href="https://www.moore.org/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Moore_Foundation_Logo.jpg/400px-Moore_Foundation_Logo.jpg" alt="Gordon and Betty Moore Foundation Logo" width="400px"></a></td>

<td><a href="https://plot.ly/"><img src="https://brand.plot.ly/static/images/plotly-logo-01-stripe@2x.png" alt="Plotly Logo" width="400px"></a></td></tr>
</table>
