# JavaScript UI Test Automation Framework for the Internet

## Project Purpose

This repository is part of a multi-language UI test automation project built around the same application.

The goal of this repository is to strengthen JavaScript programming skills and gain practical experience automating web applications that contain standard UI elements commonly used across different business domains.

The application under test (AUT) is:

https://the-internet.herokuapp.com/

Additionally, this project provides an opportunity to:

- Apply practical experience with Selenium WebDriver, GitHub Actions, and Allure reporting.
- Broaden automation quality assurance (AQA) experience beyond the eCommerce domain(see the [project](https://github.com/Olexandr29/eCommerce_JS)).
- Expand my JavaScript automation skills by designing and maintaining a reusable test automation framework.
- Compare automation approaches across multiple programming languages while solving the same testing tasks.

---

## Tech Stack

- JavaScript
- Node.js
- Selenium WebDriver
- Mocha
- Allure Report
- GitHub Actions


---

## Project Structure

```
automation-the-internet-js
├── .github
│   └── workflows
├── pages
├── testData
├── tests
├── utils
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## Run Tests

### Locally

#### Run tests with console logging

```bash
npm test
```

#### Run tests with Allure reporting

```bash
npm run test:allure
```

The `test:allure` script runs the tests, generates the Allure report, and opens it automatically.

See `package.json` for all implemented npm scripts.

---

## GitHub Actions

Tests are automatically executed on every push through GitHub Actions.

They can also be triggered manually from the GitHub Actions page.

Allure results are uploaded as workflow artifacts.

---

## Reporting

The framework supports:

- Console logging
- Allure step reporting
- GitHub Actions artifacts

---

**This repository is continuously improved with new automation scenarios and framework enhancements.**