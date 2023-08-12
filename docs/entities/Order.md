# Order

- id: uuid
- userId: string
- products: {
    id: uuid
    quantity: number
}[]
- contact: string
- address: {
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
    postalCode: string
}
- value: number
- status: string
- created_at: date
- updated_at: date
