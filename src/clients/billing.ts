import { Client } from '@alternatefutures/utils-genql-client';

type BillingClientOptions = {
  graphqlClient: Client;
};

export class BillingClient {
  private graphqlClient: Client;

  constructor(options: BillingClientOptions) {
    this.graphqlClient = options.graphqlClient;
  }

  /**
   * Get customer information
   */
  public getCustomer = async () => {
    const response = await this.graphqlClient.query({
      __name: 'GetCustomer',
      customer: {
        id: true,
        email: true,
        name: true,
        stripeCustomerId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return response.customer;
  };

  /**
   * List payment methods
   */
  public listPaymentMethods = async () => {
    const response = await this.graphqlClient.query({
      __name: 'ListPaymentMethods',
      paymentMethods: {
        id: true,
        type: true,
        cardBrand: true,
        cardLast4: true,
        cardExpMonth: true,
        cardExpYear: true,
        walletAddress: true,
        blockchain: true,
        isDefault: true,
        createdAt: true,
      },
    });

    return response.paymentMethods;
  };

  /**
   * Add a payment method
   */
  public addPaymentMethod = async (input: {
    stripePaymentMethodId?: string;
    walletAddress?: string;
    blockchain?: string;
    setAsDefault?: boolean;
  }) => {
    const response = await this.graphqlClient.mutation({
      __name: 'AddPaymentMethod',
      addPaymentMethod: {
        __args: {
          input,
        },
        id: true,
        type: true,
        cardBrand: true,
        cardLast4: true,
        walletAddress: true,
        blockchain: true,
        isDefault: true,
      },
    });

    return response.addPaymentMethod;
  };

  /**
   * Remove a payment method
   */
  public removePaymentMethod = async ({ id }: { id: string }) => {
    const response = await this.graphqlClient.mutation({
      __name: 'RemovePaymentMethod',
      removePaymentMethod: {
        __args: {
          id,
        },
        __scalar: true,
      },
    });

    return response.removePaymentMethod;
  };

  /**
   * Set default payment method
   */
  public setDefaultPaymentMethod = async ({ id }: { id: string }) => {
    const response = await this.graphqlClient.mutation({
      __name: 'SetDefaultPaymentMethod',
      setDefaultPaymentMethod: {
        __args: {
          id,
        },
        id: true,
        isDefault: true,
      },
    });

    return response.setDefaultPaymentMethod;
  };

  /**
   * List subscriptions
   */
  public listSubscriptions = async () => {
    const response = await this.graphqlClient.query({
      __name: 'ListSubscriptions',
      subscriptions: {
        id: true,
        status: true,
        plan: true,
        basePricePerSeat: true,
        usageMarkup: true,
        seats: true,
        currentPeriodStart: true,
        currentPeriodEnd: true,
        cancelAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return response.subscriptions;
  };

  /**
   * Get active subscription
   */
  public getActiveSubscription = async () => {
    const response = await this.graphqlClient.query({
      __name: 'GetActiveSubscription',
      activeSubscription: {
        id: true,
        status: true,
        plan: true,
        basePricePerSeat: true,
        usageMarkup: true,
        seats: true,
        currentPeriodStart: true,
        currentPeriodEnd: true,
        cancelAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return response.activeSubscription;
  };

  /**
   * Create a subscription
   */
  public createSubscription = async (input: {
    plan: 'FREE' | 'STARTER' | 'PRO' | 'ENTERPRISE';
    seats?: number;
  }) => {
    const response = await this.graphqlClient.mutation({
      __name: 'CreateSubscription',
      createSubscription: {
        __args: {
          input,
        },
        id: true,
        status: true,
        plan: true,
        seats: true,
        basePricePerSeat: true,
        usageMarkup: true,
        currentPeriodStart: true,
        currentPeriodEnd: true,
      },
    });

    return response.createSubscription;
  };

  /**
   * Cancel a subscription
   */
  public cancelSubscription = async ({
    id,
    immediately = false,
  }: {
    id: string;
    immediately?: boolean;
  }) => {
    const response = await this.graphqlClient.mutation({
      __name: 'CancelSubscription',
      cancelSubscription: {
        __args: {
          id,
          immediately,
        },
        id: true,
        status: true,
        cancelAt: true,
      },
    });

    return response.cancelSubscription;
  };

  /**
   * Update subscription seats
   */
  public updateSubscriptionSeats = async ({
    id,
    seats,
  }: {
    id: string;
    seats: number;
  }) => {
    const response = await this.graphqlClient.mutation({
      __name: 'UpdateSubscriptionSeats',
      updateSubscriptionSeats: {
        __args: {
          id,
          seats,
        },
        id: true,
        seats: true,
      },
    });

    return response.updateSubscriptionSeats;
  };

  /**
   * List invoices
   */
  public listInvoices = async ({
    status,
    limit = 50,
  }: {
    status?: string;
    limit?: number;
  } = {}) => {
    const response = await this.graphqlClient.query({
      __name: 'ListInvoices',
      invoices: {
        __args: {
          status,
          limit,
        },
        id: true,
        invoiceNumber: true,
        status: true,
        subtotal: true,
        tax: true,
        total: true,
        amountPaid: true,
        amountDue: true,
        currency: true,
        periodStart: true,
        periodEnd: true,
        dueDate: true,
        paidAt: true,
        pdfUrl: true,
        createdAt: true,
      },
    });

    return response.invoices;
  };

  /**
   * Get invoice by ID
   */
  public getInvoice = async ({ id }: { id: string }) => {
    const response = await this.graphqlClient.query({
      __name: 'GetInvoice',
      invoice: {
        __args: {
          id,
        },
        id: true,
        invoiceNumber: true,
        status: true,
        subtotal: true,
        tax: true,
        total: true,
        amountPaid: true,
        amountDue: true,
        currency: true,
        periodStart: true,
        periodEnd: true,
        dueDate: true,
        paidAt: true,
        pdfUrl: true,
        lineItems: {
          id: true,
          description: true,
          quantity: true,
          unitPrice: true,
          amount: true,
        },
        createdAt: true,
      },
    });

    return response.invoice;
  };

  /**
   * Get current usage
   */
  public getCurrentUsage = async () => {
    const response = await this.graphqlClient.query({
      __name: 'GetCurrentUsage',
      currentUsage: {
        storage: {
          quantity: true,
          amount: true,
        },
        bandwidth: {
          quantity: true,
          amount: true,
        },
        compute: {
          quantity: true,
          amount: true,
        },
        requests: {
          quantity: true,
          amount: true,
        },
        total: true,
      },
    });

    return response.currentUsage;
  };

  /**
   * Process a payment
   */
  public processPayment = async ({
    amount,
    currency = 'usd',
    invoiceId,
  }: {
    amount: number;
    currency?: string;
    invoiceId?: string;
  }) => {
    const response = await this.graphqlClient.mutation({
      __name: 'ProcessPayment',
      processPayment: {
        __args: {
          amount,
          currency,
          invoiceId,
        },
        id: true,
        amount: true,
        currency: true,
        status: true,
        createdAt: true,
      },
    });

    return response.processPayment;
  };

  /**
   * Record a crypto payment
   */
  public recordCryptoPayment = async (input: {
    txHash: string;
    blockchain: string;
    amount: number;
    invoiceId?: string;
  }) => {
    const response = await this.graphqlClient.mutation({
      __name: 'RecordCryptoPayment',
      recordCryptoPayment: {
        __args: {
          input,
        },
        id: true,
        amount: true,
        currency: true,
        status: true,
        txHash: true,
        blockchain: true,
        createdAt: true,
      },
    });

    return response.recordCryptoPayment;
  };

  /**
   * Generate invoice
   */
  public generateInvoice = async ({ subscriptionId }: { subscriptionId: string }) => {
    const response = await this.graphqlClient.mutation({
      __name: 'GenerateInvoice',
      generateInvoice: {
        __args: {
          subscriptionId,
        },
        id: true,
        invoiceNumber: true,
        status: true,
        total: true,
        dueDate: true,
      },
    });

    return response.generateInvoice;
  };
}
