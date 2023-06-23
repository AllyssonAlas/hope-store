# Create User Usecase

> ## Case of success
1. System receives **Product** data
2. System checks if user has CREATE_PRODUCT permission
3. System validates data received
4. System stores data in the database

> ## Exception - Invalid permission
2. System invalidates user permission
3. System returns a forbidden error to the requester

> ## Exception - Missing data
3. System invalidates data
4. System returns a missing data error to the requester

> ## Exception - Invalid data
3. System invalidates data
4. System returns an invalid data error to the requester

