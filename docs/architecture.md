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

Main Directories and Files

| Directory / File              | Responsibility                                                                             |
|-------------------------------|--------------------------------------------------------------------------------------------|
| `.github/workflows/`          | Contains GitHub Actions workflow definitions for automated test execution and reporting.   |
| `docs/`                       | Contains project documentation, including architecture documentation.                      |
| `pages/`                      | Contains Page Object classes responsible for page-specific UI interactions.                |
| `tests/`                      | Contains automated test classes that define test scenarios and assertions.                 |
| `testData/`                   | Contains test data used by automated tests.                                                |
| `utils/`                      | Contains logging and test reporting utilities.                                             |
| `.gitignore`                  | Specifies files and directories that should not be tracked by Git.                         |
| `package.json`                | Contains npm project configuration, scripts, and dependencies.                             |
| `package-lock.json`           | Lock the versions of project dependencies. versions                                        |
| `README.md`                   | Contains the project overview, technology stack, structure, and usage instructions.        |

</details>


<details><summary><b>Main Components and Responsibilities</b></summary>

The framework follows the Page Object Model (POM) approach. Page-specific UI interactions are encapsulated in dedicated Page Object classes, while shared browser interaction functionality is provided by the `BasePage` class.

1) BasePage

`BasePage` is a common base class inherited by the Page Object classes.

It provides shared functionality for:

- WebDriver and explicit wait management;
- Element location and visibility-based synchronization;
- Reusable UI interactions, such as clicking, typing, etc.;
- Keyboard and browser navigation operations;
- Logging through SLF4J;
- Allure step integration for test action reporting.

The class reduces duplication across Page Objects by centralizing common browser interaction functionality.

2) Page Object Classes

Each Page Object represents a specific page or functional area of the application under test.

| Component | Responsibility |
|---|---|
| `HomePage` | Provides navigation to the main application sections, including login, dropdown, checkbox, and broken images pages. |
| `LoginPage` | Encapsulates login form interactions, successful and unsuccessful authentication scenarios, and password field verification. |
| `SecurePage` | Represents the authenticated page and provides methods for verifying page content and logging out. |
| `DropdownPage` | Encapsulates dropdown visibility, option selection, keyboard interaction, and focus verification. |
| `CheckboxPage` | Encapsulates checkbox visibility, selection state verification, state changes, and keyboard interactions. |
| `BrokenImagesPage` | Encapsulates broken images page interactions, image count and visibility checks, and image loading verification. |

Page Objects use the shared functionality inherited from `BasePage` while exposing methods specific to their respective pages and UI components.
</details>


<details><summary><b>Test Components(Layers) and Responsibilities</b></summary>

Test files contain automated test scenarios and verify the expected behavior of the application under test.

The test layer is implemented using **Mocha** and follows the Page Object Model approach. Test files interact with Page Objects instead of directly locating and manipulating web elements.

| Component        | Responsibility                                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `testSetup`       | Contains createDriver and closeDriver funtions and provides common WebDriver initialization, and access to the `HomePage`.            |
| `LoginTest`      | Verifies successful and unsuccessful login scenarios, logout behavior, secure area access, and password field handling.   |
| `DropdownTest`   | Verifies dropdown visibility, available options, option selection, keyboard interaction, and browser navigation behavior. |
| `CheckboxTest`    | Verifies checkbox visibility, initial states, state changes, refresh behavior, and keyboard interaction.                  |
| `BrokenImagesTest` | Verifies page content, image visibility, image count, and image loading status.                                           |

Test classes use assertions to validate application behavior and are organized into logical groups such as `smoke` and `regression`.

Test scenarios can use parametrized test data to execute the same test logic with different input values. For example, `LoginTest` uses the `loginTestData` to validate multiple login scenarios.

1) TestSetup

`TestSetup` is the common test setup module that contain createDriver and  closeDriver methods that manages the WebDriver lifecycle.

Its responsibilities include:

* Creating a Chrome WebDriver instance before each test method;
* Configuring browser options;
* Enabling headless execution in GitHub Actions;
* Opening the application home page;
* Initializing the `HomePage` object;
* Closing the browser after each test method.

The `createDriver` function initializes the browser and opens the application home page before each test methods. 
If the execution environment is GitHub Actions then the browser configuration changes, and chrome browser runs with headless mode, and additional Linux-oriented options.

Test-specific `createDriver` implementation override the default setup to open the required page through the corresponding Page Object.

The `closeDriver` method closes the WebDriver session after test execution.
If the test failed, the `closeDriver` function takes screenshot before closing the WebDriver sesion.

2) Test Data Modules

Test data is stored in dedicated modules under the `testData` package.

These modules centralize URLs, expected messages, input values, and default UI states used by the test scenarios.



| Component          | Responsibility                                                                                            |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| `LoginData`        | Stores login credentials, expected authentication messages, page URLs, and security-related input values. |
| `DropdownData`     | Stores dropdown page URLs, expected option names, and the expected number of options.                     |
| `CheckboxData`     | Stores checkbox identifiers, the page URL, and expected initial checkbox states.                          |
| `BrokenImagesData` | Stores the page URL, expected page content, link text, and expected image count.                          |

The test data modules expose constants that can be reused by multiple test methods. This reduces duplicated values in test implementations and separates test data from test execution logic.

3) Allure Reporting

Allure is used to collect test execution results, steps, and failure screenshots.

Local reporting is handled by `package.json` scripts, which run the tests, creates execution metadata, restores report history,
and generates an Allure report.

In GitHub Actions, reporting is handled by the workflow `firstWorkflow.yml` that contains two jobs:
- test — installs dependencies, runs the automated tests, generates the Allure report, and uploads the report as a GitHub Pages artifact;
- deploy — depends on the test job and deploys the uploaded artifact to GitHub Pages.

The deployment flow is:

test → Allure report → Pages artifact → deploy → GitHub Pages.

Because both jobs belong to the same workflow, GitHub displays only one workflow under the Actions page. Individual workflow runs show both test and deploy jobs.

See the example of [Allure report](https://olexandr29.github.io/automation-the-internet-java/)

</details>



<details><summary><b>Test Execution Flow</b></summary>
The JavaScript framework follows a test execution flow in which browser is initialized before each test, the required Page Object is opened, the test scenario is executed, and the browser session is closed afterward. 

Test Layer
```
beforeEach()
↓
createDriver()
↓
Create ChromeDriver
↓
Open Home Page
↓
Initialize HomePage
↓
Open required Page Object (openLoginPage() / openDropdownPage() / openCheckboxPage() / ...)
↓
Test scenario
(describe() -> it())
↓
afterEach()
↓
closeDriver()
↓
Capture failure screenshot (if test fails)
↓
driver.quit()
```

</details>

