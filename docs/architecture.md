# Architecture

<details><summary><b>Overview</b></summary>

This project is part of the [multi-language UI test automation ecosystem](https://github.com/Olexandr29/automation-the-internet-on-python-java-js/tree/main)
built around the same application under test (AUT): [The Internet](https://the-internet.herokuapp.com/).

This repository contains a JavaScript-based UI test automation framework designed to automate web application scenarios using Selenium WebDriver and TestNG.

The framework uses Node.js and npm for project and dependency management, GitHub Actions for CI/CD automation, and Allure Report for test result reporting.

The project follows the Page Object Model (POM) approach to separate test scenarios from page-specific UI interactions.

</details>


<details><summary><b>Repository Structure</b></summary>

The repository is organized as a Node.js-based JavaScript UI test automation framework.

```text
automation-the-internet-js
├───.github/
│   └───workflows/          # GitHub Actions workflow
├───docs/                   # Project documentation
├───pages/                  # Page Object classes
├───testData/               # Test data
├───tests/                  # Test classes
├───utils/                  # Logging and test reporting utilities
├───.gitignore              # Specifies files and directories ignored by Git
├───README.md               # Project overview and usage instructions
├───package-lock.json       # Locks dependency versions
└───package.json            # npm project configuration, scripts, and dependencies
```


</details>