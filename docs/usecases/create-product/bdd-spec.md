# Feature: create a product
> As a **ADMIN**
> I want to create a new product
> So it can be accessed by customers

### 1. Scenario: Valid data provided
- Given all data provided is valid
- When a new product registration is requested
- Then the system shall store the data provided

### 2. Scenario: Data missing
- Given some required data isn't received
- When a new product registration is requested
- Then the system shall send a missing data error to the requester

### 3. Scenario: Invalid data provided
- Given some provided data is invalid
- When a new product registration is requested
- Then the system shall send a invalid data error to the requester
