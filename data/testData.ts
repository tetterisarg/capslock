export const ZIP = {
    serviceArea: '68901',
    outOfArea: '11111',
    tooShort: '123',
    tooLong: '123456',
    nonNumeric: 'abcde',
} as const;

export const PROPERTY_OPTIONS = {
    ownedHouse: 'homeowner-owned-1',
    rentalProperty: 'homeowner-rental-1',
    mobileHome: 'homeowner-mobile-1',
} as const;

export const INTEREST_OPTIONS = {
    independence: 'why-interested-independence-1',
    safety: 'why-interested-safety-1',
    therapy: 'why-interested-therapy-1',
    other: 'why-interested-other-1',
} as const;

export const CONTACT = {
    valid: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '5551234567',
    },
    invalid: {
        emailNoTld: 'test@test',
        phoneShort: '555123456',  // 9 digits
    },
} as const;

export const URLS = {
    thankyou: '/thankyou',
} as const;

export const TOTAL_STEPS = 5;