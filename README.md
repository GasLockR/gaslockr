# Gas Lockr

Gas Price Insurance is an insurance project that aims to provide users with protection against Ethereum gas price fluctuations. Users can ensure their transactions are protected during gas price fluctuations by purchasing insurance.

Demo WebSite: [Gas LockR](https://gaslockr.azurewebsites.net)

## Features

- Use ChainLink and other automated tools to actively listen to user transactions and, once eligibility requirements are met, actively initiate transactions to complete user rewards.
- Choose different insurance plans
- View expected returns
- Purchase insurance and make payment
- View purchased insurance
- Claim

## Installation and Start

First, clone the repository to your local machine:

```
git clone https://github.com/GasLockR/gaslockr.git
```

Install dependencies:

```
npm install
```

Create a `.env` file in the root of the project and add your private key as an environment variable:

```
REACT_APP_PRIVATE_KEY="your_private_key_here"
```

Start the development server:

```
npm start
```

Now, you can visit `http://localhost:3000` to view the project.
