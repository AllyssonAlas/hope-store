# Feature: create an order
> As an authenticated **USER**
> I want to create a new order
> So I can finish start a purchase

### 1. Scenario: Valid data provided
- Given all data provided is valid
- When a new order is requested
- Then the system shall store purchase data provided
- And return order data to th resquester

### 2. Scenario: Unauthenticated user
- Given all data provided is valid
- When the user is unauthenticated
- Then the system shall send a unauthenticated error to the requester

### 3. Scenario: Data missing
- Given some required data isn't received
- When a new order is requested
- Then the system shall send a missing data error to the requester

### 4. Scenario: Invalid data provided
- Given some provided data is invalid
- When a new order is requested
- Then the system shall send a invalid data error to the requester

## 5. Scenario: Product does not exist
- Given provided valid data
- When a product id is not found
- Then the system shall send a bad request error to the requester

### 6. Scenario: Insufficient product amount
- Given valid provided data
- When a product amount requested exceeds amount stored
- Then the system shall send a bad request error to the requester

### 7. Scenario: Invalid address
- Given some provided data
- When an address is invalid
- Then the system shall send a bad request error to the requester



