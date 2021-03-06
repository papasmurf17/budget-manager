const { gql } = require('apollo-server-express');

module.exports = gql`
    ## Input
    input TransactionInput {
        amount: Float!,
        currencyCode: String!,
        description: String!,
        expenseType: String,
        invoiceDate: Date,
        user: String!
    }

    input UpdateTransactionInput {
        amount: Float,
        currencyCode: String,
        description: String,
        expenseType: String,
        invoiceDate: Date,
        user: String
    }

    ## Type
    type Price {
        value: Float,
        currency: String
    }

    type Transaction {
        _id: String,
        pricePaid: Price,
        priceConverted: Price,
        amount: Float,
        currencyCode: String,
        description: String,
        expenseType: String,
        invoiceDate: Date,
        user: String,
        reporter: String
    }

    ## Query
    extend type Query {
        DefaultCurrency: String
        Transactions(limit: Int): [Transaction]
        SearchTransactions(limit: Int, searchTerm: String): [Transaction]
        Transaction(id: ID!): Transaction
        Total(startFrom: Date): Float
    }

    ## Mutation
    extend type Mutation {
        addTransaction(transaction: TransactionInput): Transaction
        removeTransaction(id: ID!): Transaction
        updateTransaction(id: ID!, transaction: UpdateTransactionInput!): Transaction
    }
`;
