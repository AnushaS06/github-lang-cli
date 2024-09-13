# GitHub Language CLI

A command-line interface application that connects to the GitHub API and prints the 5 most used languages on a user's GitHub profile.

## Requirements

- Node.js
- TypeScript

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your_username/github-lang-cli.git
   ```
2. Navigate into the directory:
   ```bash
   cd github-lang-cli
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

Run the CLI by providing a GitHub profile URL:
```bash
npx tsx src/index.ts https://github.com/testuser
```

## Running Tests

To run the tests, execute the following command:
```bash
npm test
```

## Error Handling

- Invalid GitHub profile URLs are handled gracefully.
- API rate limits are detected and logged accordingly.
