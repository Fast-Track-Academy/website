# GitHub Workflows Documentation

This repository includes several GitHub Actions workflows to ensure code quality, accessibility, and proper deployment of the Fast Track Academy website.

## Workflows Overview

### 1. Deploy to GitHub Pages (`deploy-pages.yml`)
- **Trigger**: Push to main, Pull requests, Manual dispatch
- **Purpose**: Automatically deploys the website to GitHub Pages
- **Features**:
  - Uses official GitHub Pages actions
  - Proper permissions and concurrency handling
  - Artifact-based deployment

### 2. Code Quality (`code-quality.yml`)
- **Trigger**: Push to main, Pull requests
- **Purpose**: Validates HTML, CSS, and JavaScript code quality
- **Checks**:
  - HTML validation with HTMLHint
  - CSS validation with Stylelint
  - JavaScript validation with JSHint
  - File size monitoring
  - Basic security scanning

### 3. Link Validation (`link-validation.yml`)
- **Trigger**: Push to main, Pull requests, Weekly schedule
- **Purpose**: Ensures all links are working and accessible
- **Features**:
  - Internal link checking
  - Image alt text validation
  - Link title attribute checking
  - Weekly scheduled runs to catch broken external links

### 4. Accessibility Testing (`accessibility.yml`)
- **Trigger**: Push to main, Pull requests
- **Purpose**: Ensures the website meets accessibility standards
- **Tools**:
  - Axe-core for automated accessibility testing
  - pa11y-ci for additional checks
  - Manual checks for color contrast
  - Semantic HTML structure validation

### 5. Continuous Integration (`ci.yml`)
- **Trigger**: Push to main, Pull requests
- **Purpose**: Basic validation and security checks
- **Features**:
  - HTML structure validation
  - CSS syntax checking
  - JavaScript syntax validation
  - File permissions audit
  - Security headers check

### 6. Dependabot Configuration (`dependabot.yml`)
- **Purpose**: Automated dependency updates
- **Features**:
  - GitHub Actions version updates
  - npm package updates (if applicable)
  - Weekly scheduling
  - Semantic versioning considerations

## Setup Requirements

To ensure all workflows function properly:

1. **GitHub Pages**: Enable GitHub Pages in repository settings
2. **Permissions**: Ensure proper repository permissions for Actions
3. **Environment**: The workflows use Ubuntu latest runners
4. **Node.js**: Version 18 is used for JavaScript tools

## Monitoring and Maintenance

- Check workflow runs regularly in the Actions tab
- Review Dependabot pull requests for security updates
- Monitor accessibility reports for compliance
- Update workflow versions as needed

## Local Development

To run similar checks locally:

```bash
# Install tools
npm install -g htmlhint stylelint jshint @axe-core/cli pa11y-ci broken-link-checker

# Run checks
htmlhint "*.html"
stylelint "*.css"
jshint *.js
```

## Troubleshooting

Common issues and solutions:

1. **Deployment failures**: Check GitHub Pages settings and permissions
2. **Link checker failures**: May indicate broken external links or network issues
3. **Accessibility issues**: Review reports and fix identified problems
4. **Code quality issues**: Address linting errors and warnings